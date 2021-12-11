import React, {useState, useEffect} from 'react'
import Filter from './Filter'
import Country from './Country'
import Search from './Search'
import Details from './Details'
import axios from 'axios'

const Main = (props) => {
 const {mode} = props;
 const [countries, setCountries] = useState([]);
 const [regCountries, setCountriesByRegion] = useState([]);
 const [nmCountries, setCountriesByName] = useState([]);
 const [detail, setDetails] = useState({});
 const [detailsShown, showDetails] = useState(false)

 useEffect(()=>{
  axios.get('https://restcountries.com/v3.1/all')
  .then(resp =>{
    setCountriesByName(resp.data)
    setCountriesByRegion(resp.data)
  })
 }, []);

useEffect(()=>{
  setCountries(getMatch(nmCountries, regCountries))
}, [nmCountries, regCountries])

const getMatch = (arr1, arr2) =>{
  const matchArr = [];
  for(let i in arr1){
    for(let j in arr2){
      if(JSON.stringify(arr1[i]) === JSON.stringify(arr2[j])){
        matchArr.push(arr1[i]);
      }
    }
  }
  return matchArr;
}
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
