import { outputSchema } from '@/schema/modeOutput'
import { z } from 'zod'
import { ChatHistoryParsed } from './chatHistory'

export abstract class ModalInterface {
  abstract name: string

  abstract init(apiKey?: string): void

  abstract generateResponse(props: GenerateResponseParamsType): Promise<{
    error: Error | null
    success: z.infer<typeof outputSchema> | null
  }>
}

export type GenerateResponseReturnType = Promise<{
  error: Error | null
  success: z.infer<typeof outputSchema> | null | any
}>

export type GenerateResponseParamsType = {
  prompt: string
  systemPrompt: string
  messages: ChatHistoryParsed[] | []
  extractedCode?: string
}
