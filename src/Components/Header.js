import React, { useContext } from 'react'
import { Context } from '../App';

const Header = () => {
  const {mode, setMode} = useContext(Context); 
 const moon = mode === 'light' ? 'far' : 'fas';
 return (
  <header className={"header-" + mode}>
   <h1>Where in the world?</h1>
   <div onClick={() => setMode(prev => prev === 'light'? 'dark' : 'light')}>
    <i className = { moon + ' fa-moon'} style={{paddingRight: '5px'}}></i>
    change mode</div>
  </header>
 )
}

export default Header
