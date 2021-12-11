import React, {useState} from 'react'
import Header from './Components/Header'
import Main from './Components/Main'

const App = () => {
  const [mode, setMode] = useState("light");
  const changeMode = () =>{
    setMode(mode === "light"? "dark" : "light")
  }
  return (
    <div>
      <Header mode={mode} changeMode={changeMode}/>
      <Main mode={mode}/>
    </div>
  )
}

export default App
