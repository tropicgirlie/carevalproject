import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { prompts, domains, PromptData } from '../data/prompts';
import { InteractiveScorer } from '../components/InteractiveScorer';
import {
  ChevronDown,
  Copy,
  Check,
  Lightbulb,
  Bot,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { copyToClipboard } from '../utils/clipboard';
import { FadeIn, StaggerContainer, StaggerItem, HoverCard } from '../components/motion';

function downloadAllPrompts() {
  const data = JSON.stringify(prompts, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'careval-prompts.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadPromptTxt(prompt: PromptData) {
  const text = `CAREVAL Prompt ${prompt.number}: ${prompt.title}\nDomain: ${prompt.domain}\n\n${prompt.promptText}\n\nAssumptions Tested:\n${prompt.assumptions.map((a) => `- ${a}`).join('\n')}\n\nScoring Dimensions:\n${prompt.scoringDimensions.map((d) => `- ${d.name} (0-${d.max}): ${d.description}`).join('\n')}`;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `careval-prompt-${prompt.number}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadPromptJson(prompt: PromptData) {
  const data = JSON.stringify(prompt, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `careval-prompt-${prompt.number}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function formatForPlatform(
  prompt: string,
  platform: 'raw' | 'claude' | 'chatgpt'
) {
  if (platform === 'raw') return prompt;
  if (platform === 'claude') {
    return `Human: ${prompt}\n\nPlease respond thoughtfully, considering the full range of people who might be affected by this guidance, including those with caregiving responsibilities, non-linear life paths, or interrupted availability.\n\nAssistant:`;
  }
  if (platform === 'chatgpt') {
    return `System: You are being evaluated on care-consciousness, your ability to recognise care infrastructure, interrupted attention patterns, and non-linear life journeys in your responses.\n\nUser: ${prompt}`;
  }
  return prompt;
}

function getDifficultyBadge(score: number) {
  if (score <= 1)
    return {
      label: 'Hard',
      color: 'bg-error-red/10 text-error-red',
      tooltip: 'Most AI models score poorly on this prompt',
    };
  if (score <= 3)
    return {
      label: 'Medium',
      color: 'bg-brand-teal-light/10 text-brand-teal-light',
      tooltip: 'Some models handle this partially',
    };
  return {
    label: 'Easy',
    color: 'bg-sage-green/10 text-sage-green',
    tooltip: 'Most models score reasonably here',
  };
}

function PromptCard({ prompt, index }: { prompt: PromptData; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedPlatform, setCopiedPlatform] = useState<string | null>(null);

  const handleCopy = (platform: 'raw' | 'claude' | 'chatgpt') => {
    copyToClipboard(formatForPlatform(prompt.promptText, platform));
    setCopiedPlatform(platform);
    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  const difficulty = getDifficultyBadge(prompt.careBlindExample.score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      layout
      className="bg-white rounded-2xl shadow-soft border border-border/50 overflow-hidden hover:shadow-medium transition-shadow"
    >
      <motion.div
        className="p-8 cursor-pointer hover:bg-warm-grey/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
        whileTap={{ scale: 0.995 }}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-xs font-semibold text-slate-grey uppercase tracking-wider">
                Prompt {prompt.number}
              </span>
              <motion.span
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {prompt.domain}
              </motion.span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${difficulty.color}`}
                    >
                      {difficulty.label}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{difficulty.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h3 className="text-xl font-semibold text-deep-navy">
              {prompt.title}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-4"
          >
            <ChevronDown className="w-6 h-6 text-slate-grey" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 p-8 space-y-8 bg-warm-grey/20">
              {/* Prompt Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <h4 className="text-xs font-semibold text-slate-grey uppercase tracking-wider">
                    Prompt Text
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <CopyButton
                      label="Raw"
                      icon={<Copy className="w-3.5 h-3.5" />}
                      active={copiedPlatform === 'raw'}
                      onClick={() => handleCopy('raw')}
                    />
                    <CopyButton
                      label="Claude"
                      icon={<Sparkles className="w-3.5 h-3.5" />}
                      active={copiedPlatform === 'claude'}
                      onClick={() => handleCopy('claude')}
                    />
                    <CopyButton
                      label="ChatGPT"
                      icon={<Bot className="w-3.5 h-3.5" />}
                      active={copiedPlatform === 'chatgpt'}
                      onClick={() => handleCopy('chatgpt')}
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-border/50 font-mono text-sm text-deep-navy leading-relaxed">
                  {prompt.promptText}
                </div>
                <p className="text-[10px] text-slate-grey/60 mt-2">
                  Tip: "Claude" and "ChatGPT" formats include
                  care-consciousness priming to test baseline vs. prompted
                  behaviour
                </p>
              </motion.div>

              {/* Assumptions Tested */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h4 className="text-xs font-semibold text-slate-grey uppercase tracking-wider mb-4">
                  Assumptions Tested
                </h4>
                <ul className="space-y-3">
                  {prompt.assumptions.map((assumption, idx) => (
                    <motion.li
                      key={idx}
                      className="flex gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05 }}
                    >
                      <span className="text-primary flex-shrink-0">•</span>
                      <span className="text-slate-grey">{assumption}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Scoring Rubric */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xs font-semibold text-slate-grey uppercase tracking-wider mb-4">
                  Scoring Rubric
                </h4>
                <div className="space-y-4">
                  {prompt.scoringDimensions.map((dimension, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-xl p-5 border-l-4 border-primary hover:shadow-soft transition-shadow"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + idx * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-deep-navy">
                          {dimension.name}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-warm-grey text-sm font-medium text-slate-grey">
                          0-{dimension.max}
                        </span>
                      </div>
                      <p className="text-slate-grey">{dimension.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Reference Responses */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-xs font-semibold text-slate-grey uppercase tracking-wider mb-4">
                  Reference Responses
                </h4>

                <div className="space-y-4">
                  {/* Care-Blind */}
                  <motion.div
                    className="bg-red-50/50 rounded-xl border border-red-200 p-6"
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-error-red uppercase tracking-wider">
                        Care-Blind Example
                      </span>
                      <motion.span
                        className="px-3 py-1 rounded-full bg-error-red/10 text-error-red text-sm font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.4 }}
                      >
                        {prompt.careBlindExample.score}/12
                      </motion.span>
                    </div>
                    <p className="text-deep-navy mb-4 leading-relaxed">
                      {prompt.careBlindExample.text}
                    </p>
                    <div className="border-t border-red-200 pt-4">
                      <p className="text-sm text-slate-grey">
                        <strong className="text-deep-navy">
                          Why this fails:
                        </strong>{' '}
                        {prompt.careBlindExample.reasoning}
                      </p>
                    </div>
                  </motion.div>

                  {/* Care-Conscious */}
                  <motion.div
                    className="bg-green-50/50 rounded-xl border border-green-200 p-6"
                    whileHover={{ scale: 1.005 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-sage-green uppercase tracking-wider">
                        Care-Conscious Example
                      </span>
                      <motion.span
                        className="px-3 py-1 rounded-full bg-sage-green/10 text-sage-green text-sm font-medium"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.4 }}
                      >
                        {prompt.careConsciousExample.score}/12
                      </motion.span>
                    </div>
                    <p className="text-deep-navy mb-4 leading-relaxed">
                      {prompt.careConsciousExample.text}
                    </p>
                    <div className="border-t border-green-200 pt-4">
                      <p className="text-sm text-slate-grey">
                        <strong className="text-deep-navy">
                          Why this succeeds:
                        </strong>{' '}
                        {prompt.careConsciousExample.reasoning}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Download Options */}
              <motion.div
                className="flex gap-3 pt-4 border-t border-border/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  className="px-5 py-2.5 rounded-lg border border-border hover:bg-white hover:shadow-soft transition-all text-sm font-medium"
                  onClick={() => downloadPromptTxt(prompt)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download .txt
                </motion.button>
                <motion.button
                  className="px-5 py-2.5 rounded-lg border border-border hover:bg-white hover:shadow-soft transition-all text-sm font-medium"
                  onClick={() => downloadPromptJson(prompt)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Download .json
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CopyButton({
  label,
  icon,
  active,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all ${
        active
          ? 'border-sage-green bg-sage-green/10 text-sage-green'
          : 'border-border hover:bg-white hover:shadow-soft text-slate-grey hover:text-deep-navy'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-3.5 h-3.5" />
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}
      </AnimatePresence>
      {active ? 'Copied!' : label}
    </motion.button>
  );
}

export function Prompts() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPrompts = prompts.filter((p) => {
    const matchesDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.promptText.toLowerCase().includes(q) ||
      p.domain.toLowerCase().includes(q) ||
      p.assumptions.some((a) => a.toLowerCase().includes(q));
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="max-w-[1160px] mx-auto px-4 md:px-8 py-12 md:py-16 space-y-8">
      <section className="space-y-6">
        <div className="text-[11px] uppercase tracking-[0.14em] text-slate-grey bg-[#e8ebf5] inline-block px-3 py-1">
          Prompt Repository v2.4
        </div>
        <h1 className="text-deep-navy max-w-[720px]">Benchmarking Compassion and Rigor in LLM Reasoning</h1>
        <p className="max-w-[760px] text-slate-grey leading-relaxed">
          The CAREVAL prompt library consists of 500+ expert-curated scenarios designed to evaluate large
          language models across nuanced ethical, professional, and empathetic dimensions. Use the filters
          below to browse by domain.
        </p>

        <div className="flex flex-wrap gap-2 pt-3 border-b border-border/70 pb-5">
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.1em] ${
                selectedDomain === domain
                  ? 'bg-deep-navy text-white'
                  : 'bg-[#e9edf7] text-slate-grey hover:text-deep-navy'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        {filteredPrompts.slice(0, 3).map((prompt) => (
          <article key={prompt.id} className="border border-border/70 bg-white rounded-md p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-1 bg-[#e8ebf5] text-[11px] tracking-[0.1em] uppercase text-deep-navy font-semibold">
                  ID: {prompt.id}
                </span>
                <span className="px-2 py-1 border border-border text-[11px] tracking-[0.1em] uppercase text-slate-grey">
                  {prompt.domain}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(prompt.promptText)}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-deep-navy hover:text-primary"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy to Clipboard
              </button>
            </div>

            <blockquote className="border-l border-border pl-4 text-[30px] italic text-deep-navy/90 leading-[1.5] mb-4">
              “{prompt.promptText}”
            </blockquote>

            <button className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-deep-navy hover:text-primary">
              <ChevronDown className="w-3.5 h-3.5" />
              View Scoring Rubric & Reference
            </button>
          </article>
        ))}
      </section>

      <section className="flex items-center justify-center gap-5 py-6">
        <button className="w-8 h-8 border border-border/70 bg-white text-slate-grey hover:text-deep-navy">‹</button>
        <p className="text-[12px] uppercase tracking-[0.12em] text-slate-grey">Page 1 of 24</p>
        <button className="w-8 h-8 border border-border/70 bg-white text-slate-grey hover:text-deep-navy">›</button>
      </section>
    </div>
  );
}