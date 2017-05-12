import { InputModel, Instruction, Orientation, OutputModel, Position, Robot } from './models'

/**
 * Executes the given InputModel and returns an OutputModel
 * @param inputModel the InputModel to execute
 */
export function execute(inputModel: InputModel): OutputModel {
  const lostSquares: boolean[] = []

  const robots = inputModel.instructionSets.map(set => {
    const robot: Robot = {
      position: { ...set.startingPosition },
      lost: false
    }

    for (const instruction of set.instructions) {
      const newPosition = getNewPosition(robot.position, instruction)

      if (isLostSquare(newPosition.x, newPosition.y)) {
        continue
      }

      if (isOutOfBounds(newPosition.x, newPosition.y)) {
        robot.lost = true
        markAsLostSquare(newPosition.x, newPosition.y)
        break
      }

      robot.position = newPosition
    }

    return robot
  })

  return { robots }

  function isLostSquare(x: number, y: number) {
    return lostSquares[x * inputModel.gridHeight + y] != null
  }

  function markAsLostSquare(x: number, y: number) {
    lostSquares[x * inputModel.gridHeight + y] = true
  }

  function isOutOfBounds(x: number, y: number) {
    return x < 0 || x > inputModel.gridWidth || y < 0 || y > inputModel.gridHeight
  }
}

const moveMap = {
  [Orientation.NORTH]: {
    [Instruction.MOVE_FORWARD]: { deltaX: 0, deltaY: 1, orientation: Orientation.NORTH },
    [Instruction.MOVE_LEFT]: { deltaX: 0, deltaY: 0, orientation: Orientation.WEST },
    [Instruction.MOVE_RIGHT]: { deltaX: 0, deltaY: 0, orientation: Orientation.EAST },
  },
  [Orientation.WEST]: {
    [Instruction.MOVE_FORWARD]: { deltaX: -1, deltaY: 0, orientation: Orientation.WEST },
    [Instruction.MOVE_LEFT]: { deltaX: 0, deltaY: 0, orientation: Orientation.SOUTH },
    [Instruction.MOVE_RIGHT]: { deltaX: 0, deltaY: 0, orientation: Orientation.NORTH },
  },
  [Orientation.SOUTH]: {
    [Instruction.MOVE_FORWARD]: { deltaX: 0, deltaY: -1, orientation: Orientation.SOUTH },
    [Instruction.MOVE_LEFT]: { deltaX: 0, deltaY: 0, orientation: Orientation.EAST },
    [Instruction.MOVE_RIGHT]: { deltaX: 0, deltaY: 0, orientation: Orientation.WEST },
  },
  [Orientation.EAST]: {
    [Instruction.MOVE_FORWARD]: { deltaX: 1, deltaY: 0, orientation: Orientation.EAST },
    [Instruction.MOVE_LEFT]: { deltaX: 0, deltaY: 0, orientation: Orientation.NORTH },
    [Instruction.MOVE_RIGHT]: { deltaX: 0, deltaY: 0, orientation: Orientation.SOUTH },
  },
}

function getNewPosition(position: Position, instruction: Instruction) {
  const { deltaX, deltaY, orientation } = moveMap[position.orientation][instruction]
  return { x: position.x + deltaX, y: position.y + deltaY, orientation }
}
