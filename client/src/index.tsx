import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import Home from 'pages/Home'

import reportWebVitals from 'reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('app')
)

reportWebVitals()
