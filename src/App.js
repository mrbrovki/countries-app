import React, {useState, createContext} from 'react'
import Header from './Components/Header'
import Main from './Components/Main'

export const Context = createContext();
const App = () => {
  const [mode, setMode] = useState("light");
  return (
    <Context.Provider value={{mode, setMode}} >
      <Header/>
      <Main/>
    </Context.Provider>
  )
}

export default App
