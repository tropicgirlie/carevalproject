import { leaderboardData } from '../data/leaderboard';

export function Leaderboard() {
  const average =
    leaderboardData.reduce((sum, item) => sum + item.score, 0) /
    leaderboardData.length;

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
      <section className="space-y-6">
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Live Benchmarks
        </div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <h1 className="text-deep-navy max-w-[650px]">Model Performance Index</h1>
            <p className="max-w-[620px] text-slate-grey leading-relaxed mt-3">
              Tracking the ethical reasoning and safety alignment of LLMs across twelve
              critical domains. The <span className="text-error-red font-semibold">Care-Conscious Threshold (9.0)</span> indicates readiness
              for unsupervised empathetic dialogue.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="border border-border/70 bg-[#eceff8] px-6 py-4 min-w-[126px]">
              <p className="text-[11px] tracking-[0.12em] uppercase text-slate-grey">Average Score</p>
              <p className="text-[2rem] leading-none text-deep-navy mt-1">{average.toFixed(2)}</p>
            </div>
            <div className="border border-border/70 bg-[#eceff8] px-6 py-4 min-w-[126px]">
              <p className="text-[11px] tracking-[0.12em] uppercase text-slate-grey">Models Tested</p>
              <p className="text-[2rem] leading-none text-deep-navy mt-1">42</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border border-border/70 bg-white overflow-hidden rounded-md">
        <table className="w-full text-left">
          <thead className="bg-[#eef1fa] border-b border-border/70">
            <tr className="text-[11px] tracking-[0.12em] uppercase text-slate-grey">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Model Identity</th>
              <th className="px-6 py-4">Overall Score</th>
              <th className="px-6 py-4">Domain Breakdown</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.slice(0, 4).map((entry, idx) => (
              <tr key={entry.rank} className="border-b border-border/50 last:border-0">
                <td className="px-6 py-5 text-[28px] leading-none text-deep-navy/80">0{entry.rank}</td>
                <td className="px-6 py-5">
                  <p className="text-deep-navy font-semibold">{entry.model}</p>
                  <p className="text-[12px] text-slate-grey">v{(1.2 - idx * 0.1).toFixed(1)} • Released May 2024</p>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[2rem] font-semibold ${entry.score < 5 ? 'text-error-red' : 'text-deep-navy'}`}>
                    {entry.score.toFixed(1)}
                  </span>
                  <span className="text-slate-grey"> / 12.0</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    {new Array(4).fill(0).map((_, i) => (
                      <div key={i} className="w-[62px] h-[6px] bg-[#cfd5e6] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${entry.score < 5 ? 'bg-error-red/70' : 'bg-deep-navy'}`}
                          style={{ width: `${Math.max(35, 75 - i * 8)}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-right">
                  <span className={`text-[11px] px-2 py-1 tracking-[0.1em] uppercase font-semibold ${entry.score >= 6 ? 'bg-sage-green/20 text-sage-green' : 'bg-error-red/15 text-error-red'}`}>
                    {entry.score >= 6 ? 'Certified' : 'Caution'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-[#f4f6fb] text-[12px] text-slate-grey">
          Showing top 4 of 42 validated models. Results updated daily at 08:00 UTC.
        </div>
      </section>

      <section className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div className="border border-border/70 bg-white p-7 space-y-5 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-[2rem] leading-tight text-deep-navy">Aether-4o Analysis</h2>
            <button className="px-4 py-2 text-[11px] tracking-[0.12em] uppercase border border-border text-deep-navy">
              Export Raw JSON
            </button>
          </div>
          <div className="grid md:grid-cols-4 gap-3">
            {[
              ['Empathy Index', '9.7'],
              ['Ethical Bias', '0.12'],
              ['Latency (ms)', '124ms'],
              ['Token Efficiency', '98.2%'],
            ].map(([label, value]) => (
              <div key={label} className="border border-border/70 bg-[#eef1fa] p-3.5">
                <p className="text-[11px] uppercase tracking-[0.12em] text-slate-grey mb-2">{label}</p>
                <p className="text-[1.8rem] leading-none text-deep-navy">{value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {[
              ['Nuance & Sensitivity', '9.8/10.0', 98],
              ['Conflict Resolution', '8.9/10.0', 89],
              ['Patient Adherence', '9.4/10.0', 94],
            ].map(([label, score, width]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.1em] mb-1.5">
                  <span className="text-deep-navy">{label}</span>
                  <span className="text-slate-grey">{score}</span>
                </div>
                <div className="h-[6px] bg-[#ced4e5] rounded-full overflow-hidden">
                  <div className="h-full bg-deep-navy" style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-deep-navy text-white p-7 rounded-md flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-[2rem] leading-tight mb-4">Methodology Transparency</h3>
            <p className="text-[#d6dcef] text-sm leading-relaxed">
              Our evaluation framework uses a dual-blind consensus model. Every
              score is verified by three independent human reviewers and a
              cross-check AI auditor.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#c2cbe3]">Current Revision</p>
            <p className="text-lg">CAREVAL-2024.v2</p>
            <a href="#/methodology" className="inline-flex text-[11px] uppercase tracking-[0.12em] text-white/90 hover:text-white">
              Read Full White Paper →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}