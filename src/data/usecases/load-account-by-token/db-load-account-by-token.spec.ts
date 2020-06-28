import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './db-load-account-by-token-protocols'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }
  return new DecrypterStub()
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
}

const makeSut = (role?: string): SutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub, role)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const role = 'any_role'
    const { sut, decrypterStub } = makeSut(role)
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })
})
