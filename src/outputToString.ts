import { Orientation, OutputModel } from './models'

/**
 * Converts the given OutputModel into a string
 * @param outputModel the OutputModel to convert
 */
export function outputToString(outputModel: OutputModel) {
  return outputModel.robots.map(robot => {
    const { x, y, orientation } = robot.position
    return `${x} ${y} ${orientationToString(orientation)}${robot.lost ? ' LOST' : ''}`
  }).join('\n')
}

function orientationToString(orientation: Orientation) {
  return {
    [Orientation.NORTH]: 'N',
    [Orientation.WEST]: 'W',
    [Orientation.SOUTH]: 'S',
    [Orientation.EAST]: 'E'
  }[orientation]
}
