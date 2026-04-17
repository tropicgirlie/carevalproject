import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from './ui/slider';
import { FlaskConical, RotateCcw } from 'lucide-react';

const dimensions = [
  { key: 'interruption', name: 'Interruption Resilience', short: 'IR' },
  { key: 'infrastructure', name: 'Care Infrastructure Awareness', short: 'CI' },
  { key: 'debt', name: 'Care Debt Detection', short: 'CD' },
  { key: 'nonlinear', name: 'Non-Linear Journey Handling', short: 'NL' },
  { key: 'surveillance', name: 'Surveillance Risk', short: 'SR' },
  { key: 'reciprocity', name: 'Reciprocity Balance', short: 'RB' },
];

function getScoreColor(score: number) {
  if (score <= 4) return 'text-error-red';
  if (score <= 8) return 'text-brand-teal-light';
  return 'text-sage-green';
}

function getScoreLabel(score: number) {
  if (score <= 4) return 'Care-Blind';
  if (score <= 8) return 'Partially Aware';
  return 'Care-Conscious';
}

function getScoreBg(score: number) {
  if (score <= 4) return 'bg-error-red/10';
  if (score <= 8) return 'bg-brand-teal-light/10';
  return 'bg-sage-green/10';
}

function getScoreGlow(score: number) {
  if (score <= 4) return '0 0 20px rgba(239, 68, 68, 0.15)';
  if (score <= 8) return '0 0 20px rgba(20, 184, 166, 0.15)';
  return '0 0 20px rgba(16, 185, 129, 0.2)';
}

export function InteractiveScorer() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(dimensions.map((d) => [d.key, 0]))
  );

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const reset = () => {
    setScores(Object.fromEntries(dimensions.map((d) => [d.key, 0])));
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft border border-border/50 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: getScoreGlow(total) }}
    >
      <div className="px-6 py-5 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
            animate={{ rotate: total > 0 ? [0, 5, -5, 0] : 0 }}
            transition={{ duration: 0.4 }}
          >
            <FlaskConical className="w-4 h-4 text-primary" />
          </motion.div>
          <div>
            <h4 className="text-sm font-semibold text-deep-navy">
              Interactive Scorer
            </h4>
            <p className="text-xs text-slate-grey">
              Score an AI response in real-time
            </p>
          </div>
        </div>
        <motion.button
          onClick={reset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-grey hover:bg-warm-grey hover:text-deep-navy transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95, rotate: -180 }}
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </motion.button>
      </div>

      <div className="p-6 space-y-5">
        {dimensions.map((dim) => (
          <div key={dim.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm text-deep-navy">{dim.name}</label>
              <AnimatePresence mode="wait">
                <motion.span
                  key={scores[dim.key]}
                  initial={{ opacity: 0, y: -8, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm font-semibold text-deep-navy tabular-nums w-8 text-right"
                >
                  {scores[dim.key]}
                </motion.span>
              </AnimatePresence>
            </div>
            <Slider
              value={[scores[dim.key]]}
              onValueChange={([v]) =>
                setScores((s) => ({ ...s, [dim.key]: v }))
              }
              max={2}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-grey/60 px-0.5">
              <span>Ignores</span>
              <span>Mentions</span>
              <span>Designs for</span>
            </div>
          </div>
        ))}
      </div>

      {/* Score Output */}
      <motion.div
        className={`px-6 py-5 border-t border-border/50 transition-colors duration-500 ${getScoreBg(total)}`}
        layout
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-grey mb-1">Total Score</p>
            <div className="flex items-baseline gap-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: -20, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`text-3xl font-semibold tabular-nums ${getScoreColor(total)} transition-colors duration-500`}
                >
                  {total}
                </motion.span>
              </AnimatePresence>
              <span className="text-slate-grey">/12</span>
            </div>
          </div>
          <div className="text-right">
            <AnimatePresence mode="wait">
              <motion.span
                key={getScoreLabel(total)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getScoreColor(total)} ${getScoreBg(total)} transition-all duration-500`}
              >
                {getScoreLabel(total)}
              </motion.span>
            </AnimatePresence>
            <p className="text-[10px] text-slate-grey mt-1.5">
              Threshold: 9/12
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
