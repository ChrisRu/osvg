import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { App } from './components/App'
import * as serviceWorker from './services/serviceWorker'

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
    font-family: 'Rubik', sans-serif;
    background: #212123;
  }

  #root {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
  }
`

ReactDOM.render(
  <>
    <Normalize />
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('root'),
)

serviceWorker.register()
