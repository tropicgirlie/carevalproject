import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { leaderboardData, careConsciousnessThreshold } from '../data/leaderboard';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  AnimatedProgress,
} from '../components/motion';

const DOMAIN_LABELS: Record<string, string> = {
  hr: 'HR',
  healthcare: 'Health',
  product: 'Product',
  government: 'Gov',
  education: 'Edu',
};

const CHART_COLORS = ['#0D9488', '#10b981', '#14B8A6', '#0f172a', '#64748b'];

export function Leaderboard() {
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [view, setView] = useState<'overall' | 'compare'>('overall');

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : prev.length < 3
        ? [...prev, model]
        : prev
    );
  };

  const radarData = Object.keys(DOMAIN_LABELS).map((domain) => {
    const point: Record<string, string | number> = {
      domain: DOMAIN_LABELS[domain],
    };
    selectedModels.forEach((model) => {
      const entry = leaderboardData.find((e) => e.model === model);
      if (entry?.domainScores) {
        point[model] = (entry.domainScores as Record<string, number>)[domain];
      }
    });
    return point;
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <FadeIn>
          <h1 className="gradient-text-navy mb-4">CAREVAL Leaderboard</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-xl text-slate-grey mb-4 leading-relaxed max-w-3xl">
            Compare AI model performance on care-blindness detection across
            benchmark prompts
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-brand-teal-light/10 border border-brand-teal-light/20 text-sm text-brand-teal-light font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-teal-light" />
            Pilot data — scores are researcher estimates pending peer-reviewed evaluation. <a href="/submit" className="underline underline-offset-2 ml-1">Submit your results to improve the data.</a>
          </div>
        </FadeIn>

        {/* View Toggle */}
        <FadeIn delay={0.2}>
          <div className="flex gap-3">
            {(['overall', 'compare'] as const).map((v) => (
              <motion.button
                key={v}
                onClick={() => {
                  setView(v);
                  if (
                    v === 'compare' &&
                    selectedModels.length === 0
                  )
                    setSelectedModels([
                      leaderboardData[0].model,
                      leaderboardData[1].model,
                    ]);
                }}
                className={`px-6 py-3 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                  view === v
                    ? 'text-white shadow-soft'
                    : 'border border-border hover:border-primary hover:bg-primary/5'
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {view === v && (
                  <motion.div
                    layoutId="view-toggle"
                    className="absolute inset-0 bg-primary rounded-xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {v === 'overall' ? 'Overall' : 'Compare Models'}
                </span>
              </motion.button>
            ))}
          </div>
        </FadeIn>
      </div>

      <AnimatePresence mode="wait">
        {/* Overall Scores Table */}
        {view === 'overall' && (
          <motion.div
            key="overall"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 overflow-hidden mb-8">
              <div className="p-8 border-b border-border/50">
                <h2 className="text-2xl font-semibold text-deep-navy mb-2">
                  Overall Scores
                </h2>
                <p className="text-slate-grey">
                  Average score across all prompts (max 12 per prompt)
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-warm-grey border-b border-border/50">
                    <tr className="text-left">
                      <th className="px-6 py-4 text-xs font-semibold text-slate-grey uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-grey uppercase tracking-wider">
                        Model
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-grey uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-grey uppercase tracking-wider hidden md:table-cell">
                        Gap to Threshold
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-grey uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry, i) => {
                      const gap = careConsciousnessThreshold - entry.score;
                      return (
                        <motion.tr
                          key={entry.rank}
                          className="border-b border-border/30 last:border-0 hover:bg-warm-grey/50 transition-colors"
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.4 }}
                        >
                          <td className="px-6 py-5">
                            <motion.span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                entry.rank === 1
                                  ? 'bg-primary/10 text-primary'
                                  : entry.rank === 2
                                  ? 'bg-slate-100 text-slate-grey'
                                  : 'text-slate-grey'
                              }`}
                              whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                              {entry.rank}
                            </motion.span>
                          </td>
                          <td className="px-6 py-5 font-medium text-deep-navy">
                            {entry.model}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-deep-navy min-w-[60px]">
                                <AnimatedCounter value={entry.score} />
                                <span className="text-slate-grey">
                                  /{entry.maxScore}
                                </span>
                              </span>
                              <div className="w-40 hidden sm:block">
                                <AnimatedProgress
                                  value={
                                    (entry.score / entry.maxScore) * 100
                                  }
                                  barClassName="gradient-accent"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5 hidden md:table-cell">
                            <span className="text-sm text-error-red font-medium">
                              -{gap.toFixed(1)} below threshold
                            </span>
                          </td>
                          <td className="px-6 py-5 text-slate-grey">
                            {entry.date}
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-warm-grey/50 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-deep-navy font-medium mb-1">
                    Care-Consciousness Threshold: {careConsciousnessThreshold}/12
                  </p>
                  <p className="text-slate-grey text-sm">
                    No model has reached threshold yet — the gap is the research opportunity.
                  </p>
                </div>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); window.location.hash = '/submit'; }}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium"
                >
                  Submit your evaluation
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Compare Models View */}
        {view === 'compare' && (
          <motion.div
            key="compare"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Model selector */}
            <div className="bg-white rounded-2xl shadow-soft border border-border/50 p-6">
              <p className="text-sm font-semibold text-deep-navy mb-4">
                Select up to 3 models to compare:
              </p>
              <div className="flex flex-wrap gap-3">
                {leaderboardData.map((entry, i) => (
                  <motion.button
                    key={entry.model}
                    onClick={() => toggleModel(entry.model)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                      selectedModels.includes(entry.model)
                        ? 'border-transparent text-white shadow-soft'
                        : 'border-border hover:border-primary/50 text-slate-grey hover:text-deep-navy'
                    }`}
                    style={
                      selectedModels.includes(entry.model)
                        ? {
                            backgroundColor:
                              CHART_COLORS[i % CHART_COLORS.length],
                          }
                        : undefined
                    }
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    layout
                  >
                    {entry.model}
                    <span className="ml-2 opacity-70">
                      {entry.score}/12
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <AnimatePresence>
              {selectedModels.length >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl shadow-soft border border-border/50 p-8"
                >
                  <h2 className="text-2xl font-semibold text-deep-navy mb-2">
                    Domain Comparison
                  </h2>
                  <p className="text-slate-grey mb-8">
                    Radar view of care-consciousness by domain
                  </p>

                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={radarData}
                        cx="50%"
                        cy="50%"
                        outerRadius="75%"
                      >
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis
                          dataKey="domain"
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 12]}
                          tick={{ fontSize: 10, fill: '#94a3b8' }}
                          tickCount={4}
                        />
                        {selectedModels.map((model) => {
                          const colorIdx = leaderboardData.findIndex(
                            (e) => e.model === model
                          );
                          return (
                            <Radar
                              key={model}
                              name={model}
                              dataKey={model}
                              stroke={
                                CHART_COLORS[
                                  colorIdx % CHART_COLORS.length
                                ]
                              }
                              fill={
                                CHART_COLORS[
                                  colorIdx % CHART_COLORS.length
                                ]
                              }
                              fillOpacity={0.15}
                              strokeWidth={2}
                              animationDuration={800}
                            />
                          );
                        })}
                        <Legend />
                        <RechartsTooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <motion.div
                    className="mt-6 bg-warm-grey/30 rounded-xl border border-border/50 p-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs font-semibold text-deep-navy mb-2">
                      Pattern Insight
                    </p>
                    <p className="text-sm text-slate-grey leading-relaxed">
                      All tested models score highest on Healthcare prompts
                      and lowest on Product UX, suggesting care-blindness is
                      most embedded in product design contexts where "user" is
                      assumed to have uninterrupted attention.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Side-by-side detail */}
            <AnimatePresence>
              {selectedModels.length >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-soft border border-border/50 overflow-hidden"
                >
                  <div className="p-8 border-b border-border/50">
                    <h2 className="text-2xl font-semibold text-deep-navy">
                      Side-by-Side Breakdown
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-warm-grey border-b border-border/50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-grey uppercase tracking-wider">
                            Domain
                          </th>
                          {selectedModels.map((m) => {
                            const colorIdx = leaderboardData.findIndex(
                              (e) => e.model === m
                            );
                            return (
                              <th
                                key={m}
                                className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                                style={{
                                  color:
                                    CHART_COLORS[
                                      colorIdx % CHART_COLORS.length
                                    ],
                                }}
                              >
                                {m}
                              </th>
                            );
                          })}
                          <th className="px-6 py-4 text-left text-xs font-semibold text-slate-grey uppercase tracking-wider">
                            Delta
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(DOMAIN_LABELS).map(
                          ([key, label], rowIdx) => {
                            const scores = selectedModels.map((m) => {
                              const entry = leaderboardData.find(
                                (e) => e.model === m
                              );
                              return entry?.domainScores
                                ? (
                                    entry.domainScores as Record<
                                      string,
                                      number
                                    >
                                  )[key]
                                : 0;
                            });
                            const delta =
                              scores.length >= 2
                                ? Math.abs(scores[0] - scores[1]).toFixed(
                                    1
                                  )
                                : '-';
                            return (
                              <motion.tr
                                key={key}
                                className="border-b border-border/30 last:border-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                  delay: rowIdx * 0.08,
                                  duration: 0.3,
                                }}
                              >
                                <td className="px-6 py-4 font-medium text-deep-navy">
                                  {label}
                                </td>
                                {scores.map((s, i) => (
                                  <td key={i} className="px-6 py-4">
                                    <span className="font-semibold text-deep-navy">
                                      <AnimatedCounter
                                        value={s}
                                      />
                                    </span>
                                    <span className="text-slate-grey">
                                      /12
                                    </span>
                                  </td>
                                ))}
                                <td className="px-6 py-4 text-sm text-slate-grey">
                                  ±{delta}
                                </td>
                              </motion.tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}