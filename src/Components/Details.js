import React from 'react'

const Details = (props) => {
let {name: {official, nativeName}, flags: {svg},
population, region, subregion, capital, tld, currencies,
languages} = props;
let langs = '';
nativeName = Object.values(nativeName)[0]['official'];
currencies = Object.values(currencies)[0]['name'];
Object.values(languages).forEach((el) => langs += el + ' ');
 return (
  <div className='detail'>
   <div className='detail-left'>
   <img src={svg} alt='img' height='350px' width='600px'></img>
   </div>
   <div className='detail-right'>
    <h1>{official}</h1>
    <p>Native Name: <span>{nativeName}</span></p>
    <p>Population: <span>{population}</span></p>
    <p>Region: <span>{region}</span></p>
    <p>Sub Region: <span>{subregion}</span></p>
    <p>Capital: <span>{capital}</span></p>
    <p>Top Level Domain: <span>{tld}</span></p>
    <p>Currencies: <span>{currencies}</span></p>
    <p>Languages: <span>{langs}</span></p>
   </div>
  </div>
 )
}

export default Details
