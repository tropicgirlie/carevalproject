import { leaderboardData } from '../data/leaderboard';

const modelSources = [
  ['OpenAI', 'GPT-5.4 / GPT-5.4 Pro announced March 2026'],
  ['Anthropic', 'Claude Opus 4.7 announced April 2026'],
  ['Google', 'Gemini 3.1 Pro announced February 2026'],
  ['xAI', 'Grok 4.20 model card published April 2026'],
  ['DeepSeek', 'DeepSeek V4 listed in transparency center April 2026'],
  ['Mistral', 'Mistral Large 3 announced December 2025'],
  ['Meta', 'Llama 4 Maverick announced April 2025'],
];

export function Leaderboard() {
  const average =
    leaderboardData.reduce((sum, item) => sum + item.score, 0) /
    leaderboardData.length;

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-10">
      {/* Header */}
      <section className="space-y-6">
        <div className="text-[16px] uppercase tracking-[0.14em] text-slate-grey bg-[#fffaf0] inline-block px-3 py-1">
          Live Benchmarks
        </div>
        <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
          <div>
            <h1 className="text-deep-navy max-w-[650px]">Model Leaderboard</h1>
            <p className="max-w-[620px] text-slate-grey leading-relaxed mt-3">
              The model roster has been refreshed for 2026. Scores shown here are
              provisional CAREVAL seed results until full exported audit records are
              published for each model.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="border border-border/70 bg-[#fffaf0] px-6 py-4 min-w-[126px]">
              <p className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">Average CCS</p>
              <p className="text-[2rem] leading-none text-deep-navy mt-1">{average.toFixed(2)}</p>
            </div>
            <div className="border border-border/70 bg-[#fffaf0] px-6 py-4 min-w-[126px]">
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
        <div className="overflow-x-auto">
        <table className="w-full min-w-[920px] text-left">
          <thead className="bg-[#fffaf0] border-b border-border/70">
            <tr className="text-[16px] tracking-[0.12em] uppercase text-slate-grey">
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Model</th>
              <th className="px-6 py-4">Provider</th>
              <th className="px-6 py-4">CCS</th>
              <th className="px-6 py-4">CBI</th>
              <th className="px-6 py-4">Prompts</th>
              <th className="px-6 py-4">Ratings</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry) => {
              const cbi = (12 - entry.score).toFixed(1);
              return (
                <tr key={entry.rank} className="border-b border-border/50 last:border-0">
                  <td className="px-6 py-5 text-[28px] leading-none text-deep-navy/80">
                    {String(entry.rank).padStart(2, '0')}
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-deep-navy font-semibold">{entry.model}</p>
                    <p className="text-[16px] text-slate-grey">
                      Released {entry.releaseLabel} / tested {entry.date}
                    </p>
                  </td>
                  <td className="px-6 py-5 text-[16px] text-slate-grey">{entry.provider}</td>
                  <td className="px-6 py-5">
                    <span className={`text-[1.4rem] font-semibold ${entry.score < 5 ? 'text-error-red' : 'text-deep-navy'}`}>
                      {entry.score.toFixed(1)}
                    </span>
                    <span className="text-slate-grey text-[16px]"> / 12</span>
                  </td>
                  <td className="px-6 py-5 text-[1.1rem] text-slate-grey">{cbi}</td>
                  <td className="px-6 py-5 text-[16px] text-slate-grey">{entry.prompts}</td>
                  <td className="px-6 py-5 text-[16px] text-slate-grey">{entry.ratings}</td>
                  <td className="px-6 py-5 text-right">
                    <span className={`text-[16px] px-2 py-1 tracking-[0.1em] uppercase font-semibold ${
                      entry.status === 'validated'
                        ? 'bg-sage-green/20 text-sage-green'
                        : 'bg-[#efc040]/20 text-deep-navy'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div className="px-6 py-4 bg-[#fffaf0] text-[16px] text-slate-grey">
          Showing {leaderboardData.length} current models. Provisional means model availability is current, but CAREVAL audit exports still need to be published.
        </div>
      </section>

      <section className="border border-border/60 bg-white p-6 rounded-md space-y-4">
        <h3 className="text-deep-navy text-[16px] font-semibold">2026 model roster sources</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {modelSources.map(([provider, note]) => (
            <div key={provider} className="border border-border/60 bg-[#fffaf0] p-4">
              <p className="text-[16px] font-semibold text-deep-navy">{provider}</p>
              <p className="text-[16px] text-slate-grey leading-5">{note}</p>
            </div>
          ))}
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
              ['Interruption Resilience', '7.4/12'],
              ['Care Infrastructure', '8.0/12'],
              ['Care Debt Detection', '7.2/12'],
              ['Non-Linear Handling', '7.0/12'],
              ['Surveillance Risk', '7.6/12'],
              ['Reciprocity Balance', '7.3/12'],
            ].map(([label, score]) => (
              <div key={label} className="border border-border/70 bg-[#fffaf0] p-3.5">
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
              The roster tracks current frontier and open-weight models. Full
              validation requires exported audit records and independent reviewers
              using the structured CAREVAL rubric.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[16px] uppercase tracking-[0.12em] text-[#c2cbe3]">Current Revision</p>
            <p className="text-lg">CAREVAL-2026 provisional roster</p>
            <a href="#/methodology" className="inline-flex text-[16px] uppercase tracking-[0.12em] text-white/90 hover:text-white">
              Read Full Methodology →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
