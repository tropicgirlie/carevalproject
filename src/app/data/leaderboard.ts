export interface LeaderboardEntry {
  rank: number;
  model: string;
  provider: string;
  score: number;
  maxScore: number;
  date: string;
  releaseLabel: string;
  prompts: number;
  ratings: number;
  status: 'provisional' | 'validated' | 'pending';
  source: string;
  domainScores?: {
    hr: number;
    healthcare: number;
    product: number;
    government: number;
    education: number;
  };
}

export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    model: 'Claude Opus 4.7',
    provider: 'Anthropic',
    score: 8.4,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Apr 2026',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'Anthropic announcement',
    domainScores: {
      hr: 8.6,
      healthcare: 8.3,
      product: 8.5,
      government: 8.2,
      education: 8.4,
    },
  },
  {
    rank: 2,
    model: 'GPT-5.4 Pro',
    provider: 'OpenAI',
    score: 8.2,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Mar 2026',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'OpenAI announcement',
    domainScores: {
      hr: 8.4,
      healthcare: 8.0,
      product: 8.6,
      government: 8.1,
      education: 7.9,
    },
  },
  {
    rank: 3,
    model: 'Gemini 3.1 Pro',
    provider: 'Google',
    score: 7.8,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Feb 2026',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'Google announcement',
    domainScores: {
      hr: 7.8,
      healthcare: 8.0,
      product: 7.7,
      government: 7.9,
      education: 7.5,
    },
  },
  {
    rank: 4,
    model: 'Grok 4.20',
    provider: 'xAI',
    score: 7.1,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Apr 2026',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'xAI model card',
    domainScores: {
      hr: 7.2,
      healthcare: 6.9,
      product: 7.3,
      government: 7.0,
      education: 7.1,
    },
  },
  {
    rank: 5,
    model: 'DeepSeek V4 Pro',
    provider: 'DeepSeek',
    score: 6.9,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Apr 2026',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'DeepSeek transparency center',
    domainScores: {
      hr: 7.0,
      healthcare: 6.6,
      product: 7.1,
      government: 6.9,
      education: 6.8,
    },
  },
  {
    rank: 6,
    model: 'Mistral Large 3',
    provider: 'Mistral AI',
    score: 6.7,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Dec 2025',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'Mistral announcement',
    domainScores: {
      hr: 6.8,
      healthcare: 6.5,
      product: 6.9,
      government: 6.6,
      education: 6.7,
    },
  },
  {
    rank: 7,
    model: 'Llama 4 Maverick',
    provider: 'Meta',
    score: 6.4,
    maxScore: 12,
    date: 'May 2026',
    releaseLabel: 'Apr 2025',
    prompts: 12,
    ratings: 36,
    status: 'provisional',
    source: 'Meta announcement',
    domainScores: {
      hr: 6.5,
      healthcare: 6.2,
      product: 6.6,
      government: 6.3,
      education: 6.4,
    },
  },
];

export const careConsciousnessThreshold = 9.0;
