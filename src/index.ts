import { execute } from './execute'
import { InputModel } from './models'
import { outputToString } from './outputToString'
import { parse } from './parse'
import { drawUI } from './ui'

const ui = drawUI()

ui.onKeyUp(() => {
  // Get plain text input
  const input = ui.getInputBoxValue()

  if (input.trim() === '') {
    ui.setOutputBoxValue('Output')
    return
  }

  // Try to parse the input into an InputModel object
  let inputModel: InputModel
  try {
    inputModel = parse(input)
  } catch (e) {
    // Output the error if there was an issue parsing
    ui.setOutputBoxValue(e.toString())
    return
  }

  // If there were no issues parsing, execute the InputModel and display the result
  const outputModel = execute(inputModel)
  const outputString = outputToString(outputModel)
  ui.setOutputBoxValue(outputString)
})
