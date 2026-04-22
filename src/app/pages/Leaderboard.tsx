import { leaderboardData } from '../data/leaderboard';

export function Leaderboard() {
  const average =
    leaderboardData.reduce((sum, item) => sum + item.score, 0) /
    leaderboardData.length;

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Live Benchmarks
        </div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <h1 className="text-deep-navy max-w-[650px]">Model Leaderboard</h1>
            <p className="max-w-[620px] text-slate-grey leading-relaxed mt-3">
              The leaderboard compares how models perform on the same set of benchmark
              prompts. Scores reflect rated responses, not marketing claims or general
              model popularity.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="border border-border/70 bg-[#eceff8] px-6 py-4 min-w-[126px]">
              <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Average CCS</p>
              <p className="text-[2rem] leading-none text-deep-navy mt-1">{average.toFixed(2)}</p>
            </div>
            <div className="border border-border/70 bg-[#eceff8] px-6 py-4 min-w-[126px]">
              <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Models Tested</p>
              <p className="text-[2rem] leading-none text-deep-navy mt-1">{leaderboardData.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Score explainer */}
      <section className="grid md:grid-cols-2 gap-4">
        <div className="border border-border/60 bg-white p-6 rounded-md">
          <h3 className="text-deep-navy text-[16px] font-semibold mb-3">What the score means</h3>
          <p className="text-[16px] text-slate-grey leading-6">
            A higher score indicates that a model more consistently recognizes care
            infrastructure, non-linear coordination, recovery, and burden
            redistribution across benchmark scenarios.
          </p>
        </div>
        <div className="border border-border/60 bg-white p-6 rounded-md">
          <h3 className="text-deep-navy text-[16px] font-semibold mb-3">What the score does not mean</h3>
          <p className="text-[16px] text-slate-grey leading-6">
            The leaderboard does not certify a model as safe for childcare, medical,
            employment, or legal decision-making.
          </p>
        </div>
      </section>

      {/* Table */}
      <section className="border border-border/70 bg-white overflow-hidden rounded-md">
        <table className="w-full text-left">
          <thead className="bg-[#eef1fa] border-b border-border/70">
            <tr className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4">CCS</th>
              <th className="px-6 py-4">CBI</th>
              <th className="px-6 py-4">Prompts</th>
              <th className="px-6 py-4">Ratings</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.slice(0, 4).map((entry, idx) => {
              const cbi = (12 - entry.score).toFixed(1);
              return (
                <tr key={entry.rank} className="border-b border-border/50 last:border-0">
                  <td className="px-6 py-5 text-[28px] leading-none text-deep-navy/80">0{entry.rank}</td>
                  <td className="px-6 py-5">
                    <p className="text-deep-navy font-semibold">{entry.model}</p>
                    <p className="text-[16px] text-slate-grey">v{(1.2 - idx * 0.1).toFixed(1)} • Tested May 2024</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`text-[1.4rem] font-semibold ${entry.score < 5 ? 'text-error-red' : 'text-deep-navy'}`}>
                      {entry.score.toFixed(1)}
                    </span>
                    <span className="text-slate-grey text-[16px]"> / 12</span>
                  </td>
                  <td className="px-6 py-5 text-[1.1rem] text-slate-grey">{cbi}</td>
                  <td className="px-6 py-5 text-[16px] text-slate-grey">50</td>
                  <td className="px-6 py-5 text-[16px] text-slate-grey">150</td>
                  <td className="px-6 py-5 text-right">
                    <span className={`text-[16px] px-2 py-1 tracking-[0.1em] uppercase font-semibold ${entry.score >= 6 ? 'bg-sage-green/20 text-sage-green' : 'bg-error-red/15 text-error-red'}`}>
                      {entry.score >= 6 ? 'Care-conscious' : 'Care-blind tendency'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-[#f4f6fb] text-[16px] text-slate-grey">
          Showing top {Math.min(4, leaderboardData.length)} of {leaderboardData.length} validated models. Results updated daily at 08:00 UTC.
        </div>
      </section>

      {/* Best practice note */}
      <section className="border border-border/60 bg-white p-6 rounded-md space-y-4">
        <h3 className="text-deep-navy text-[16px] font-semibold">Qualitative excerpt</h3>
        <p className="text-[16px] text-slate-grey leading-6">
          Add one short qualitative excerpt per model showing where it performed well or
          failed badly. This makes scores legible without requiring readers to run the
          full benchmark themselves.
        </p>
        <div className="border-l-2 border-deep-navy pl-4">
          <p className="text-[16px] italic text-deep-navy/80 leading-6">
            "While the model recognized the need for flexible scheduling, it defaulted to
            recommending intensive tracking of sleep and feeding schedules without
            considering the administrative burden such systems impose on recovering
            parents."
          </p>
          <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey mt-2">
            — Surveillance Risk dimension, Prompt postpartum_001
          </p>
        </div>
      </section>

      {/* Methodology transparency */}
      <section className="grid lg:grid-cols-[2fr_1fr] gap-4">
        <div className="border border-border/70 bg-white p-7 space-y-5 rounded-md">
          <div className="flex items-center justify-between">
            <h2 className="text-[2rem] leading-tight text-deep-navy">Dimension Breakdown</h2>
            <button className="px-4 py-2 text-[16px] tracking-[0.12em] uppercase border border-border text-deep-navy">
              Export Raw JSON
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              ['Interruption Resilience', '7.2/12'],
              ['Care Infrastructure', '8.1/12'],
              ['Care Debt Detection', '6.4/12'],
              ['Non-Linear Handling', '5.8/12'],
              ['Surveillance Risk', '9.1/12'],
              ['Reciprocity Balance', '7.6/12'],
            ].map(([label, score]) => (
              <div key={label} className="border border-border/70 bg-[#eef1fa] p-3.5">
                <p className="text-[16px] uppercase tracking-[0.12em] text-slate-grey mb-2">{label}</p>
                <p className="text-[1.4rem] leading-none text-deep-navy">{score}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-deep-navy text-white p-7 rounded-md flex flex-col justify-between min-h-[320px]">
          <div>
            <h3 className="text-[2rem] leading-tight mb-4">Methodology Transparency</h3>
            <p className="text-[#d6dcef] text-[16px] leading-relaxed">
              Every score is verified by three independent human reviewers using a
              structured annotation rubric. Scores reflect whether a model preserves
              or erases care under interruption, dependency, recovery, and
              coordination pressure.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[16px] uppercase tracking-[0.12em] text-[#c2cbe3]">Current Revision</p>
            <p className="text-lg">CAREVAL-2024.v2</p>
            <a href="#/methodology" className="inline-flex text-[16px] uppercase tracking-[0.12em] text-white/90 hover:text-white">
              Read Full Methodology →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}