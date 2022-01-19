import React, {useState, createContext} from 'react'
import Header from './Components/Header'
import Main from './Components/Main'

export const Context = createContext();
const App = () => {
  const [mode, setMode] = useState("light");
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("all");
  return (
    <Context.Provider value={{searchName, setSearchName, filter, setFilter, mode, setMode}} >
      <Header/>
      <Main/>
    </Context.Provider>
  )
}

export default App
