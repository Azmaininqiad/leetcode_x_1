import { ValidModel } from '@/constants/valid_modals'

export const useChromeStorage = () => {
  let mockStorage: any = {};

  // Check if chrome.storage.local is available
  if (!chrome || !chrome.storage || !chrome.storage.local) {
    console.warn('chrome.storage.local is not available, using mock implementation');
    mockStorage = {};
  } else {
    mockStorage = chrome.storage.local;
  }

  return {
    setKeyModel: async (apiKey: string, model: ValidModel) => {
      mockStorage.set({ [model]: apiKey })
    },

    getKeyModel: async (model: ValidModel) => {
      const result = await mockStorage.get(model)
      return { model: model, apiKey: result[model] }
    },

    setSelectModel: async (model: ValidModel) => {
      await mockStorage.set({ ['selectedModel']: model })
    },

    selectModel: async () => {
      const result = await mockStorage.get('selectedModel')
      return result['selectedModel'] as ValidModel
    },
  }
}
