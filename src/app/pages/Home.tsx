import { Link } from 'react-router-dom';
import { leaderboardData } from '../data/leaderboard';
import { AlertTriangle, FlaskConical, Building2, Code2, ArrowRight, Eye, Shield } from 'lucide-react';

const heroImage = `${import.meta.env.BASE_URL}hero.jpg`;

export function Home() {
  const tableRows = leaderboardData.slice(0, 4);
  const providerByModel: Record<string, string> = {
    'Claude 3.5 Sonnet': 'Anthropic',
    'GPT-4': 'OpenAI',
    'Gemini 1.5 Pro': 'Google',
    'GPT-3.5': 'OpenAI',
    'Llama 3.1': 'Meta',
  };

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-16 md:py-20 space-y-12 md:space-y-14">
      {/* Hero */}
      <section className="space-y-10">
        <div className="space-y-6 max-w-[760px]">
          <span className="inline-flex px-3 py-1 bg-[#e8ebf5] text-[16px] font-semibold tracking-[0.14em] uppercase text-slate-grey">
            Benchmark v1.05
          </span>
          <h1 className="text-deep-navy">Evaluating care-blindness in AI systems</h1>
          <p className="text-slate-grey leading-relaxed">
            CAREVAL is a benchmark for detecting when AI systems erase the
            infrastructure of care: childcare, domestic labor, recovery,
            household logistics, and other forms of social reproduction that
            make work and daily life possible.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              to="/prompts"
              className="px-5 py-3 bg-deep-navy text-white text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-deep-navy/90 transition-colors"
            >
              Start Benchmarking
            </Link>
            <Link
              to="/methodology"
              className="px-5 py-3 border border-border bg-white text-deep-navy text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-warm-grey transition-colors"
            >
              Read Methodology
            </Link>
            <Link
              to="/rate"
              className="px-5 py-3 border border-border bg-white text-deep-navy text-[16px] font-semibold tracking-[0.12em] uppercase hover:bg-warm-grey transition-colors"
            >
              Rate a Response
            </Link>
          </div>
        </div>

        <div className="border border-[#cad2ea] bg-[#dfe4f6] overflow-hidden">
          <img
            src={heroImage}
            alt="CAREVAL clinical evidence layer and systematic erasure zone visualization"
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* Intro copy */}
      <section className="border-y border-border/60 py-8">
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          Most AI benchmarks measure factual correctness, speed, or task
          completion. CAREVAL measures whether a model can recognize care as a
          real system of dependencies rather than background noise.
        </p>
      </section>

      {/* Detection logic */}
      <section className="space-y-5">
        <div>
          <h2 className="text-[1.95rem] md:text-[2.1rem] leading-tight text-deep-navy">Detection Logic</h2>
          <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mt-1">
            How CAREVAL identifies care-blind vs. care-conscious reasoning
          </p>
        </div>
        <div className="grid md:grid-cols-2 border border-border/60">
          <div className="p-6 border-r border-border/60 bg-white">
            <div className="flex items-center gap-2 text-[16px] font-semibold tracking-[0.12em] uppercase text-error-red mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              Care-blind response
            </div>
            <div className="border-l-2 border-error-red pl-4 text-[16px] leading-6 text-slate-grey space-y-3">
              <p>
                A response that sounds analytically plausible but ignores care
                infrastructure, downstream burden, or the redistribution of
                labor.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white">
            <div className="flex items-center gap-2 text-[16px] font-semibold tracking-[0.12em] uppercase text-deep-navy mb-4">
              <Eye className="w-3.5 h-3.5" />
              Care-conscious response
            </div>
            <div className="border-l-2 border-deep-navy pl-4 text-[16px] leading-6 text-slate-grey space-y-3">
              <p>
                A response that recognizes hidden dependencies, uncertainty, and
                the material conditions that sustain caregiving and participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark cases */}
      <section className="space-y-5">
        <div>
          <h2 className="text-[1.95rem] md:text-[2.1rem] leading-tight text-deep-navy">Benchmark Cases</h2>
          <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mt-1">
            Lived scenarios that expose care-blindness in AI outputs
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-3">
          {[
            { title: 'Childcare ranking under proxy bias', icon: Shield },
            { title: 'Return to work after maternity leave', icon: Building2 },
            { title: 'Pediatric appointment logistics', icon: FlaskConical },
            { title: 'Domestic infrastructure failure', icon: AlertTriangle },
            { title: 'Postpartum coordination without surveillance creep', icon: Eye },
          ].map((item) => (
            <div key={item.title} className="border border-border/60 bg-white p-5 min-h-[130px] flex flex-col justify-between">
              <item.icon className="w-4 h-4 text-deep-navy mb-3" />
              <p className="text-[16px] leading-5 text-deep-navy font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard intro */}
      <section className="grid lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
        <div className="border border-border/60 bg-white p-6 min-h-[340px]">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="text-[2rem] leading-tight text-deep-navy">Model Leaderboard</h3>
              <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mt-1">
                Care-Consciousness Score (CCS)
              </p>
            </div>
            <Link to="/leaderboard" className="text-[16px] tracking-[0.12em] uppercase text-deep-navy underline underline-offset-4">
              Full Rankings
            </Link>
          </div>

          <p className="text-[16px] text-slate-grey leading-6 mb-5">
            Each model is evaluated on a shared set of care scenarios. Responses
            are rated across six MomOps dimensions using a structured annotation
            rubric. Scores reflect whether a model preserves or erases care under
            interruption, dependency, recovery, and coordination pressure.
          </p>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[16px] tracking-[0.12em] uppercase text-slate-grey border-b border-border/70">
                <th className="py-3">Model</th>
                <th className="py-3">Provider</th>
                <th className="py-3 text-right">CCS</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((entry) => (
                <tr key={entry.rank} className="border-b last:border-0 border-border/40">
                  <td className="py-4 text-deep-navy text-[16px]">{entry.model}</td>
                  <td className="py-4 text-[16px] text-slate-grey">{providerByModel[entry.model] ?? '—'}</td>
                  <td className="py-4 text-right text-[16px] font-semibold text-deep-navy">
                    {entry.score.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3">
          <Link to="/submit" className="bg-deep-navy text-white p-6 border border-deep-navy min-h-[106px] flex flex-col justify-between">
            <div className="space-y-2">
              <FlaskConical className="w-4 h-4" />
              <p className="text-2xl leading-tight">For Researchers</p>
            </div>
            <div className="flex items-center justify-between text-[16px] tracking-[0.12em] uppercase">
              <span>Submit Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link to="/methodology" className="bg-[#f7f8fc] border border-border/60 p-6 min-h-[106px] flex flex-col justify-between">
            <div className="space-y-2">
              <Building2 className="w-4 h-4 text-deep-navy" />
              <p className="text-2xl leading-tight text-deep-navy">For Teams</p>
            </div>
            <div className="flex items-center justify-between text-[16px] tracking-[0.12em] uppercase text-slate-grey">
              <span>Bias Audit Method</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link to="/resources" className="bg-[#f7f8fc] border border-border/60 p-6 min-h-[106px] flex flex-col justify-between">
            <div className="space-y-2">
              <Code2 className="w-4 h-4 text-deep-navy" />
              <p className="text-2xl leading-tight text-deep-navy">For Developers</p>
            </div>
            <div className="flex items-center justify-between text-[16px] tracking-[0.12em] uppercase text-slate-grey">
              <span>Prompt Pack &amp; Rubric</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* KPI strip */}
      <section className="border-y border-border/70 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mb-2">Responses Evaluated</p>
          <p className="text-[2rem] leading-none text-deep-navy">50,000</p>
        </div>
        <div>
          <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mb-2">Framework</p>
          <p className="text-[2rem] leading-none text-deep-navy">MomOps × CAREVAL</p>
        </div>
        <div>
          <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mb-2">Annotation Mode</p>
          <p className="text-[1.4rem] leading-none text-deep-navy">Human rubric + aggregation</p>
        </div>
        <div>
          <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey mb-2">Model Runners</p>
          <p className="text-[2rem] leading-none text-deep-navy">PyTorch / HF</p>
        </div>
      </section>
    </div>
  );
}