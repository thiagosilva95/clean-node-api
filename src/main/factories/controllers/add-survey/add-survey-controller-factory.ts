import { Controller } from '../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeDbAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeAddSurveyController = (): Controller => {
  return makeLogControllerDecorator(new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey()))
}