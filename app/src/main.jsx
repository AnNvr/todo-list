import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { nanoid } from "nanoid"
import './index.css'

/* const DATA = [
  { id: nanoid(), name: "Eat", isCompleted: false },
  { id: nanoid(), name: "Sleep", isCompleted: false },
  { id: nanoid(), name: "Repeat", isCompleted: false },
];
 */


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
{/*     <App tasks={DATA}/> */}
  <App/>
  </React.StrictMode>,
)
