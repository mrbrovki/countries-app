import React, {useState, useEffect, useContext} from 'react'
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
 const [regCountries, setCountriesByRegion] = useState([]);
 const [nmCountries, setCountriesByName] = useState([]);
 const [detail, setDetails] = useState({});
 const [detailsShown, showDetails] = useState(false)


const {status, data} = useFetch('https://restcountries.com/v3.1/all');
useEffect(()=>{
  if(status === 'fetched'){
    setCountries(data);
    setCountriesByName(data);
    setCountriesByRegion(data);
  }
},[status]);

// useEffect(()=>{
//   setCountries(getMatch(nmCountries, regCountries))
// }, [nmCountries, regCountries])


 const changeRegion = async (value) =>{
  if(value){
   const resp = await axios.get('https://restcountries.com/v3.1/region/' + value);
   setCountriesByRegion(resp.data)
  }else{
   const resp = await axios.get('https://restcountries.com/v3.1/all');
   setCountriesByRegion(resp.data)
 }
}
const changeName = async (value) =>{
  if(value){
   const resp = await axios.get('https://restcountries.com/v3.1/name/' + value);
    setCountriesByName(resp.data);
  }else{
   const resp = await axios.get('https://restcountries.com/v3.1/all');
    setCountriesByName(resp.data);
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
