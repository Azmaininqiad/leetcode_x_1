import { OpenAI_3_5_turbo } from "/src/modals/modal/OpenAI_3_5_turbo.ts.js";
import { GeminiAI_1_5_flash } from "/src/modals/modal/GeminiAI_1_5_flash.ts.js";
import { OpenAi_4o } from "/src/modals/modal/OpenAI_40.ts.js";
export const modals = {
  "openai_3.5_turbo": new OpenAI_3_5_turbo(),
  openai_4o: new OpenAi_4o(),
  "gemini-1.5-flash": new GeminiAI_1_5_flash()
};
