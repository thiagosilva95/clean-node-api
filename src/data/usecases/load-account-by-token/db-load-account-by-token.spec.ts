import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './db-load-account-by-token-protocols'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('any_value'))
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new DbLoadAccountByToken(decrypterStub)
    const decrypterSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decrypterSpy).toHaveBeenCalledWith('any_token')
  })
})
