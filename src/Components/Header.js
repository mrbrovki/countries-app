import React, { useContext } from 'react'
import { Context } from '../App';

const Header = () => {
  const {mode, setMode} = useContext(Context); 
 return (
  <header className={"header-" + mode}>
   <h1>Where in the world?</h1>
   <div onClick={() => setMode(prev => prev === 'light'? 'dark' : 'light')}>
    <img src="./assets/moon-regular.svg" width="12px"/>
    <span>
      change mode
    </span>
  </div>
  </header>
 )
}

export default Header
