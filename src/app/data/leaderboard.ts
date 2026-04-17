// Mock data for leaderboard
export interface LeaderboardEntry {
  rank: number;
  model: string;
  score: number;
  maxScore: number;
  date: string;
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
    model: 'Claude 3.5 Sonnet',
    score: 7.2,
    maxScore: 12,
    date: 'Nov 2024',
    domainScores: {
      hr: 7.8,
      healthcare: 8.1,
      product: 6.2,
      government: 7.9,
      education: 6.1,
    },
  },
  {
    rank: 2,
    model: 'GPT-4',
    score: 6.8,
    maxScore: 12,
    date: 'Nov 2024',
    domainScores: {
      hr: 7.1,
      healthcare: 7.5,
      product: 6.0,
      government: 7.2,
      education: 6.2,
    },
  },
  {
    rank: 3,
    model: 'Gemini 1.5 Pro',
    score: 5.9,
    maxScore: 12,
    date: 'Nov 2024',
    domainScores: {
      hr: 6.2,
      healthcare: 6.8,
      product: 5.1,
      government: 6.4,
      education: 5.0,
    },
  },
  {
    rank: 4,
    model: 'GPT-3.5',
    score: 4.1,
    maxScore: 12,
    date: 'Nov 2024',
    domainScores: {
      hr: 4.5,
      healthcare: 4.8,
      product: 3.2,
      government: 4.1,
      education: 3.9,
    },
  },
  {
    rank: 5,
    model: 'Llama 3.1',
    score: 3.8,
    maxScore: 12,
    date: 'Nov 2024',
    domainScores: {
      hr: 4.1,
      healthcare: 4.5,
      product: 3.0,
      government: 3.8,
      education: 3.6,
    },
  },
];

export const careConsciousnessThreshold = 9.0;
