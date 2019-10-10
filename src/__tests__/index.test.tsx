import React from 'react'
import ReactDOM from 'react-dom'
import { App } from '../components/App'

describe('Rendering', () => {
  it('Should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<App />, div)
  })
})
