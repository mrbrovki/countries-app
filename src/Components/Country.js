import React from 'react'

const Country = (props) => {
 const {flags:{png}, name: {official}, population, region, capital} = props.data;

 return (
  <div className='country' id={official} onClick={(e) => props.handleClick(e)}>
   <img src={png} width='100%' height='50%' alt='country' id={official}></img>
   <h4 id={official}>{official}</h4>
   <p id={official}>Population: {population}</p>
   <p id={official}>Region: {region}</p>
   <p id={official}>Capital: {[capital]}</p>
  </div>
 )
}

export default Country
