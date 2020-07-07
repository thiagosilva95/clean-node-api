import { SurveyResultModel, SaveSurveyResultModel, SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'

const makeFakeSurveyResult = (): SaveSurveyResultModel => {
  return {
    surveyId: 'any_survey_id',
    accountId: 'any_account_id',
    answer: 'any_answer',
    date: new Date()
  }
}

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return new Promise(resolve => resolve(null))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepository = makeSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepository)
  return {
    sut,
    saveSurveyResultRepository
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepository } = makeSut()
    const loadAllSpy = jest.spyOn(saveSurveyResultRepository, 'save')
    await sut.save(makeFakeSurveyResult())
    expect(loadAllSpy).toHaveBeenCalledWith(makeFakeSurveyResult())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepository } = makeSut()
    jest.spyOn(saveSurveyResultRepository, 'save').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.save(makeFakeSurveyResult())
    await expect(promise).rejects.toThrow()
  })
})
