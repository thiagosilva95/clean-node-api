import { LoadSurveys } from './load-surveys-controller-protocols'
import { Controller, HttpResponse, HttpRequest } from '../../../protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return new Promise(resolve => resolve(null))
  }
}
