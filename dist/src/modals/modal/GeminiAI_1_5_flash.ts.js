import { createGoogleGenerativeAI } from "/vendor/.vite-deps-@ai-sdk_google.js__v--e4f7fdea.js";
import { generateObjectResponce } from "/src/modals/utils.ts.js";
import { VALID_MODELS } from "/src/constants/valid_modals.ts.js";
export class GeminiAI_1_5_flash {
  name = "gemini-1.5-flash";
  apiKey = "";
  init(apiKey) {
    this.apiKey = apiKey;
  }
  async generateResponse(props) {
    try {
      const google = createGoogleGenerativeAI({
        apiKey: this.apiKey
      });
      let data = await generateObjectResponce({
        model: google(
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
