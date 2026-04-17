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

  const filteredPrompts =
    selectedDomain === 'All'
      ? prompts
      : prompts.filter((p) => p.domain === selectedDomain);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="mb-16">
        <FadeIn>
          <h1 className="gradient-text-navy mb-4">CAREVAL Benchmark Prompts</h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-xl text-slate-grey mb-8 leading-relaxed max-w-3xl">
            {prompts.length} research-validated prompts testing care
            infrastructure erasure across five critical domains
          </p>
        </FadeIn>

        {/* Filters */}
        <FadeIn delay={0.2}>
          <div className="bg-gradient-to-br from-warm-grey/20 to-warm-grey/10 rounded-2xl border border-border/50 p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-deep-navy">
                Filter by domain:
              </span>
              <div className="flex-1 text-sm text-slate-grey">
                Showing{' '}
                <motion.span
                  key={filteredPrompts.length}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-block font-semibold text-deep-navy"
                >
                  {filteredPrompts.length}
                </motion.span>{' '}
                of {prompts.length} prompts
              </div>
            </div>
            <div className="flex gap-3 flex-wrap mb-4">
              {domains.map((domain) => (
                <motion.button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                    selectedDomain === domain
                      ? 'text-white shadow-soft'
                      : 'border border-border hover:border-primary hover:bg-primary/5'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {selectedDomain === domain && (
                    <motion.div
                      layoutId="domain-filter"
                      className="absolute inset-0 bg-primary rounded-xl"
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{domain}</span>
                </motion.button>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <p className="text-xs text-slate-grey">
                Each prompt includes scoring rubric, assumptions tested, and
                reference responses
              </p>
              <motion.button
                className="px-5 py-2.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium"
                onClick={downloadAllPrompts}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download All
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Prompts List */}
        <div className="space-y-6">
          <AnimatePresence mode="sync">
            {filteredPrompts.map((prompt, i) => (
              <PromptCard key={prompt.id} prompt={prompt} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* Sticky sidebar with interactive scorer */}
        <div className="hidden lg:block sticky top-24">
          <FadeIn direction="right" delay={0.3}>
            <InteractiveScorer />
            <div className="mt-4 bg-warm-grey/30 rounded-xl border border-border/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary" />
                <p className="text-xs font-semibold text-deep-navy">
                  Quick tip
                </p>
              </div>
              <p className="text-[11px] text-slate-grey leading-relaxed">
                Use the scorer while reading AI responses. Score each dimension
                as you go. It builds intuition for spotting care-blindness
                patterns.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}