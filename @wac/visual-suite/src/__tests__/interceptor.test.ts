import { Interceptor } from '../interceptor'

const interceptor = new Interceptor()

test('call Interceptor.break return undefined', (): void => {
  expect(interceptor.break(document.body, 'click')).toBeUndefined()
})

test('call Interceptor.constitute return undefined', (): void => {
  expect(interceptor.constitute(document.body, false)).toBeUndefined()
})
