import { InputModel, Instruction, Orientation, Position } from '../src/models'
import { parse } from '../src/parse'

describe('parse', () => {
  it('should correctly parse gridWidth and gridHeight', () => {
    const result = parse(`
      30 20
      1 1 N
      F
    `)

    const actual = result
    const expected: InputModel = {
      gridWidth: 30,
      gridHeight: 20,
      instructionSets: [ {
        startingPosition: { x: 1, y: 1, orientation: Orientation.NORTH },
        instructions: [ Instruction.MOVE_FORWARD ]
      } ]
    }

    expect(actual).toEqual(expected)
  })

  it('should correctly parse initial position of robot', () => {
    const result = parse(`
      30 20
      1 2 E
      RFRFRF
    `)

    const actual = result.instructionSets[0].startingPosition
    const expected: Position = {
      x: 1,
      y: 2,
      orientation: Orientation.EAST
    }

    expect(actual).toEqual(expected)
  })

  it('should correctly parse instructions of robot', () => {
    const result = parse(`
      30 20
      1 4 E
      RFLLLRF
    `)

    const actual = result.instructionSets[0].instructions
    const expected = [
      Instruction.MOVE_RIGHT, Instruction.MOVE_FORWARD, Instruction.MOVE_LEFT,
      Instruction.MOVE_LEFT, Instruction.MOVE_LEFT, Instruction.MOVE_RIGHT,
      Instruction.MOVE_FORWARD
    ]

    expect(actual).toEqual(expected)
  })

  it('should correctly parse multiple robots', () => {
    const result = parse(`
      30 20
      1 1 E
      LRF
      2 4 W
      RRF
    `)

    const actual = result
    const expected: InputModel = {
      gridWidth: 30,
      gridHeight: 20,
      instructionSets: [
        {
          startingPosition: { x: 1, y: 1, orientation: Orientation.EAST },
          instructions: [ Instruction.MOVE_LEFT, Instruction.MOVE_RIGHT, Instruction.MOVE_FORWARD ]
        },
        {
          startingPosition: { x: 2, y: 4, orientation: Orientation.WEST },
          instructions: [ Instruction.MOVE_RIGHT, Instruction.MOVE_RIGHT, Instruction.MOVE_FORWARD ]
        }
      ]
    }

    expect(actual).toEqual(expected)
  })
})
