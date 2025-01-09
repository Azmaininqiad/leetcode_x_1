import {
  GenerateResponseParamsType,
  GenerateResponseReturnType,
  ModalInterface,
} from '../interface/ModalInterface'

export abstract class BaseModal extends ModalInterface {
  protected apiKey: string = ''

  init(apiKey: string) {
    this.apiKey = apiKey
  }

  protected abstract makeApiCall(
    props: GenerateResponseParamsType
  ): GenerateResponseReturnType

  async generateResponse(
    props: GenerateResponseParamsType
  ): GenerateResponseReturnType {
    return this.makeApiCall(props)
  }
}
