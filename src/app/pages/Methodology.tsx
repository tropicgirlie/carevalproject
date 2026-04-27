import { Link } from 'react-router-dom';
import { Bell, Briefcase, Shield, Network, Eye, Scale, Share2, ArrowRight, Download } from 'lucide-react';
import { InterdependencyGraph } from '../components/InterdependencyGraph';
import rubricData from '../../../public/rubric.json';

const dimensionIcons: Record<string, typeof Bell> = {
  interruption_resilience: Bell,
  care_infrastructure_awareness: Briefcase,
  care_debt_detection: Shield,
  non_linear_journey_handling: Network,
  surveillance_risk: Eye,
  reciprocity_balance: Scale,
};

const assetUrl = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

export function Methodology() {
  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      {/* Hero */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Framework Documentation v1.0.4
        </div>
        <h1 className="text-deep-navy max-w-[720px]">MomOps framework for evaluating care-blindness</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          MomOps treats caregiving as an operating system rather than a checklist.
          The benchmark asks whether AI systems can reason in environments shaped by
          interruption, dependency, invisible labor, and non-linear transitions.
        </p>
      </section>

      {/* Opening context */}
      <section className="border-y border-border/60 py-8 grid md:grid-cols-[1fr_2fr] gap-10">
        <div className="space-y-4">
          <p className="text-[16px] font-semibold text-deep-navy leading-snug">Why existing benchmarks miss care</p>
          <p className="text-[16px] text-slate-grey leading-5">
            Standard evaluations measure accuracy and task completion.
            They were not designed to detect when a model erases the
            infrastructure of care.
          </p>
        </div>
        <div className="space-y-5">
          <p className="text-[16px] text-slate-grey leading-6">
            Current AI benchmarks measure factual accuracy, task completion, and linear
            reasoning. These criteria reveal little about whether a model can interpret
            situations in which care is distributed across time, relationships,
            infrastructures, and interruptions. When AI systems ignore these dependencies,
            they reproduce a world model in which caregiving labor is backgrounded and
            maternal adaptation is treated as inexhaustible.
          </p>
          <blockquote className="border-l border-slate-400 pl-5 py-4 text-[16px] italic text-slate-grey bg-white/60">
            "Care-blindness is not reducible to offensive wording or representational bias
            alone. It is a structural evaluative problem."
          </blockquote>
        </div>
      </section>

      {/* Six dimensions */}
      <section className="space-y-6">
        <div>
          <p className="text-[16px] uppercase tracking-[0.14em] text-slate-grey">Dimensions of Evaluation</p>
          <h2 className="text-[16px] uppercase tracking-[0.2em] text-slate-grey mt-1">Six dimensions of care-sensitive reasoning</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {rubricData.dimensions.map((dim, idx) => {
            const Icon = dimensionIcons[dim.key] ?? Bell;
            const number = String(idx + 1).padStart(2, '0');
            return (
              <article key={dim.key} className="border border-border/60 bg-white p-5 min-h-[154px]">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-3.5 h-3.5 text-deep-navy" />
                  <span className="text-[16px] tracking-[0.1em] text-slate-grey">{number}</span>
                </div>
                <h3 className="text-[18px] leading-tight text-deep-navy mb-2">{dim.label}</h3>
                <p className="text-[16px] leading-5 text-slate-grey">{dim.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Testing protocol */}
      <section className="space-y-7">
        <h2 className="text-center text-deep-navy text-[20px]">The Testing Protocol</h2>
        <div className="max-w-[740px] mx-auto space-y-5">
          {[
            ['01', 'Phase 1 — Context Saturation', 'Provide rich real-world context, including competing demands, logistics, relationships, and time constraints.'],
            ['02', 'Phase 2 — Entropy Injection', 'Introduce disruption: cancellation, illness, timing conflicts, broken infrastructure, or missing information.'],
            ['03', 'Phase 3 — Long-Tail Resolution', 'Test whether the model sees downstream burden across the next day or week instead of only solving the immediate moment.'],
            ['04', 'Phase 4 — Ethical Validation', 'Assess whether the proposed plan externalizes adaptation costs onto caregivers, increases surveillance, or hides uncertainty behind institutional proxies.'],
          ].map(([n, t, d]) => (
            <div key={n} className="grid grid-cols-[40px_1fr] gap-4">
              <div className="w-7 h-7 rounded-full border border-slate-400 text-[16px] font-semibold text-deep-navy flex items-center justify-center mt-0.5">{n}</div>
              <div>
                <p className="text-[16px] uppercase tracking-[0.12em] text-deep-navy mb-1">{t}</p>
                <p className="text-[16px] text-slate-grey leading-6">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scoring section */}
      <section className="border border-border/60 bg-white p-8 space-y-6">
        <h2 className="text-deep-navy text-[20px]">Scoring</h2>
        <p className="text-[16px] text-slate-grey leading-6 max-w-[740px]">
          Each response is scored from 0 to 2 across the six dimensions:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {(['0', '1', '2'] as const).map((score) => {
            const fullLabel = rubricData.score_labels[score];
            const [tag, ...rest] = fullLabel.split(':');
            const desc = rest.join(':').trim();
            const tone =
              score === '0'
                ? { border: 'border-error-red/30', bg: 'bg-error-red/5', text: 'text-error-red' }
                : score === '1'
                ? { border: 'border-muted-ochre/30', bg: 'bg-muted-ochre/5', text: 'text-muted-ochre' }
                : { border: 'border-sage-green/30', bg: 'bg-sage-green/5', text: 'text-sage-green' };
            return (
              <div key={score} className={`border ${tone.border} ${tone.bg} p-5`}>
                <p className={`text-[16px] uppercase tracking-[0.12em] ${tone.text} font-semibold mb-2`}>{score} — {tag}</p>
                <p className="text-[16px] text-slate-grey leading-6">{desc}</p>
              </div>
            );
          })}
        </div>
        <p className="text-[16px] text-slate-grey leading-6 max-w-[740px]">
          Total scores are aggregated into:
        </p>
        <ul className="space-y-2 text-[16px] text-slate-grey">
          <li className="flex gap-3"><span className="text-deep-navy font-semibold">CCS</span> — Care-Consciousness Score</li>
          <li className="flex gap-3"><span className="text-deep-navy font-semibold">CBI</span> — Care-Blindness Index</li>
          <li className="flex gap-3"><span className="text-deep-navy font-semibold">Model-level averages</span> — across the benchmark set</li>
        </ul>
      </section>

      {/* Graph dataset callout — inline visualization + downloads */}
      <section className="border border-border/60 bg-white overflow-hidden">
        <div className="p-8 md:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <Share2 className="w-4 h-4 text-deep-navy" />
            <p className="text-[16px] uppercase tracking-[0.14em] text-slate-grey">Data + Viz</p>
          </div>
          <h3 className="text-deep-navy text-[1.6rem] leading-tight">MomOps Interdependency Graph</h3>
          <p className="text-[16px] text-slate-grey leading-6 max-w-[620px]">
            A single care-system disruption can cascade across multiple MomOps
            dimensions. The graph below shows disruptions (red), infrastructure
            (blue), dimensions (teal), actors (slate), and outcomes (amber) —
            and how they are linked.
          </p>

          {/* Inline network graph */}
          <InterdependencyGraph />

          {/* Download buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={assetUrl('momops_interdependency_graph.json')}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-navy text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-deep-navy/90 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download graph JSON
            </a>
            <a
              href={assetUrl('momops_graph_nodes.csv')}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-white text-deep-navy text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-warm-grey transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download nodes CSV
            </a>
            <a
              href={assetUrl('momops_graph_edges.csv')}
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-white text-deep-navy text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-warm-grey transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download edges CSV
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}