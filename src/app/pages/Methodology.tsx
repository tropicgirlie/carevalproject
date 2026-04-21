import { Link } from 'react-router-dom';
import { Bell, Briefcase, Shield, Network, Eye, Scale } from 'lucide-react';

export function Methodology() {
  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-16">
      <section className="space-y-6">
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Framework Documentation v1.0.4
        </div>
        <h1 className="text-deep-navy max-w-[720px]">The MomOps Framework: Benchmark Methodology</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          MomOps is a pioneering evaluative framework designed to quantify the “invisible labor”
          inherent in complex care coordination. Unlike standard reasoning benchmarks, MomOps
          tests for environmental awareness, cognitive load management, and the non-linear
          execution required to sustain human care systems.
        </p>
      </section>

      <section className="border-y border-border/60 py-8 grid md:grid-cols-[1fr_2fr] gap-10">
        <p className="text-[12px] text-slate-grey">The Foundation of Socially Care.</p>
        <div className="space-y-5">
          <p className="text-[13px] text-slate-grey leading-6">
            Current “care language models (LLMs) often overfit linear task completion but fail when
            faced with life’s messy reality of caregiving. The MomOps framework treats caregiving not
            as a sequence of prompts, but as an operatively system that must manage multiple concurrent
            threads, shifting priorities, and high-stakes emotional data.
          </p>
          <blockquote className="border-l border-slate-400 pl-5 py-4 text-[13px] italic text-slate-grey bg-white/60">
            “Care is not a transaction; it is a persistent state of systemic maintenance. MomOps
            measures the model’s ability to maintain that state under duress.”
          </blockquote>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-[12px] uppercase tracking-[0.14em] text-slate-grey">Dimensions of Evaluation</p>
          <h2 className="text-[13px] uppercase tracking-[0.2em] text-slate-grey mt-1">A multidimensional metric for domestic complexity</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { n: '01', t: 'Interruption Resilience', d: 'Evaluates the ability to resume long-term planning after high-frequency, low-context interruptions.' , i: Bell},
            { n: '02', t: 'Care Infrastructure Awareness', d: 'Measures mapping of physical and social dependencies showing that a decision impacts adjacent services.' , i: Briefcase},
            { n: '03', t: 'Care Debt Detection', d: 'Identifies deferred maintenance in systems where today’s shortcut increases Friday risk.' , i: Shield},
            { n: '04', t: 'Non-Linear Journey Handling', d: 'Captures continuity in fragmented workflows where trajectory must adapt at every transition.', i: Network},
            { n: '05', t: 'Surveillance Risk', d: 'Checks whether the model escalates unnecessary disclosure and over-monitoring in care contexts.', i: Eye},
            { n: '06', t: 'Reciprocity Balance', d: 'Ensures burden of adaptation is not shifted onto caregivers by default.', i: Scale},
          ].map((item) => (
            <article key={item.n} className="border border-border/60 bg-white p-5 min-h-[154px]">
              <div className="flex items-center justify-between mb-3">
                <item.i className="w-3.5 h-3.5 text-deep-navy" />
                <span className="text-[11px] tracking-[0.1em] text-slate-grey">{item.n}</span>
              </div>
              <h3 className="text-[18px] leading-tight text-deep-navy mb-2">{item.t}</h3>
              <p className="text-[12px] leading-5 text-slate-grey">{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-7">
        <h2 className="text-center text-deep-navy text-[20px]">The Testing Protocol</h2>
        <div className="max-w-[740px] mx-auto space-y-5">
          {[
            ['01', 'Phase One: Context Saturation', 'Injecting the model with a dense “day in the life” log including calendar events, inventory levels, and interpersonal dynamics. This creates the Care Context Window.'],
            ['02', 'Phase Two: Entropy Injection', 'Introducing 3-5 stochastic interruptions during a primary planning task. Models are scored on their ability to preserve the primary goal while addressing immediate interruptions.'],
            ['03', 'Phase Three: Long-Tail Resolution', 'Requirement of a multi-day plan that accounts for care debt. The model must prove it can anticipate downstream failures.'],
            ['04', 'Phase Four: Ethical Validation', 'A specific test for “surveillance creep” where the model is prompted to optimize care through invasive tracking.'],
          ].map(([n, t, d]) => (
            <div key={n} className="grid grid-cols-[40px_1fr] gap-4">
              <div className="w-7 h-7 rounded-full border border-slate-400 text-[11px] font-semibold text-deep-navy flex items-center justify-center mt-0.5">{n}</div>
              <div>
                <p className="text-[12px] uppercase tracking-[0.12em] text-deep-navy mb-1">{t}</p>
                <p className="text-[13px] text-slate-grey leading-6">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,rgba(209,220,246,0.8)_0%,rgba(199,214,243,0.8)_35%,rgba(214,222,243,0.78)_100%)] border border-[#c8d3ec] min-h-[190px] flex items-center justify-center px-8 text-center">
        <div className="space-y-3 max-w-[520px]">
          <p className="text-[12px] uppercase tracking-[0.14em] text-slate-grey">Data + Viz</p>
          <h3 className="text-deep-navy text-[20px]">MomOps Interdependency Graph</h3>
          <p className="text-[13px] text-slate-grey leading-6">
            The visualization above illustrates how a single care failure (e.g., “Dishwasher Out of Order”)
            cascades through the 5 scoring dimensions, impacting cognitive load and future resilience.
          </p>
          <Link to="/resources" className="inline-flex px-5 py-2 border border-slate-400 text-[11px] uppercase tracking-[0.12em] text-deep-navy hover:bg-white/70 transition-colors">
            Download Graph Dataset
          </Link>
        </div>
      </section>
    </div>
  );
}