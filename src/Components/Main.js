import React, {useState, useEffect, useContext, useReducer} from 'react'
import Filter from './Filter'
import Country from './Country'
import Search from './Search'
import Details from './Details'
import axios from 'axios'
import { useFetch } from './useFetch'
import { Context } from '../App'

const Main = () => {
 const {mode} = useContext(Context);
 const [countries, setCountries] = useState([]);
 const [initCountries, setInitCountries] = useState([]);
 const [regCountries, setCountriesByRegion] = useState([]);
 const [nmCountries, setCountriesByName] = useState([]);
 const [detail, setDetails] = useState({});
 const [detailsShown, showDetails] = useState(false)

const {status, data} = useFetch('https://restcountries.com/v3.1/all');
useEffect(()=>{
  if(status === 'fetched'){
    setInitCountries(data);
    setCountries(data);
  }
},[status]);

  const getMatch = (arr1, arr2) =>{
    const arr1Len = arr1.length;
    const arr2Len = arr2.length;
    let matchedArr = [];
    if(!arr1Len && !arr2Len){
        return initCountries;
    }
    else if(arr1Len === 0){
        return arr2;
    }
    else if(arr2Len === 0){
        return arr1;
    }
    
    for(let i = 0; i < arr1Len; i++){
      for(let j = 0 ; j < arr2Len; j++){
        if(arr1[i].name.official === arr2[j].name.official){
          matchedArr.push(arr1[i]);
          break;
        }
      }
    }
    return matchedArr;
  }
  
 const changeRegion = async (value) =>{
  if(value){
   const resp = await axios.get('https://restcountries.com/v3.1/region/' + value);
   setCountriesByRegion(resp.data);
   setCountries(getMatch(nmCountries, resp.data));
  }else{
    setCountriesByRegion([]);
    setCountries(getMatch(nmCountries, []));
 }
}
const changeName = async (value) =>{
  if(value){
   const resp = await axios.get('https://restcountries.com/v3.1/name/' + value);
    setCountriesByName(resp.data);
    setCountries(getMatch(resp.data, regCountries));
  }else{
    setCountriesByName([]);
    setCountries(getMatch([], regCountries));
 }
}
const displayDetails = async (value) =>{
  const resp = await axios.get('https://restcountries.com/v3.1/name/' + value);
  const [data] = resp.data;
  setDetails(data);
  showDetails(true)
}

 return (
  <>
    {!detailsShown && 
    <main className={"main-" + mode}>
      <div className='flex-container'>
      <Search mode={mode} setName={(value) => changeName(value)}/>
      <Filter mode={mode} setValue={(value) => changeRegion(value)} />
      </div>
      <div className={`grid-container ${"countries-" + mode}`}>
      {countries.map((el,id) => 
      <Country key={id} data={el} handleClick={(e) => displayDetails(e.target.id)}/>)}
      </div>
    </main>
    }
    { detailsShown && <main className={'main-' + mode}>
      <button onClick={() => {showDetails(false); changeName(''); changeRegion('')}} className={'back-button-'+ mode}>
        <i className="fas fa-arrow-left" style={{paddingRight: '0.4rem'}}></i>
          Back</button>
       <div className='flex-container'>
         <Details {...detail} />
      </div>
    </main>}
   
 </>
 )
}

export default Main
