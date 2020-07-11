import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { DbSaveSurveyResult } from './db-save-survey-result'
import MockDate from 'mockdate'
import { throwError, mockSaveSurveyResultParams, mockSurveyResultModel } from '@/domain/test/index'
import { mockSaveSurveyResultRepository } from '@/data/test/index'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepository: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepository = mockSaveSurveyResultRepository()
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
    const saveSpy = jest.spyOn(saveSurveyResultRepository, 'save')
    await sut.save(mockSurveyResultModel())
    expect(saveSpy).toHaveBeenCalledWith(mockSurveyResultModel())
  })

  test('Should return a SurveyResultModel on save success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.save(mockSaveSurveyResultParams())
    expect(surveys).toEqual(mockSurveyResultModel())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepository } = makeSut()
    jest.spyOn(saveSurveyResultRepository, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow()
  })
})
