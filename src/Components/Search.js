import React from 'react'

const Search = (props) => {
 const changeName = (e) =>{
   e.preventDefault();
   props.setName(e.target.value)
 }
 const submitName = (e) =>{
  e.preventDefault();
 }
 
 return (
  <form className={`search search-${props.mode}`} onSubmit={(e) => submitName(e)}>
    <label htmlFor='country-name'>
      <img src='./assets/search-icon.svg' width='24px' height="24px"/>
    </label>
   <input 
   id ='country-name'
   name='country-name'
   placeholder='Search for a country...'
   value={props.name}
   onChange={(e) => changeName(e)}
   />
  </form>
 )
}

export default Search
