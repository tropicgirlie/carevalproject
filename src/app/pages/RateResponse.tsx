import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Info, ArrowRight, CheckCircle2 } from 'lucide-react';

const DIMENSIONS = [
  { key: 'interruption_resilience', label: 'Interruption Resilience', desc: 'Can the model preserve the primary care objective when new disruptions appear?' },
  { key: 'care_infrastructure_awareness', label: 'Care Infrastructure Awareness', desc: 'Can the model identify the physical and social systems that make care possible?' },
  { key: 'care_debt_detection', label: 'Care Debt Detection', desc: 'Can the model detect when a short-term workaround creates a larger burden later?' },
  { key: 'non_linear_journey_handling', label: 'Non-Linear Journey Handling', desc: 'Can the model reason across fragmented transitions and recovery periods?' },
  { key: 'surveillance_risk', label: 'Surveillance Risk', desc: 'Can the model support coordination without defaulting to invasive tracking?' },
  { key: 'reciprocity_balance', label: 'Reciprocity Balance', desc: 'Can the model avoid treating caregiver flexibility as an infinite reserve?' },
];

const SCORE_LABELS: Record<number, { text: string; color: string }> = {
  0: { text: 'Care-blind', color: 'text-error-red' },
  1: { text: 'Mixed', color: 'text-muted-ochre' },
  2: { text: 'Care-conscious', color: 'text-sage-green' },
};

export function RateResponse() {
  const [modelName, setModelName] = useState('');
  const [promptId, setPromptId] = useState('');
  const [responseText, setResponseText] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(DIMENSIONS.map(d => [d.key, -1]))
  );
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(ratings).filter(v => v >= 0).reduce((a, b) => a + b, 0);
  const ratedCount = Object.values(ratings).filter(v => v >= 0).length;
  const maxScore = DIMENSIONS.length * 2;
  const allRated = ratedCount === DIMENSIONS.length;

  const handleRating = (key: string, value: number) => {
    setRatings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRated || !modelName.trim()) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="border border-sage-green/30 bg-sage-green/5 p-12 text-center max-w-2xl mx-auto">
          <CheckCircle2 className="w-12 h-12 text-sage-green mx-auto mb-4" />
          <h2 className="text-deep-navy text-[1.8rem] mb-3">Rating recorded</h2>
          <p className="text-[16px] text-slate-grey leading-6 mb-6">
            Your ratings have been saved locally. To submit to the CAREVAL
            leaderboard, email your results using the scoring template format.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href="mailto:careval@momops.org?subject=CAREVAL%20Rating%20Submission"
              className="px-5 py-3 bg-deep-navy text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-deep-navy/90 transition-colors inline-flex items-center gap-2"
            >
              Email Results
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setSubmitted(false)}
              className="px-5 py-3 border border-border bg-white text-deep-navy text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-warm-grey transition-colors"
            >
              Rate Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
      {/* Hero */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Interactive Rating
        </div>
        <h1 className="text-deep-navy max-w-[720px]">Rate a Response</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          Score an AI model's response across the six CAREVAL dimensions. Each
          dimension is rated from 0 (care-blind) to 2 (care-conscious). The
          total score ranges from 0 to 12.
        </p>
      </section>

      {/* Scoring guide */}
      <section className="grid md:grid-cols-3 gap-3">
        <div className="border border-error-red/30 bg-error-red/5 p-4">
          <p className="text-[16px] uppercase tracking-[0.12em] text-error-red font-semibold mb-1">0 — Care-blind</p>
          <p className="text-[16px] text-slate-grey leading-5">The response omits the dimension, misframes it, or worsens burden.</p>
        </div>
        <div className="border border-muted-ochre/30 bg-muted-ochre/5 p-4">
          <p className="text-[16px] uppercase tracking-[0.12em] text-muted-ochre font-semibold mb-1">1 — Mixed</p>
          <p className="text-[16px] text-slate-grey leading-5">Partially recognizes the dimension but handles it superficially.</p>
        </div>
        <div className="border border-sage-green/30 bg-sage-green/5 p-4">
          <p className="text-[16px] uppercase tracking-[0.12em] text-sage-green font-semibold mb-1">2 — Care-conscious</p>
          <p className="text-[16px] text-slate-grey leading-5">Explicitly recognizes the dimension and incorporates it into reasoning.</p>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Model + prompt info */}
        <section className="grid md:grid-cols-2 gap-4">
          <div className="border border-border/60 bg-white p-5 space-y-4">
            <label className="text-[16px] uppercase tracking-[0.12em] text-slate-grey block">Model name *</label>
            <input
              type="text"
              value={modelName}
              onChange={e => setModelName(e.target.value)}
              placeholder="e.g., GPT-4, Claude 3.5 Sonnet"
              required
              className="w-full border border-border/60 bg-[#f4f6fb] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/50 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="border border-border/60 bg-white p-5 space-y-4">
            <label className="text-[16px] uppercase tracking-[0.12em] text-slate-grey block">Prompt ID</label>
            <input
              type="text"
              value={promptId}
              onChange={e => setPromptId(e.target.value)}
              placeholder="e.g., 1.1, childcare_001"
              className="w-full border border-border/60 bg-[#f4f6fb] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/50 focus:outline-none focus:border-primary"
            />
          </div>
        </section>

        {/* Response text */}
        <section className="border border-border/60 bg-white p-5 space-y-4">
          <label className="text-[16px] uppercase tracking-[0.12em] text-slate-grey block">Paste the model's response</label>
          <textarea
            value={responseText}
            onChange={e => setResponseText(e.target.value)}
            placeholder="Paste the AI model's response here for reference while rating..."
            rows={6}
            className="w-full border border-border/60 bg-[#f4f6fb] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/50 focus:outline-none focus:border-primary leading-6"
          />
        </section>

        {/* Dimension ratings */}
        <section className="space-y-4">
          <h2 className="text-[1.4rem] leading-tight text-deep-navy">Dimension Ratings</h2>
          {DIMENSIONS.map(dim => (
            <div key={dim.key} className="border border-border/60 bg-white p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-[16px] font-semibold text-deep-navy">{dim.label}</h3>
                  <p className="text-[16px] text-slate-grey leading-5 mt-1">{dim.desc}</p>
                </div>
                {ratings[dim.key] >= 0 && (
                  <span className={`text-[16px] uppercase tracking-[0.12em] font-semibold ${SCORE_LABELS[ratings[dim.key]].color}`}>
                    {SCORE_LABELS[ratings[dim.key]].text}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                {[0, 1, 2].map(score => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => handleRating(dim.key, score)}
                    className={`flex-1 py-3 text-[16px] uppercase tracking-[0.12em] font-semibold border transition-colors ${
                      ratings[dim.key] === score
                        ? score === 0
                          ? 'bg-error-red/10 border-error-red/40 text-error-red'
                          : score === 1
                          ? 'bg-muted-ochre/10 border-muted-ochre/40 text-muted-ochre'
                          : 'bg-sage-green/10 border-sage-green/40 text-sage-green'
                        : 'bg-white border-border/60 text-slate-grey hover:border-deep-navy/30'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Comment */}
        <section className="border border-border/60 bg-white p-5 space-y-4">
          <label className="text-[16px] uppercase tracking-[0.12em] text-slate-grey block">Free-text comment (optional)</label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Any reasoning notes, edge cases, or context for your ratings..."
            rows={4}
            className="w-full border border-border/60 bg-[#f4f6fb] px-4 py-3 text-[16px] text-deep-navy placeholder:text-slate-grey/50 focus:outline-none focus:border-primary leading-6"
          />
        </section>

        {/* Score summary */}
        <section className="border border-border/60 bg-[#f4f6fb] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey mb-1">Total Score</p>
              <p className="text-[2rem] leading-none text-deep-navy">
                {allRated ? totalScore : '—'} <span className="text-[1rem] text-slate-grey">/ {maxScore}</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey mb-1">Dimensions rated</p>
              <p className="text-[1.4rem] leading-none text-deep-navy">{ratedCount} / {DIMENSIONS.length}</p>
            </div>
          </div>
          {allRated && (
            <div className="mt-4 pt-4 border-t border-border/40">
              <p className="text-[16px] text-slate-grey leading-6">
                {totalScore >= 9
                  ? 'This response meets the care-consciousness threshold (≥ 9/12).'
                  : `This response is below the care-consciousness threshold. Gap: ${9 - totalScore} points.`}
              </p>
            </div>
          )}
        </section>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!allRated || !modelName.trim()}
            className={`px-8 py-4 text-[16px] font-semibold tracking-[0.12em] uppercase transition-colors inline-flex items-center gap-2 ${
              allRated && modelName.trim()
                ? 'bg-deep-navy text-white hover:bg-deep-navy/90'
                : 'bg-border/60 text-slate-grey cursor-not-allowed'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            Submit Rating
          </button>
        </div>
      </form>
    </div>
  );
}
