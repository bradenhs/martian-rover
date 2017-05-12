export enum Orientation {
  NORTH, SOUTH, EAST, WEST
}

export enum Instruction {
  MOVE_LEFT, MOVE_RIGHT, MOVE_FORWARD
}

export interface InputModel {
  gridWidth: number
  gridHeight: number
  instructionSets: InstructionSet[]
}

export interface OutputModel {
  robots: Robot[]
}

export interface InstructionSet {
  startingPosition: Position
  instructions: Instruction[]
}

export interface Robot {
  position: Position
  lost: boolean
}

export interface Position {
  x: number
  y: number
  orientation: Orientation
}
