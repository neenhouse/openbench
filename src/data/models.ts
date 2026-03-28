export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerColor: string;
  version: string;
  scores: {
    overall: number;
    coding: number;
    reasoning: number;
    creativity: number;
    speed: number;
    cost: number;
  };
  contextWindow: string;
  pricing: string;
  released: string;
  badge?: 'top-pick' | 'best-value' | 'fastest';
}

export const models: AIModel[] = [
  {
    id: 'claude-opus-4',
    name: 'Claude Opus 4',
    provider: 'Anthropic',
    providerColor: '#D97706',
    version: '4',
    scores: { overall: 94, coding: 96, reasoning: 95, creativity: 93, speed: 72, cost: 65 },
    contextWindow: '200K',
    pricing: '$15 / $75 per 1M tokens',
    released: 'Mar 2025',
    badge: 'top-pick',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    providerColor: '#10B981',
    version: '4o',
    scores: { overall: 91, coding: 90, reasoning: 92, creativity: 91, speed: 85, cost: 70 },
    contextWindow: '128K',
    pricing: '$5 / $15 per 1M tokens',
    released: 'May 2024',
  },
  {
    id: 'gemini-2-ultra',
    name: 'Gemini 2 Ultra',
    provider: 'Google',
    providerColor: '#4285F4',
    version: '2 Ultra',
    scores: { overall: 90, coding: 88, reasoning: 91, creativity: 89, speed: 80, cost: 68 },
    contextWindow: '2M',
    pricing: '$7 / $21 per 1M tokens',
    released: 'Feb 2025',
  },
  {
    id: 'claude-sonnet-4',
    name: 'Claude Sonnet 4',
    provider: 'Anthropic',
    providerColor: '#D97706',
    version: '4',
    scores: { overall: 89, coding: 91, reasoning: 88, creativity: 87, speed: 88, cost: 80 },
    contextWindow: '200K',
    pricing: '$3 / $15 per 1M tokens',
    released: 'Mar 2025',
    badge: 'best-value',
  },
  {
    id: 'gpt-o3',
    name: 'GPT-o3',
    provider: 'OpenAI',
    providerColor: '#10B981',
    version: 'o3',
    scores: { overall: 92, coding: 93, reasoning: 96, creativity: 85, speed: 55, cost: 45 },
    contextWindow: '200K',
    pricing: '$10 / $40 per 1M tokens',
    released: 'Jan 2025',
  },
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick',
    provider: 'Meta',
    providerColor: '#3B82F6',
    version: '4',
    scores: { overall: 85, coding: 83, reasoning: 84, creativity: 86, speed: 90, cost: 95 },
    contextWindow: '1M',
    pricing: '$0.20 / $0.60 per 1M tokens',
    released: 'Apr 2025',
    badge: 'fastest',
  },
  {
    id: 'mistral-large-3',
    name: 'Mistral Large 3',
    provider: 'Mistral',
    providerColor: '#F97316',
    version: '3',
    scores: { overall: 86, coding: 85, reasoning: 87, creativity: 84, speed: 82, cost: 78 },
    contextWindow: '128K',
    pricing: '$3 / $9 per 1M tokens',
    released: 'Mar 2025',
  },
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    providerColor: '#8B5CF6',
    version: 'V3',
    scores: { overall: 87, coding: 89, reasoning: 86, creativity: 82, speed: 78, cost: 92 },
    contextWindow: '128K',
    pricing: '$0.27 / $1.10 per 1M tokens',
    released: 'Dec 2024',
  },
  {
    id: 'grok-3',
    name: 'Grok 3',
    provider: 'xAI',
    providerColor: '#EF4444',
    version: '3',
    scores: { overall: 84, coding: 82, reasoning: 85, creativity: 88, speed: 76, cost: 60 },
    contextWindow: '128K',
    pricing: '$5 / $15 per 1M tokens',
    released: 'Feb 2025',
  },
  {
    id: 'claude-haiku-35',
    name: 'Claude Haiku 3.5',
    provider: 'Anthropic',
    providerColor: '#D97706',
    version: '3.5',
    scores: { overall: 78, coding: 76, reasoning: 77, creativity: 75, speed: 95, cost: 93 },
    contextWindow: '200K',
    pricing: '$0.80 / $4 per 1M tokens',
    released: 'Oct 2024',
  },
  {
    id: 'gemini-2-flash',
    name: 'Gemini 2 Flash',
    provider: 'Google',
    providerColor: '#4285F4',
    version: '2 Flash',
    scores: { overall: 82, coding: 80, reasoning: 81, creativity: 79, speed: 93, cost: 90 },
    contextWindow: '1M',
    pricing: '$0.10 / $0.40 per 1M tokens',
    released: 'Feb 2025',
  },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    providerColor: '#10B981',
    version: '4o-mini',
    scores: { overall: 79, coding: 77, reasoning: 78, creativity: 80, speed: 92, cost: 94 },
    contextWindow: '128K',
    pricing: '$0.15 / $0.60 per 1M tokens',
    released: 'Jul 2024',
  },
];

export type ScoreKey = keyof AIModel['scores'];

export const scoreLabels: Record<ScoreKey, string> = {
  overall: 'Overall',
  coding: 'Coding',
  reasoning: 'Reasoning',
  creativity: 'Creativity',
  speed: 'Speed',
  cost: 'Cost Efficiency',
};

export const useCases = [
  { id: 'coding', label: 'Software Development', icon: '{}', weights: { coding: 3, reasoning: 2, speed: 1, creativity: 0.5, cost: 1, overall: 1 } },
  { id: 'writing', label: 'Content Writing', icon: 'Aa', weights: { creativity: 3, reasoning: 1, speed: 1.5, coding: 0, cost: 1.5, overall: 1 } },
  { id: 'analysis', label: 'Data Analysis', icon: '#', weights: { reasoning: 3, coding: 2, speed: 1, creativity: 0.5, cost: 1, overall: 1 } },
  { id: 'chat', label: 'Conversational AI', icon: '>', weights: { creativity: 2, reasoning: 1.5, speed: 2.5, coding: 0, cost: 2, overall: 1 } },
  { id: 'research', label: 'Research & QA', icon: '?', weights: { reasoning: 3, creativity: 1.5, speed: 0.5, coding: 0.5, cost: 1, overall: 1.5 } },
  { id: 'automation', label: 'Task Automation', icon: '@', weights: { coding: 2, reasoning: 2, speed: 2, creativity: 0.5, cost: 2, overall: 1 } },
];
