export const VALID_MODELS = [
  {
    model: 'gpt-3.5-turbo',
    name: 'openai_3.5_turbo',
    display: 'GPT-3.5 Turbo',
  },
  {
    model: 'gpt-4o',
    name: 'openai_4o',
    display: 'GPT-4 Optimized',
  },
  {
    model: 'gemini-1.5-flash',
    name: 'gemini-1.5-flash',
    display: 'Gemini-1.5-flash',
  },
]

export type ValidModel = 'openai_3.5_turbo' | 'openai_4o' | 'gemini-1.5-flash'