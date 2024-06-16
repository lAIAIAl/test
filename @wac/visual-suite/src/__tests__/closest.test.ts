import { closest } from '../closest';

test('closest 无返回值', (): void => {
  expect(closest(document.body, '.btn')).toBeUndefined()
})

test('closest 返回正确的元素', (): void => {
  const layer0 = document.createElement('div')
  layer0.classList.add('c-wrapper')

  const layer1 = document.createElement('div')
  layer1.classList.add('c-wrapper-inner')

  const layer2 = document.createElement('span')
  layer2.classList.add('c-wrapper-content-text')

  layer1.appendChild(layer2)
  layer0.appendChild(layer1)

  expect(closest(layer2, '.c-wrapper-inner')).toEqual(layer1)
})