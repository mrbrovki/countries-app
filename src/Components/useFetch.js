import {useState, useEffect}  from 'react'


export const useFetch = (url) => {
 const [status, setStatus] = useState('');
 // if(!url)return;
 const [data, setData] = useState(null);
 
 useEffect(async() => {
  setStatus('fetching');
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  setData(data);
  setStatus('fetched');
 }, [url]);
 return {status, data};
};