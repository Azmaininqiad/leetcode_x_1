export const useChromeStorage = () => {
  let mockStorage = {};
  if (!chrome || !chrome.storage || !chrome.storage.local) {
    console.warn('chrome.storage.local is not available, using mock implementation');
  } else {
    mockStorage = chrome.storage.local;
  }

  return {
    setKeyModel: async (apiKey, model) => {
      mockStorage.set({ [model]: apiKey });
    },
    getKeyModel: async (model) => {
      const result = await mockStorage.get(model);
      return { model, apiKey: result[model] };
    },
    setSelectModel: async (model) => {
      await mockStorage.set({ ["selectedModel"]: model });
    },
    selectModel: async () => {
      const result = await mockStorage.get("selectedModel");
      return result["selectedModel"];
    }
  };
};
