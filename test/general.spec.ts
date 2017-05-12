import { execute } from '../src/execute'
import { InputModel, OutputModel } from '../src/models'
import { outputToString } from '../src/outputToString'
import { parse } from '../src/parse'

const input =
`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`

const output =
`1 1 E
3 3 N LOST
2 3 S`

describe('general tests', () => {
  it('should work for the example given in the prompt', () => {
    const inputModel: InputModel = parse(input)
    const outputModel: OutputModel = execute(inputModel)

    const actual = outputToString(outputModel)
    const expected = output

    expect(actual).toBe(expected)
  })
})
