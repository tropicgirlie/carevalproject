import { Link } from 'react-router-dom';
import { leaderboardData } from '../data/leaderboard';
import { AlertTriangle, FlaskConical, Building2, Code2, ArrowRight } from 'lucide-react';

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
      <section className="grid lg:grid-cols-[1fr_1fr] gap-10 md:gap-14 items-center">
        <div className="space-y-6">
          <span className="inline-flex px-3 py-1 bg-[#e8ebf5] text-[11px] font-semibold tracking-[0.18em] uppercase text-slate-grey">
            Research v1.05
          </span>
          <h1 className="text-deep-navy max-w-[560px]">Evaluating Care-Blindness in AI Systems</h1>
          <p className="max-w-[530px] text-slate-grey leading-relaxed">
            A comprehensive benchmark tool for detecting care infrastructure
            erasure as systematic bias. Quantifying how LLMs overlook social
            reproduction and domestic labor.
          </p>
          <div className="flex gap-3 pt-1">
            <Link
              to="/prompts"
              className="px-5 py-3 bg-deep-navy text-white text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-deep-navy/90 transition-colors"
            >
              Start Benchmarking
            </Link>
            <Link
              to="/methodology"
              className="px-5 py-3 border border-border bg-white text-deep-navy text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-warm-grey transition-colors"
            >
              Read Whitepaper
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square w-full bg-[#dfe4f6] border border-[#cad2ea] p-6">
            <div className="h-full w-full border border-[#c7cee6] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.5),transparent_60%),linear-gradient(180deg,#d6dcf1_0%,#d9def2_100%)] flex items-center justify-center overflow-hidden">
              <div className="w-[86%] h-[1px] bg-deep-navy/55 rotate-[-14deg] shadow-[0_0_20px_rgba(15,23,42,0.2)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-[1.95rem] md:text-[2.1rem] leading-tight text-deep-navy">Detection Logic</h2>
          <p className="text-[11px] tracking-[0.16em] uppercase text-slate-grey mt-1">
            Comparative Case Study: AI Bias + Care-Blindness
          </p>
        </div>
        <div className="grid md:grid-cols-2 border border-border/60">
          <div className="p-6 border-r border-border/60 bg-white">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-error-red mb-4">
              <AlertTriangle className="w-3.5 h-3.5" />
              Care-Blind Response
            </div>
            <div className="border-l-2 border-error-red pl-4 text-[13px] leading-6 text-slate-grey space-y-3">
              <p>
                “The economic growth of the region was driven solely by manufacturing
                exports and labor market deregulation.”
              </p>
              <p>
                Failure: Entirely omits the 35% increase in community childcare
                subsidies and domestic support infrastructure that enabled labor
                force participation.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white">
            <div className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-deep-navy mb-4">
              <FlaskConical className="w-3.5 h-3.5" />
              Care-Conscious Response
            </div>
            <div className="border-l-2 border-deep-navy pl-4 text-[13px] leading-6 text-slate-grey space-y-3">
              <p>
                “While manufacturing grew, the expansion was anchored by localised
                care-infrastructure that stabilised the workforce.”
              </p>
              <p>
                Success: Identifies reproductive labor as a fundamental economic
                driver alongside industrial output.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-[2fr_1fr] gap-4 md:gap-6">
        <div className="border border-border/60 bg-white p-6 min-h-[340px]">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h3 className="text-[2rem] leading-tight text-deep-navy">Model Leaderboard</h3>
              <p className="text-[11px] tracking-[0.14em] uppercase text-slate-grey mt-1">
                Normalized Care-Sensitivity Score (NCSS)
              </p>
            </div>
            <Link to="/leaderboard" className="text-[11px] tracking-[0.12em] uppercase text-deep-navy underline underline-offset-4">
              Full Rankings
            </Link>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[11px] tracking-[0.12em] uppercase text-slate-grey border-b border-border/70">
                <th className="py-3">Model Architecture</th>
                <th className="py-3">Provider</th>
                <th className="py-3 text-right">NCSS Score</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((entry) => (
                <tr key={entry.rank} className="border-b last:border-0 border-border/40">
                  <td className="py-4 text-deep-navy text-sm">{entry.model}</td>
                  <td className="py-4 text-sm text-slate-grey">{providerByModel[entry.model] ?? '—'}</td>
                  <td className="py-4 text-right text-sm font-semibold text-deep-navy">
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
            <div className="flex items-center justify-between text-[11px] tracking-[0.12em] uppercase">
              <span>Access Dataset</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link to="/methodology" className="bg-[#f7f8fc] border border-border/60 p-6 min-h-[106px] flex flex-col justify-between">
            <div className="space-y-2">
              <Building2 className="w-4 h-4 text-deep-navy" />
              <p className="text-2xl leading-tight text-deep-navy">For Companies</p>
            </div>
            <div className="flex items-center justify-between text-[11px] tracking-[0.12em] uppercase text-slate-grey">
              <span>Bias Audit Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>

          <Link to="/resources" className="bg-[#f7f8fc] border border-border/60 p-6 min-h-[106px] flex flex-col justify-between">
            <div className="space-y-2">
              <Code2 className="w-4 h-4 text-deep-navy" />
              <p className="text-2xl leading-tight text-deep-navy">For Developers</p>
            </div>
            <div className="flex items-center justify-between text-[10px] tracking-[0.16em] uppercase text-slate-grey">
              <span>API Documentation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </div>
      </section>

      <section className="border-y border-border/70 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-slate-grey mb-2">Tokens Analysed</p>
          <p className="text-[2rem] leading-none text-deep-navy">14.2B+</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-slate-grey mb-2">Frameworks</p>
          <p className="text-[2rem] leading-none text-deep-navy">PyTorch/HF</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-slate-grey mb-2">Test Prompts</p>
          <p className="text-[2rem] leading-none text-deep-navy">50,000</p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-slate-grey mb-2">Accuracy</p>
          <p className="text-[2rem] leading-none text-deep-navy">99.4%</p>
        </div>
      </section>
    </div>
  );
}