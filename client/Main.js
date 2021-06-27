import React from 'react'
import { hydrate } from 'react-dom'
import App from './App'
import './assets/styles/index.css'
import { Provider } from 'react-redux'



hydrate(<App/>, document.getElementById('root'))