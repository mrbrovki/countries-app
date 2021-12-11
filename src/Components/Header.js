import React from 'react'

const Header = (props) => {
 const moon = props.mode === 'light' ? 'far' : 'fas';
 return (
  <header className={"header-" + props.mode}>
   <h1>Where in the world?</h1>
   <div onClick={() => props.changeMode()}>
    <i className = { moon + ' fa-moon'} style={{paddingRight: '5px'}}></i>
    change mode</div>
  </header>
 )
}

export default Header
