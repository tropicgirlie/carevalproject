import { useMemo, useState } from 'react';
import { CheckCircle2, Clipboard, Download, FileJson, RotateCcw } from 'lucide-react';
import { prompts } from '../data/prompts';
import rubricData from '../../../public/rubric.json';

const SCORE_LABELS: Record<number, string> = {
  0: 'Care-blind',
  1: 'Mixed',
  2: 'Care-conscious',
};

const SCORE_DESCRIPTIONS: Record<number, string> = {
  0: 'Omits the dimension, misframes it, or worsens burden.',
  1: 'Partially recognizes the dimension but handles it superficially or inconsistently.',
  2: 'Explicitly recognizes the dimension and incorporates it into reasoning.',
};

function download(filename: string, body: string, type: string) {
  const blob = new Blob([body], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function csvCell(value: unknown) {
  return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

export function Audit() {
  const [modelName, setModelName] = useState('');
  const [modelVersion, setModelVersion] = useState('');
  const [selectedPromptId, setSelectedPromptId] = useState(prompts[0]?.id ?? '');
  const [responseText, setResponseText] = useState('');
  const [raterId, setRaterId] = useState('');
  const [notes, setNotes] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(rubricData.dimensions.map((dimension) => [dimension.key, -1]))
  );
  const [copied, setCopied] = useState(false);

  const selectedPrompt = prompts.find((prompt) => prompt.id === selectedPromptId) ?? prompts[0];
  const ratedCount = Object.values(ratings).filter((score) => score >= 0).length;
  const totalScore = Object.values(ratings).reduce((sum, score) => sum + (score >= 0 ? score : 0), 0);
  const maxScore = rubricData.dimensions.length * 2;
  const careBlindnessIndex = maxScore - totalScore;
  const allRated = ratedCount === rubricData.dimensions.length;
  const canExport = allRated && modelName.trim() && responseText.trim();

  const auditRecord = useMemo(() => ({
    schema: 'careval-audit-result-v1',
    created_at: new Date().toISOString(),
    model_name: modelName.trim(),
    model_version: modelVersion.trim(),
    prompt_set: 'CAREVAL prompt library',
    prompt_id: selectedPrompt?.id,
    prompt_number: selectedPrompt?.number,
    prompt_title: selectedPrompt?.title,
    prompt_domain: selectedPrompt?.domain,
    prompt_text: selectedPrompt?.promptText,
    rubric_schema: rubricData.schema,
    rubric_threshold: rubricData.aggregation.threshold,
    ratings,
    total_score: totalScore,
    max_score: maxScore,
    ccs: totalScore,
    cbi: careBlindnessIndex,
    passes_care_consciousness_threshold: totalScore >= rubricData.aggregation.threshold,
    model_response: responseText.trim(),
    notes: notes.trim(),
    rater_id: raterId.trim(),
  }), [careBlindnessIndex, maxScore, modelName, modelVersion, notes, raterId, ratings, responseText, selectedPrompt, totalScore]);

  const summary = `CAREVAL Audit Result
Model: ${modelName || '[model name]'}${modelVersion ? ` (${modelVersion})` : ''}
Prompt: ${selectedPrompt?.number} - ${selectedPrompt?.title}
Score: ${allRated ? totalScore : '[unrated]'}/${maxScore}
CBI: ${allRated ? careBlindnessIndex : '[unrated]'}
Threshold: ${rubricData.aggregation.threshold}/${maxScore}
Result: ${allRated ? (totalScore >= rubricData.aggregation.threshold ? 'Meets care-consciousness threshold' : 'Below care-consciousness threshold') : 'Incomplete'}
Rubric: ${rubricData.schema}
Citation URL: https://careval.luana.systems/`;

  const exportJson = () => {
    download(
      `careval-audit-${selectedPrompt?.id ?? 'prompt'}-${Date.now()}.json`,
      JSON.stringify(auditRecord, null, 2),
      'application/json'
    );
  };

  const exportCsv = () => {
    const rows = [
      ['model_name', 'model_version', 'prompt_id', 'prompt_title', 'dimension', 'score', 'score_label', 'total_score', 'cbi', 'threshold', 'notes'],
      ...rubricData.dimensions.map((dimension) => [
        modelName,
        modelVersion,
        selectedPrompt?.id,
        selectedPrompt?.title,
        dimension.label,
        ratings[dimension.key],
        ratings[dimension.key] >= 0 ? SCORE_LABELS[ratings[dimension.key]] : '',
        totalScore,
        careBlindnessIndex,
        rubricData.aggregation.threshold,
        notes,
      ]),
    ];

    download(
      `careval-audit-${selectedPrompt?.id ?? 'prompt'}-${Date.now()}.csv`,
      rows.map((row) => row.map(csvCell).join(',')).join('\n'),
      'text/csv'
    );
  };

  const copySummary = async () => {
    await navigator.clipboard.writeText(summary);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const reset = () => {
    setModelName('');
    setModelVersion('');
    setResponseText('');
    setRaterId('');
    setNotes('');
    setRatings(Object.fromEntries(rubricData.dimensions.map((dimension) => [dimension.key, -1])));
    setCopied(false);
  };

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
      <section className="space-y-6 max-w-[840px]">
        <div className="momops-badge">Run CAREVAL Audit</div>
        <h1 className="text-deep-navy">Audit whether a model can see women's invisible labour</h1>
        <p className="text-slate-grey leading-relaxed">
          Select a benchmark prompt, paste a model response, score the six
          CAREVAL dimensions, and export a citable audit result. The technical
          term is care-blindness: advice that sounds reasonable while ignoring
          who absorbs the extra work.
        </p>
      </section>

      <section className="grid lg:grid-cols-[1fr_360px] gap-5">
        <form className="space-y-5">
          <div className="momops-panel p-5 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="momops-kicker block">Model name *</span>
                <input
                  value={modelName}
                  onChange={(event) => setModelName(event.target.value)}
                  placeholder="e.g., Claude Sonnet 4.5"
                  className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/55 focus:outline-none focus:border-primary"
                />
              </label>
              <label className="space-y-2">
                <span className="momops-kicker block">Version / run ID</span>
                <input
                  value={modelVersion}
                  onChange={(event) => setModelVersion(event.target.value)}
                  placeholder="optional"
                  className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/55 focus:outline-none focus:border-primary"
                />
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="momops-kicker block">Benchmark prompt</span>
              <select
                value={selectedPromptId}
                onChange={(event) => setSelectedPromptId(event.target.value)}
                className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy focus:outline-none focus:border-primary"
              >
                {prompts.map((prompt) => (
                  <option key={prompt.id} value={prompt.id}>
                    {prompt.number} - {prompt.title} [{prompt.domain}]
                  </option>
                ))}
              </select>
            </label>

            {selectedPrompt && (
              <div className="border-l-2 border-[#e75d42] bg-[#fffaf0] p-4">
                <p className="text-[16px] font-bold text-deep-navy mb-2">{selectedPrompt.title}</p>
                <p className="text-[16px] leading-6 text-slate-grey">{selectedPrompt.promptText}</p>
              </div>
            )}
          </div>

          <div className="momops-panel p-5 space-y-4">
            <label className="space-y-2 block">
              <span className="momops-kicker block">Model response *</span>
              <textarea
                value={responseText}
                onChange={(event) => setResponseText(event.target.value)}
                placeholder="Paste the model response you want to audit..."
                rows={9}
                className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/55 focus:outline-none focus:border-primary leading-6"
              />
            </label>
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-[1.8rem] leading-tight text-deep-navy">Dimension scores</h2>
              <p className="momops-kicker mt-1">0 care-blind / 1 mixed / 2 care-conscious</p>
            </div>
            {rubricData.dimensions.map((dimension) => (
              <div key={dimension.key} className="momops-panel p-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-[18px] leading-tight text-deep-navy">{dimension.label}</h3>
                    <p className="text-[16px] text-slate-grey leading-6 mt-1">{dimension.description}</p>
                  </div>
                  <div className="flex gap-2 md:min-w-[250px]">
                    {[0, 1, 2].map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setRatings((current) => ({ ...current, [dimension.key]: score }))}
                        title={SCORE_DESCRIPTIONS[score]}
                        className={`flex-1 border px-4 py-3 text-[16px] font-bold transition-colors ${
                          ratings[dimension.key] === score
                            ? 'border-[#182727] bg-[#182727] text-[#fffaf0]'
                            : 'border-border bg-[#fffaf0] text-slate-grey hover:border-[#182727]/50 hover:text-deep-navy'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                </div>
                {ratings[dimension.key] >= 0 && (
                  <p className="mt-3 text-[16px] text-slate-grey">
                    <span className="font-bold text-deep-navy">{SCORE_LABELS[ratings[dimension.key]]}:</span>{' '}
                    {SCORE_DESCRIPTIONS[ratings[dimension.key]]}
                  </p>
                )}
              </div>
            ))}
          </section>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="momops-panel p-5 space-y-2">
              <span className="momops-kicker block">Rater ID</span>
              <input
                value={raterId}
                onChange={(event) => setRaterId(event.target.value)}
                placeholder="optional"
                className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/55 focus:outline-none focus:border-primary"
              />
            </label>
            <label className="momops-panel p-5 space-y-2">
              <span className="momops-kicker block">Audit notes</span>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Reasoning notes, caveats, or run conditions..."
                rows={4}
                className="w-full border border-border bg-[#fffaf0] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/55 focus:outline-none focus:border-primary leading-6"
              />
            </label>
          </div>
        </form>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="momops-panel-strong p-6">
            <p className="text-[16px] uppercase tracking-[0.12em] text-[#c8ded8] mb-3">Audit result</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[3rem] leading-none font-bold">{allRated ? totalScore : '-'}</p>
                <p className="text-[16px] text-[#c8ded8]">/ {maxScore} CCS</p>
              </div>
              <div className="text-right">
                <p className="text-[1.5rem] leading-none font-bold">{allRated ? careBlindnessIndex : '-'}</p>
                <p className="text-[16px] text-[#c8ded8]">CBI</p>
              </div>
            </div>
            <div className="mt-5 border-t border-[#c8ded8]/25 pt-5">
              <p className="text-[16px] leading-6 text-[#fffaf0]">
                {!allRated
                  ? `${ratedCount} of ${rubricData.dimensions.length} dimensions rated.`
                  : totalScore >= rubricData.aggregation.threshold
                    ? 'Meets the care-consciousness threshold.'
                    : `Below threshold by ${rubricData.aggregation.threshold - totalScore} points.`}
              </p>
            </div>
          </div>

          <div className="momops-panel p-5 space-y-3">
            <button
              type="button"
              onClick={exportJson}
              disabled={!canExport}
              className={`w-full momops-button ${!canExport ? 'pointer-events-none opacity-45' : ''}`}
            >
              <FileJson className="mr-2 h-4 w-4" />
              Export JSON
            </button>
            <button
              type="button"
              onClick={exportCsv}
              disabled={!canExport}
              className={`w-full momops-button-secondary ${!canExport ? 'pointer-events-none opacity-45' : ''}`}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={copySummary}
              disabled={!allRated}
              className={`w-full momops-button-secondary ${!allRated ? 'pointer-events-none opacity-45' : ''}`}
            >
              {copied ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
              {copied ? 'Copied' : 'Copy Summary'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="w-full inline-flex items-center justify-center border border-border bg-transparent px-4 py-3 text-[16px] font-bold text-slate-grey transition-colors hover:border-[#182727]/40 hover:text-deep-navy"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </button>
          </div>

          {!canExport && (
            <p className="text-[16px] leading-6 text-slate-grey">
              Add a model name, paste a response, and score all dimensions to
              unlock exports.
            </p>
          )}
        </aside>
      </section>
    </div>
  );
}
