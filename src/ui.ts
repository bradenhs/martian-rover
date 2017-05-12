import { style, types } from 'typestyle'

/**
 * Generates the user interface. Returns an object with methods for interacting with
 * the user interface.
 */
export function drawUI() {
  const inputBox = createInputBox()
  const outputBox = createOutputBox()

  document.body.appendChild(inputBox)
  document.body.appendChild(outputBox)

  return {
    /**
     * Returns the current value of the input box
     */
    getInputBoxValue() {
      return inputBox.value
    },

    /**
     * Sets the value of the output box to the given value
     * @param value the value to set the output box to
     */
    setOutputBoxValue(value: string) {
      outputBox.innerText = value
    },

    /**
     * Attaches a function to be run everytime a keyup event is triggered on the input box
     * @param fn the function to be executed on keyup
     */
    onKeyUp(fn: () => void) {
      inputBox.addEventListener('keyup', fn)
    }
  }
}

// Define base style for ui boxes
const baseBoxStyle: types.NestedCSSProperties = {
  position: 'absolute',
  top: '20px',
  bottom: '20px',
  width: 'calc(50% - 30px)',
  border: '1px solid #ccc',
  fontFamily: 'monospace',
  fontSize: '16px',
  boxSizing: 'border-box',
  padding: '20px',
}

/**
 * Creates and returns the input box
 */
function createInputBox() {
  const element = document.createElement('textarea')
  element.className = style({
    ...baseBoxStyle,
    left: '20px',
    resize: 'none',
    outline: 'none',
  })
  element.placeholder = 'Input'
  return element
}

/**
 * Creates and returns the output box
 */
function createOutputBox() {
  const element = document.createElement('div')
  element.className = style({
    ...baseBoxStyle,
    right: '20px',
  })
  element.innerText = 'Output'
  return element
}
