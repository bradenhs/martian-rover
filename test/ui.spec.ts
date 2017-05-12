import { drawUI } from '../src/ui'

describe('ui', () => {
  it('should return empty input box value properlty', () => {
    const ui = drawUI()

    const textarea = document.querySelector('textarea')

    textarea && (textarea.value = 'test')

    const actual = ui.getInputBoxValue()
    const expected = 'test'

    expect(actual).toBe(expected)
  })
})
