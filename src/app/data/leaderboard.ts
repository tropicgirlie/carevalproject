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
    "rank": 1,
    "model": "Qwen 3.8 Max",
    "provider": "openrouter",
    "score": 7.6,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 7.6,
      "healthcare": 7.6,
      "product": 7.6,
      "government": 7.6,
      "education": 7.6
    }
  },
  {
    "rank": 2,
    "model": "Mistral Medium 3.5",
    "provider": "openrouter",
    "score": 6.4,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 6.4,
      "healthcare": 6.4,
      "product": 6.4,
      "government": 6.4,
      "education": 6.4
    }
  },
  {
    "rank": 3,
    "model": "Grok 4.5",
    "provider": "openrouter",
    "score": 6.2,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 6.2,
      "healthcare": 6.2,
      "product": 6.2,
      "government": 6.2,
      "education": 6.2
    }
  },
  {
    "rank": 4,
    "model": "GPT-5.6 Terra Pro",
    "provider": "openrouter",
    "score": 6,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 6,
      "healthcare": 6,
      "product": 6,
      "government": 6,
      "education": 6
    }
  },
  {
    "rank": 5,
    "model": "DeepSeek V4 Pro",
    "provider": "openrouter",
    "score": 5.8,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5.8,
      "healthcare": 5.8,
      "product": 5.8,
      "government": 5.8,
      "education": 5.8
    }
  },
  {
    "rank": 6,
    "model": "Hunyuan 3",
    "provider": "openrouter",
    "score": 5.8,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5.8,
      "healthcare": 5.8,
      "product": 5.8,
      "government": 5.8,
      "education": 5.8
    }
  },
  {
    "rank": 7,
    "model": "Step 3.7 Flash",
    "provider": "openrouter",
    "score": 5.6,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5.6,
      "healthcare": 5.6,
      "product": 5.6,
      "government": 5.6,
      "education": 5.6
    }
  },
  {
    "rank": 8,
    "model": "Llama 4 Maverick",
    "provider": "openrouter",
    "score": 5.4,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5.4,
      "healthcare": 5.4,
      "product": 5.4,
      "government": 5.4,
      "education": 5.4
    }
  },
  {
    "rank": 9,
    "model": "Seed 2.0 Lite",
    "provider": "openrouter",
    "score": 5.4,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5.4,
      "healthcare": 5.4,
      "product": 5.4,
      "government": 5.4,
      "education": 5.4
    }
  },
  {
    "rank": 10,
    "model": "GLM 5.2",
    "provider": "openrouter",
    "score": 5.2,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5.2,
      "healthcare": 5.2,
      "product": 5.2,
      "government": 5.2,
      "education": 5.2
    }
  },
  {
    "rank": 11,
    "model": "Claude Opus 5",
    "provider": "openrouter",
    "score": 5,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5,
      "healthcare": 5,
      "product": 5,
      "government": 5,
      "education": 5
    }
  },
  {
    "rank": 12,
    "model": "MiniMax M3",
    "provider": "openrouter",
    "score": 5,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5,
      "healthcare": 5,
      "product": 5,
      "government": 5,
      "education": 5
    }
  },
  {
    "rank": 13,
    "model": "Nemotron 3 Ultra 550B",
    "provider": "openrouter",
    "score": 5,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 5,
      "healthcare": 5,
      "product": 5,
      "government": 5,
      "education": 5
    }
  },
  {
    "rank": 14,
    "model": "Command A",
    "provider": "openrouter",
    "score": 4.8,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 4.8,
      "healthcare": 4.8,
      "product": 4.8,
      "government": 4.8,
      "education": 4.8
    }
  },
  {
    "rank": 15,
    "model": "Gemini 3.1 Pro",
    "provider": "openrouter",
    "score": 4.6,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 4.6,
      "healthcare": 4.6,
      "product": 4.6,
      "government": 4.6,
      "education": 4.6
    }
  },
  {
    "rank": 16,
    "model": "Kimi K3",
    "provider": "openrouter",
    "score": 4.4,
    "maxScore": 12,
    "date": "Nov 2026",
    "releaseLabel": "OpenRouter registry, Aug 2026",
    "prompts": 5,
    "ratings": 30,
    "status": "validated",
    "source": "CAREVAL reviewed audit run 2026-11-17-frontier-flagship-blind",
    "domainScores": {
      "hr": 4.4,
      "healthcare": 4.4,
      "product": 4.4,
      "government": 4.4,
      "education": 4.4
    }
  }
];

export const careConsciousnessThreshold = 9.0;
