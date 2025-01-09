import { createOpenAI } from "/vendor/.vite-deps-@ai-sdk_openai.js__v--e4f7fdea.js";
import { generateObjectResponce } from "/src/modals/utils.ts.js";
import { VALID_MODELS } from "/src/constants/valid_modals.ts.js";
export class OpenAI_3_5_turbo {
  name = "openai_3.5_turbo";
  apiKey = "";
  init(apiKey) {
    this.apiKey = apiKey;
  }
  async generateResponse(props) {
    try {
      const openai = createOpenAI({
        compatibility: "strict",
        apiKey: this.apiKey
      });
      let data = await generateObjectResponce({
        model: openai(
          VALID_MODELS.find((model) => model.name === this.name)?.model
        ),
        messages: props.messages,
        systemPrompt: props.systemPrompt,
        prompt: props.prompt,
        extractedCode: props.extractedCode
      });
      return {
        error: null,
        success: data.object
      };
    } catch (error) {
      return { error, success: null };
    }
  }
}
