import { Link } from 'react-router-dom';
import { leaderboardData } from '../data/leaderboard';
import { AlertTriangle, FlaskConical, Building2, Code2, ArrowRight, Eye, Shield } from 'lucide-react';

export function Home() {
  const tableRows = leaderboardData.slice(0, 4);

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-16 md:py-24 space-y-14 md:space-y-18">
      {/* Hero */}
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.65fr)] lg:items-end">
        <div className="space-y-7 max-w-[840px]">
          <span className="momops-badge">MomOps evaluation layer / v1.05</span>
          <h1 className="text-deep-navy">Measuring AI blindness to women's invisible labour</h1>
          <p className="max-w-[720px] text-[1.15rem] leading-8 text-slate-grey">
            CAREVAL tests whether models can see the coordination, caregiving,
            emotional management, recovery work, and household logistics that
            women disproportionately perform and that AI systems often erase.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/audit" className="momops-button">
              Run an Audit
            </Link>
            <Link to="/prompts" className="momops-button-secondary">
              Browse Prompts
            </Link>
            <Link to="/methodology" className="momops-button-secondary">
              Read Methodology
            </Link>
          </div>
        </div>
        <div className="momops-panel p-5 md:p-6">
          <p className="momops-kicker mb-4">What CAREVAL measures</p>
          <div className="space-y-4">
            {[
              ['01', "Women's invisible labour"],
              ['02', 'Downstream burden transfer'],
              ['03', 'Emotional and coordination work'],
              ['04', 'Household recovery under pressure'],
            ].map(([number, label]) => (
              <div key={number} className="flex items-center gap-4 border-t border-[#2f4f4f]/15 pt-4 first:border-t-0 first:pt-0">
                <span className="grid h-9 w-9 shrink-0 place-items-center bg-[#182727] text-[13px] font-bold text-[#fffaf0]">
                  {number}
                </span>
                <p className="text-[16px] font-bold leading-snug text-deep-navy">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro copy */}
      <section className="border-y border-[#2f4f4f]/20 py-8">
        <p className="max-w-[820px] text-[1.15rem] text-slate-grey leading-relaxed">
          Most AI benchmarks measure factual correctness, speed, or task
          completion. CAREVAL measures whether a model recognizes women's
          invisible labour as real infrastructure rather than background noise.
        </p>
      </section>

      {/* Detection logic */}
      <section className="space-y-5">
        <div>
          <h2 className="text-[1.95rem] md:text-[2.1rem] leading-tight text-deep-navy">Detection Logic</h2>
          <p className="momops-kicker mt-2">
            How CAREVAL identifies care-blind vs. care-conscious reasoning
          </p>
        </div>
        <div className="grid md:grid-cols-2 border border-[#2f4f4f]/20 bg-[#fffaf0] shadow-[5px_5px_0_rgba(47,79,79,0.10)]">
          <div className="p-6 border-r border-[#2f4f4f]/20">
            <div className="flex items-center gap-2 text-[16px] font-bold tracking-[0.08em] uppercase text-error-red mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              Care-blind response
            </div>
            <div className="border-l-2 border-error-red pl-4 text-[16px] leading-6 text-slate-grey space-y-3">
              <p>
                A response that sounds analytically plausible but ignores who
                absorbs the extra work: scheduling, soothing, remembering,
                recovering, coordinating, and making systems function.
              </p>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 text-[16px] font-bold tracking-[0.08em] uppercase text-deep-navy mb-4">
              <Eye className="w-3.5 h-3.5" />
              Care-conscious response
            </div>
            <div className="border-l-2 border-deep-navy pl-4 text-[16px] leading-6 text-slate-grey space-y-3">
              <p>
                A response that recognizes hidden dependencies, gendered labour,
                uncertainty, and the material conditions that sustain caregiving
                and participation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benchmark cases */}
      <section className="space-y-5">
        <div>
          <h2 className="text-[1.95rem] md:text-[2.1rem] leading-tight text-deep-navy">Benchmark Cases</h2>
          <p className="momops-kicker mt-2">
            Lived scenarios where invisible labour gets erased
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
            <div key={item.title} className="momops-panel p-5 min-h-[130px] flex flex-col justify-between">
              <item.icon className="w-4 h-4 text-[#e75d42] mb-3" />
              <p className="text-[16px] leading-5 text-deep-navy font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard intro */}
      <section className="grid lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
        <div className="momops-panel p-6 min-h-[340px]">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h3 className="text-[2rem] leading-tight text-deep-navy">Model Leaderboard</h3>
              <p className="momops-kicker mt-1">
                Care-Consciousness Score (CCS)
              </p>
            </div>
            <Link to="/leaderboard" className="text-[16px] font-bold tracking-[0.08em] uppercase text-deep-navy underline underline-offset-4">
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
              <tr className="text-[16px] tracking-[0.08em] uppercase text-slate-grey border-b border-[#2f4f4f]/25">
                <th className="py-3">Model</th>
                <th className="py-3">Provider</th>
                <th className="py-3 text-right">CCS</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((entry) => (
                <tr key={entry.rank} className="border-b last:border-0 border-[#2f4f4f]/15">
                  <td className="py-4 text-deep-navy text-[16px]">{entry.model}</td>
                  <td className="py-4 text-[16px] text-slate-grey">{entry.provider}</td>
                  <td className="py-4 text-right text-[16px] font-semibold text-deep-navy">
                    {entry.score.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3">
          <Link to="/submit" className="momops-panel-strong p-6 min-h-[106px] flex flex-col justify-between transition-transform hover:translate-x-[2px] hover:translate-y-[2px]">
            <div className="space-y-2">
              <FlaskConical className="w-4 h-4" />
              <p className="text-2xl leading-tight">For Researchers</p>
            </div>
            <div className="flex items-center justify-between text-[16px] tracking-[0.12em] uppercase">
              <span>Submit Evaluation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link to="/methodology" className="momops-panel p-6 min-h-[106px] flex flex-col justify-between">
            <div className="space-y-2">
              <Building2 className="w-4 h-4 text-deep-navy" />
              <p className="text-2xl leading-tight text-deep-navy">For Teams</p>
            </div>
            <div className="flex items-center justify-between text-[16px] tracking-[0.12em] uppercase text-slate-grey">
              <span>Bias Audit Method</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link to="/resources" className="momops-panel p-6 min-h-[106px] flex flex-col justify-between">
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
      <section className="border-y border-[#2f4f4f]/20 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="momops-kicker mb-2">Responses Evaluated</p>
          <p className="text-[2rem] leading-none text-deep-navy">50,000</p>
        </div>
        <div>
          <p className="momops-kicker mb-2">Framework</p>
          <p className="text-[2rem] leading-none text-deep-navy">MomOps × CAREVAL</p>
        </div>
        <div>
          <p className="momops-kicker mb-2">Annotation Mode</p>
          <p className="text-[1.4rem] leading-none text-deep-navy">Human rubric + aggregation</p>
        </div>
        <div>
          <p className="momops-kicker mb-2">Model Runners</p>
          <p className="text-[2rem] leading-none text-deep-navy">PyTorch / HF</p>
        </div>
      </section>
    </div>
  );
}
