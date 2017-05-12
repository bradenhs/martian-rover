import { last } from 'lodash'
import { InputModel, Instruction, InstructionSet, Orientation, Position } from './models'

/**
 * Parses a string into an InputModel object
 * @param input the string to parse
 */
export function parse(input: string) {
  // Separate out the input into individual lines
  let lines = input.split(/\n/g)

  // Trim all leading and following whitespace on lines
  lines = lines.map(l => l.trim())

  // Filter out blank lines
  lines = lines.filter(l => l !== '')

  if (lines.length < 3) {
    throw new Error('There should be at least three lines of input for there to be output')
  }

  if ((lines.length - 1) % 2 !== 0) {
    throw new Error('Number of robot starting positions vs instructions does not match up')
  }

  let gridWidth = 0
  let gridHeight = 0
  const instructionSets: InstructionSet[] = []

  // Parse each line
  lines.forEach((line, index) => {
    if (index === 0) {
      const dimensions = parseGridDimensionsLine(line)
      gridHeight = dimensions.gridHeight
      gridWidth = dimensions.gridWidth
    } else if (index % 2 === 1) {
      instructionSets.push({
        startingPosition: parseRobotStartingPositionLine(line),
        instructions: []
      })
    } else {
      last(instructionSets).instructions = parseRobotInstructionsLine(line)
    }
  })

  return { gridHeight, gridWidth, instructionSets }
}

function parseGridDimensionsLine(line: string) {
  if (!/^\d+\s+\d+$/.test(line)) {
    throw new Error(`Invalid grid dimensions format: "${line}"`)
  }

  const parts = line.split(/\s+/)

  return {
    gridWidth: parseInt(parts[0], 10),
    gridHeight: parseInt(parts[1], 10)
  }
}

function parseRobotStartingPositionLine(line: string): Position {
  if (!/^\d+\s+\d+\s+(N|W|E|S)$/.test(line)) {
    throw new Error(`Invalid robot starting position format: "${line}"`)
  }

  const parts = line.split(/\s+/)

  const orientation = {
    N: Orientation.NORTH,
    W: Orientation.WEST,
    E: Orientation.EAST,
    S: Orientation.SOUTH
  }[parts[2] as 'N' | 'W' | 'S' | 'E']

  return {
    x: parseInt(parts[0], 10),
    y: parseInt(parts[1], 10),
    orientation
  }
}

function parseRobotInstructionsLine(line: string): Instruction[] {
  if (!/^(L|R|F)+$/.test(line)) {
    throw new Error(`Invalid instruction format: "${line}"`)
  }

  return line.split('').map(letter => ({
    L: Instruction.MOVE_LEFT,
    R: Instruction.MOVE_RIGHT,
    F: Instruction.MOVE_FORWARD
  }[letter as 'L' | 'R' | 'F']))
}
