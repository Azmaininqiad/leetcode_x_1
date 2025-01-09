import { ModalInterface } from '@/interface/ModalInterface'
import { ValidModel } from '@/constants/valid_modals'

import { OpenAI_3_5_turbo } from '@/modals/modal/OpenAI_3_5_turbo'
import { GeminiAI_1_5_flash } from '@/modals/modal/GeminiAI_1_5_flash'
import { OpenAi_4o } from './modal/OpenAI_40'

export const modals: Record<ValidModel, ModalInterface> = {
  'openai_3.5_turbo': new OpenAI_3_5_turbo(),
  openai_4o: new OpenAi_4o(),
  'gemini-1.5-flash': new GeminiAI_1_5_flash(),
}