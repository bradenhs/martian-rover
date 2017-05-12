import { Orientation, OutputModel } from '../src/models'
import { outputToString } from '../src/outputToString'

describe('outputToString', () => {
  it('should convert correctly', () => {
    const outputModel: OutputModel = {
      robots: [
        { position: { x: 0, y: 1, orientation: Orientation.NORTH }, lost: false },
        { position: { x: 4, y: 2, orientation: Orientation.SOUTH }, lost: true },
        { position: { x: 1, y: 3, orientation: Orientation.EAST }, lost: false },
        { position: { x: 5, y: 3, orientation: Orientation.WEST }, lost: true },
      ]
    }

    const actual = outputToString(outputModel)
    const expected =
`0 1 N
4 2 S LOST
1 3 E
5 3 W LOST`

    expect(actual).toBe(expected)
  })
})
