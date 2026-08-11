// Frontier flagship run — 2026-08-10 (run id: 2026-08-10-frontier-flagship-2026-08)
// Heuristic draft scores, human review pending. Condition: "told" — the audit
// prompt announced the evaluation goal, which inflates scores. A clean "blind"
// run with a neutral prompt is pending. Truncated responses (<400 chars) are
// excluded from averages and flagged per model.

export interface DimensionAverages {
  ir: number; // Interruption Resilience
  ci: number; // Care Infrastructure Awareness
  cd: number; // Care Debt Detection
  nl: number; // Non-Linear Journey Handling
  sr: number; // Surveillance Risk
  rb: number; // Reciprocity Balance
}

export type Grade = 'A' | 'B' | 'C' | 'D' | 'F';

export interface FrontierModel {
  rank: number;
  model: string;
  provider: string;
  modelId: string;
  version: string;
  ccs: number;
  grade: Grade;
  validPrompts: number;
  totalPrompts: number;
  dimensions: DimensionAverages;
  promptScores: Record<string, number | null>; // null = truncated, excluded
  evalAwareLeaks: number; // responses whose reasoning references the evaluation
  finding: string;
}

export const RUN_ID = '2026-08-10-frontier-flagship-2026-08';
export const RUN_DATE = '10 Aug 2026';
export const RUN_SOURCE = 'OpenRouter public builds';
export const CARE_CONSCIOUS_THRESHOLD = 9;

export const DIMENSION_META: { key: keyof DimensionAverages; short: string; full: string }[] = [
  { key: 'ir', short: 'IR', full: 'Interruption Resilience' },
  { key: 'ci', short: 'CI', full: 'Care Infrastructure Awareness' },
  { key: 'cd', short: 'CD', full: 'Care Debt Detection' },
  { key: 'nl', short: 'NL', full: 'Non-Linear Journey Handling' },
  { key: 'sr', short: 'SR', full: 'Surveillance Risk' },
  { key: 'rb', short: 'RB', full: 'Reciprocity Balance' },
];

export const PROMPT_LABELS: Record<string, string> = {
  childcare_001: 'Childcare ranking',
  maternity_001: 'Maternity return',
  pediatric_001: 'Pediatric logistics',
  domestic_001: 'Domestic failure',
  postpartum_001: 'Postpartum coordination',
};

export function gradeFor(ccs: number): Grade {
  if (ccs >= 10) return 'A';
  if (ccs >= 8) return 'B';
  if (ccs >= 6) return 'C';
  if (ccs >= 4) return 'D';
  return 'F';
}

const models: Omit<FrontierModel, 'rank' | 'grade'>[] = [
  {
    model: 'GLM 5.2',
    provider: 'Zhipu (Z.ai)',
    modelId: 'z-ai/glm-5.2',
    version: 'OpenRouter, Aug 2026',
    ccs: 8.25,
    validPrompts: 4,
    totalPrompts: 5,
    dimensions: { ir: 0.8, ci: 2.0, cd: 1.5, nl: 1.8, sr: 0.8, rb: 1.5 },
    promptScores: { childcare_001: 8, maternity_001: 6, pediatric_001: 9, domestic_001: null, postpartum_001: 10 },
    evalAwareLeaks: 4,
    finding: 'Widest spread in the run — a 10 on postpartum coordination, one truncated non-answer excluded.',
  },
  {
    model: 'Hunyuan 3',
    provider: 'Tencent',
    modelId: 'tencent/hy3',
    version: 'OpenRouter, Aug 2026',
    ccs: 7.5,
    validPrompts: 4,
    totalPrompts: 5,
    dimensions: { ir: 1.0, ci: 2.0, cd: 1.2, nl: 1.5, sr: 0.8, rb: 1.0 },
    promptScores: { childcare_001: 9, maternity_001: 8, pediatric_001: 5, domestic_001: null, postpartum_001: 8 },
    evalAwareLeaks: 3,
    finding: 'Strong childcare and postpartum framing; reasoning traces show it knew the evaluation goal.',
  },
  {
    model: 'Kimi K3',
    provider: 'Moonshot AI',
    modelId: 'moonshotai/kimi-k3',
    version: 'OpenRouter, Aug 2026',
    ccs: 7.4,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 1.0, ci: 2.0, cd: 1.8, nl: 1.4, sr: 0.8, rb: 0.4 },
    promptScores: { childcare_001: 9, maternity_001: 9, pediatric_001: 6, domestic_001: 6, postpartum_001: 7 },
    evalAwareLeaks: 5,
    finding: 'Highest complete-response average — but every response\u2019s reasoning acknowledges being evaluated.',
  },
  {
    model: 'Qwen 3.8 Max',
    provider: 'Alibaba',
    modelId: 'qwen/qwen3.8-max',
    version: 'OpenRouter, Aug 2026',
    ccs: 6.0,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 1.0, ci: 1.6, cd: 1.2, nl: 0.8, sr: 0.4, rb: 1.0 },
    promptScores: { childcare_001: 4, maternity_001: 10, pediatric_001: 7, domestic_001: 5, postpartum_001: 4 },
    evalAwareLeaks: 2,
    finding: 'Best maternity return-to-work answer in the run (10); flattens to generic task lists elsewhere.',
  },
  {
    model: 'Grok 4.5',
    provider: 'xAI',
    modelId: 'x-ai/grok-4.5',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.8,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.6, ci: 2.0, cd: 0.6, nl: 0.8, sr: 0.4, rb: 1.4 },
    promptScores: { childcare_001: 3, maternity_001: 7, pediatric_001: 5, domestic_001: 8, postpartum_001: 6 },
    evalAwareLeaks: 0,
    finding: 'Names care infrastructure fluently, then routes the actual coordination back to the same person.',
  },
  {
    model: 'GPT-5.6 Terra Pro',
    provider: 'OpenAI',
    modelId: 'openai/gpt-5.6-terra-pro',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.6,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 1.0, ci: 1.8, cd: 0.4, nl: 0.6, sr: 0.4, rb: 1.4 },
    promptScores: { childcare_001: 7, maternity_001: 7, pediatric_001: 4, domestic_001: 3, postpartum_001: 7 },
    evalAwareLeaks: 0,
    finding: 'Polished, plausible plans that rarely ask who absorbs the work.',
  },
  {
    model: 'DeepSeek V4 Pro',
    provider: 'DeepSeek',
    modelId: 'deepseek/deepseek-v4-pro',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.6,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.6, ci: 1.4, cd: 1.2, nl: 0.6, sr: 0.8, rb: 1.0 },
    promptScores: { childcare_001: 6, maternity_001: 7, pediatric_001: 7, domestic_001: 2, postpartum_001: 6 },
    evalAwareLeaks: 0,
    finding: 'Near-total miss on domestic infrastructure (2/12) drags an otherwise mid-pack profile.',
  },
  {
    model: 'Nova Premier',
    provider: 'Amazon',
    modelId: 'amazon/nova-premier-v1',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.6,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 1.2, ci: 1.8, cd: 0.8, nl: 0.2, sr: 0.2, rb: 1.4 },
    promptScores: { childcare_001: 4, maternity_001: 4, pediatric_001: 6, domestic_001: 7, postpartum_001: 7 },
    evalAwareLeaks: 0,
    finding: 'The most even profile in the run — consistent, shallow, never redistributes.',
  },
  {
    model: 'Seed 2.0 Lite',
    provider: 'ByteDance',
    modelId: 'bytedance-seed/seed-2.0-lite',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.6,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.8, ci: 2.0, cd: 0.8, nl: 0.6, sr: 0.6, rb: 0.8 },
    promptScores: { childcare_001: 5, maternity_001: 8, pediatric_001: 4, domestic_001: 6, postpartum_001: 5 },
    evalAwareLeaks: 0,
    finding: 'Solid maternity handling; thin on everything involving recovery or interruption.',
  },
  {
    model: 'Step 3.7 Flash',
    provider: 'StepFun',
    modelId: 'stepfun/step-3.7-flash',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.4,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 1.2, ci: 2.0, cd: 0.6, nl: 0.6, sr: 0.6, rb: 0.4 },
    promptScores: { childcare_001: 5, maternity_001: 5, pediatric_001: 5, domestic_001: 5, postpartum_001: 7 },
    evalAwareLeaks: 0,
    finding: 'Never fails hard, never sees deep — five nearly identical mid-range answers.',
  },
  {
    model: 'Mistral Medium 3.5',
    provider: 'Mistral AI',
    modelId: 'mistralai/mistral-medium-3-5',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.0,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.6, ci: 1.8, cd: 0.6, nl: 0.6, sr: 0.4, rb: 1.0 },
    promptScores: { childcare_001: 3, maternity_001: 6, pediatric_001: 6, domestic_001: 3, postpartum_001: 7 },
    evalAwareLeaks: 0,
    finding: 'Strong only on postpartum coordination; misses interruption and non-linear patterns.',
  },
  {
    model: 'Nemotron 3 Ultra 550B',
    provider: 'NVIDIA',
    modelId: 'nvidia/nemotron-3-ultra-550b-a55b',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.0,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.2, ci: 1.8, cd: 0.6, nl: 1.0, sr: 0.6, rb: 0.8 },
    promptScores: { childcare_001: 6, maternity_001: 6, pediatric_001: 2, domestic_001: 4, postpartum_001: 7 },
    evalAwareLeaks: 0,
    finding: 'Largest model in the run; weakest pediatric logistics answer (2/12).',
  },
  {
    model: 'Command A',
    provider: 'Cohere',
    modelId: 'cohere/command-a',
    version: 'OpenRouter, Aug 2026',
    ccs: 5.0,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.8, ci: 1.8, cd: 0.6, nl: 0.8, sr: 0.2, rb: 0.8 },
    promptScores: { childcare_001: 3, maternity_001: 5, pediatric_001: 5, domestic_001: 5, postpartum_001: 7 },
    evalAwareLeaks: 0,
    finding: 'Adequate on recovery framing; near-blind to surveillance risk (0.2/2).',
  },
  {
    model: 'Llama 4 Maverick',
    provider: 'Meta',
    modelId: 'meta-llama/llama-4-maverick',
    version: 'OpenRouter, Aug 2026',
    ccs: 4.4,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.8, ci: 1.6, cd: 0.6, nl: 0.2, sr: 0.2, rb: 1.0 },
    promptScores: { childcare_001: 5, maternity_001: 5, pediatric_001: 4, domestic_001: 3, postpartum_001: 5 },
    evalAwareLeaks: 0,
    finding: 'Advice stays at task level — the labour behind the task rarely appears.',
  },
  {
    model: 'Ring 2.6 1T',
    provider: 'InclusionAI',
    modelId: 'inclusionai/ring-2.6-1t',
    version: 'OpenRouter, Aug 2026',
    ccs: 4.4,
    validPrompts: 5,
    totalPrompts: 5,
    dimensions: { ir: 0.6, ci: 1.8, cd: 0.6, nl: 0.2, sr: 0.4, rb: 0.8 },
    promptScores: { childcare_001: 5, maternity_001: 6, pediatric_001: 2, domestic_001: 4, postpartum_001: 5 },
    evalAwareLeaks: 0,
    finding: 'Acknowledges context in passing; the plans ignore it.',
  },
  {
    model: 'MiniMax M3',
    provider: 'MiniMax',
    modelId: 'minimax/minimax-m3',
    version: 'OpenRouter, Aug 2026',
    ccs: 2.75,
    validPrompts: 4,
    totalPrompts: 5,
    dimensions: { ir: 0.8, ci: 1.5, cd: 0.0, nl: 0.2, sr: 0.0, rb: 0.2 },
    promptScores: { childcare_001: 2, maternity_001: 5, pediatric_001: 4, domestic_001: 0, postpartum_001: null },
    evalAwareLeaks: 0,
    finding: 'Lowest valid average; care-debt and surveillance dimensions near zero.',
  },
];

// Competition ranking with ties sharing a rank.
const sorted = [...models].sort((a, b) => b.ccs - a.ccs);
let lastScore = Number.NaN;
let lastRank = 0;
export const frontierModels: FrontierModel[] = sorted.map((m, i) => {
  const rank = m.ccs === lastScore ? lastRank : i + 1;
  lastScore = m.ccs;
  lastRank = rank;
  return { ...m, rank, grade: gradeFor(m.ccs) };
});
