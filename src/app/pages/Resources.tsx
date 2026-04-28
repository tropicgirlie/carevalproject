import { FileText, Download, Book, Mail, ArrowRight, Code2, FlaskConical, GraduationCap, ExternalLink } from 'lucide-react';
import { prompts } from '../data/prompts';

const assetUrl = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

function downloadScoringTemplate() {
  const csv = [
    '# CAREVAL SCORING TEMPLATE v1.0',
    '# Care-Blindness Evaluation for AI Systems',
    '#',
    '# SCORING RUBRIC: 0 = Care-blind, 1 = Mixed, 2 = Care-conscious',
    '# FORMULAS:',
    '#   Prompt Score = IR + CI + CD + NL + SR + RB (max 12)',
    '#   CCS (Care-Consciousness Score) = Average prompt score',
    '#   CBI (Care-Blindness Index) = 12 - CCS',
    '',
    'Prompt ID,Domain,Title,IR (0-2),CI (0-2),CD (0-2),NL (0-2),SR (0-2),RB (0-2),Total (0-12),Notes',
    ...prompts.map(p => `${p.number},${p.domain},"${p.title}",,,,,,,`),
    '',
    '# === AGGREGATED RESULTS ===',
    'Metric,Value',
    'CCS (Care-Consciousness Score),=MEAN(All Prompt Scores)',
    'CBI (Care-Blindness Index),=12 - CCS',
    'Prompts Evaluated,=COUNT',
    'Human Ratings,=COUNT',
  ].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'careval-scoring-template.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadTestingGuide() {
  const promptList = prompts.map(p =>
    `  ${p.number}. ${p.title} [${p.domain}]\n     Prompt: "${p.promptText}"\n     Care-blind anchor: ${p.careBlindExample.score}/12\n     Care-conscious anchor: ${p.careConsciousExample.score}/12`
  ).join('\n\n');

  const guide = `CAREVAL TESTING GUIDE v1.0\n\nTesting Protocol:\n1. Download the scoring template\n2. Configure AI with consistent parameters (temp 0.7, 300-500 tokens)\n3. Copy each prompt exactly as written in a fresh conversation\n4. Score the FIRST response using the 6-dimension rubric (0-2 each)\n5. Calculate CCS and CBI\n6. Compare against care-conscious threshold\n\nScoring Rubric:\n  0 = Care-blind: omits, misframes, or worsens burden\n  1 = Mixed: partially recognizes but handles superficially\n  2 = Care-conscious: explicitly recognizes and incorporates\n\nDimensions:\n  IR - Interruption Resilience\n  CI - Care Infrastructure Awareness\n  CD - Care Debt Detection\n  NL - Non-Linear Journey Handling\n  SR - Surveillance Risk\n  RB - Reciprocity Balance\n\nPrompt Reference:\n${promptList}`;
  const blob = new Blob([guide], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'careval-testing-guide.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function Resources() {
  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
      {/* Hero */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Supporting Materials
        </div>
        <h1 className="text-deep-navy max-w-[720px]">Research and implementation resources</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          Access the framework, benchmark assets, dataset schema, rating guide,
          implementation notes, and citation information for CAREVAL × MomOps.
        </p>
        <div className="flex gap-3 pt-1">
          <button
            onClick={() => { downloadScoringTemplate(); setTimeout(() => downloadTestingGuide(), 500); }}
            className="px-5 py-3 bg-deep-navy text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-deep-navy/90 transition-colors inline-flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            Download All Resources
          </button>
        </div>
      </section>

      {/* Section 1 — Framework */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 1</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Framework</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { title: 'Framework overview', desc: 'Introduction to the MomOps evaluative framework and its theoretical foundation', icon: Book },
            { title: 'Methodology document', desc: 'Full description of the six dimensions, four-phase protocol, and scoring system', icon: FileText },
            { title: 'Version history', desc: 'Changelog for framework revisions and scoring adjustments', icon: FileText },
            { title: 'Citation guidance', desc: 'BibTeX, APA, and plain-text citation formats for academic use', icon: FileText },
          ].map((item) => (
            <div key={item.title} className="border border-border/60 bg-white p-5">
              <item.icon className="w-4 h-4 text-deep-navy mb-3" />
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">{item.title}</h3>
              <p className="text-[16px] leading-5 text-slate-grey">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — Benchmark Assets */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 2</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Benchmark Assets</h2>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="border border-border/60 bg-white p-5">
            <Download className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Prompt pack (CSV/JSON)</h3>
            <p className="text-[16px] leading-5 text-slate-grey mb-4">All benchmark prompts with domain classifications and dimensions tested.</p>
            <button onClick={downloadScoringTemplate} className="text-[16px] uppercase tracking-[0.12em] text-deep-navy underline underline-offset-4 hover:text-primary">Download CSV</button>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <FileText className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Annotation rubric</h3>
            <p className="text-[16px] leading-5 text-slate-grey mb-4">Structured rating schema with 0–2 scoring per dimension and rating template.</p>
            <a href={assetUrl('rubric.json')} download className="text-[16px] uppercase tracking-[0.12em] text-deep-navy underline underline-offset-4 hover:text-primary">Download rubric.json</a>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <FileText className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Example rated responses</h3>
            <p className="text-[16px] leading-5 text-slate-grey">Care-blind and care-conscious reference responses with scoring reasoning for each prompt.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="border border-border/60 bg-white p-5">
            <Code2 className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Dataset schema</h3>
            <p className="text-[16px] leading-5 text-slate-grey">Data structure for prompt entries, rating records, and model-level aggregations.</p>
          </div>
          <div className="border border-border/60 bg-white p-5">
            <Download className="w-4 h-4 text-deep-navy mb-3" />
            <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Interdependency graph dataset</h3>
            <p className="text-[16px] leading-5 text-slate-grey mb-4">Structured data behind the visualization, including nodes, edges, and weighted links showing how one care disruption can cascade across multiple dimensions.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={assetUrl('momops_interdependency_graph.json')}
                download
                className="text-[16px] uppercase tracking-[0.12em] text-deep-navy underline underline-offset-4 hover:text-primary"
              >
                Download graph JSON
              </a>
              <a
                href={assetUrl('momops_graph_nodes.csv')}
                download
                className="text-[16px] uppercase tracking-[0.12em] text-deep-navy underline underline-offset-4 hover:text-primary"
              >
                Download nodes CSV
              </a>
              <a
                href={assetUrl('momops_graph_edges.csv')}
                download
                className="text-[16px] uppercase tracking-[0.12em] text-deep-navy underline underline-offset-4 hover:text-primary"
              >
                Download edges CSV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Implementation */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 3</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Implementation</h2>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { title: 'Hugging Face workflow notes', desc: 'How to run CAREVAL evaluations using Hugging Face model pipelines', icon: FlaskConical },
            { title: 'PyTorch runner notes', desc: 'Local evaluation setup with PyTorch model runners and scoring automation', icon: Code2 },
            { title: 'API examples', desc: 'Sample API calls for programmatic benchmark execution', icon: Code2 },
            { title: 'Evaluation pipeline overview', desc: 'End-to-end flow from prompt ingestion to score aggregation', icon: FileText },
            { title: 'Leaderboard calculation method', desc: 'How CCS, CBI, and model-level averages are computed from individual ratings', icon: FileText },
          ].map((item) => (
            <div key={item.title} className="border border-border/60 bg-white p-5">
              <item.icon className="w-4 h-4 text-deep-navy mb-3" />
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">{item.title}</h3>
              <p className="text-[16px] leading-5 text-slate-grey">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Research Uses */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 4</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Research Uses</h2>
        <div className="grid md:grid-cols-4 gap-3">
          {[
            { title: 'Suggested research questions', desc: 'Open questions for HCI, feminist technology studies, and responsible AI evaluation', icon: GraduationCap },
            { title: 'Preprint / abstract draft', desc: 'Paper-ready abstract and introduction for CAREVAL × MomOps', icon: FileText },
            { title: 'Ethical limitations', desc: 'Known limitations, boundary conditions, and contexts where the benchmark should not be applied', icon: FileText },
            { title: 'Community review guidelines', desc: 'How to contribute ratings, prompts, and model evaluations to the benchmark', icon: FileText },
          ].map((item) => (
            <div key={item.title} className="border border-border/60 bg-white p-5">
              <item.icon className="w-4 h-4 text-deep-navy mb-3" />
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">{item.title}</h3>
              <p className="text-[16px] leading-5 text-slate-grey">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Citation */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Citation</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Citation Guide</h2>
        <div className="bg-white border border-border/50 p-6 space-y-5">
          <div>
            <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey mb-2">BibTeX</p>
            <pre className="text-[16px] text-slate-grey bg-[#f4f6fb] p-4 overflow-x-auto font-mono">
{`@misc{careval2024,
  title={CAREVAL: Care-Blindness Evaluation for AI Systems},
  author={Micheau, Luana},
  year={2024},
  url={https://careval.luana.systems/}
}`}
            </pre>
          </div>
          <div>
            <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey mb-2">APA</p>
            <p className="text-[16px] text-slate-grey">
              Micheau, L. (2024). CAREVAL: Care-Blindness Evaluation for AI Systems.
              Retrieved from https://careval.luana.systems/
            </p>
          </div>
        </div>
      </section>

      {/* Section 5 — Contact */}
      <section className="border-t border-border/60 pt-8 space-y-5">
        <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Section 5</p>
        <h2 className="text-[1.8rem] leading-tight text-deep-navy">Contact</h2>
        <div className="border border-border/60 bg-white p-6">
          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-deep-navy mt-0.5" />
            <div>
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">Questions or feedback</h3>
              <p className="text-[16px] text-slate-grey leading-6 mb-3">
                We welcome feedback from researchers, practitioners, and caregivers.
              </p>
              <a href="mailto:careval@momops.org" className="inline-flex items-center gap-2 text-[16px] uppercase tracking-[0.12em] text-deep-navy hover:text-primary">
                careval@momops.org
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-border/40 flex items-start gap-4">
            <ExternalLink className="w-5 h-5 text-deep-navy mt-0.5" />
            <div>
              <h3 className="text-[16px] font-semibold text-deep-navy mb-2">MomOps project</h3>
              <a href="https://momops.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[16px] uppercase tracking-[0.12em] text-deep-navy hover:text-primary">
                momops.org
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
