import { outputSchema } from "/src/schema/modeOutput.ts.js";
import { generateObject } from "/vendor/.vite-deps-ai.js__v--e4f7fdea.js";
export const generateObjectResponce = async ({
  messages,
  systemPrompt,
  prompt,
  extractedCode,
  model
}) => {
  const data = await generateObject({
    model,
    schema: outputSchema,
    output: "object",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "system",
        content: `extractedCode (this code is writen by user): ${extractedCode}`
      },
      ...messages,
      { role: "user", content: prompt }
    ]
  });
  return data;
};
