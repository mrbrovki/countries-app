import React, {useState} from 'react'

const Filter = (props) => {
 const [region, setRegion] = useState('Filter by Region');
 const [visibility, setVisibility] = useState('hidden');

 const setValue = (value) =>{
  props.setValue(value);
  if(value){
    setRegion(value);
  }else{
    setRegion('All Regions')
  }
 }

 return (
  <div className='filter' onMouseOver={()=>setVisibility('shown')} onMouseOut={()=>setVisibility('hidden')}>
    <div className={`region-${props.mode} region`}>{region}
    <i className='fas fa-angle-down'></i>
   </div>
   
    <div className={
      "regions-"+ props.mode + ' '+ visibility +' regions'}>
      <div onClick={() => setValue('')}>All Regions</div>
      <div onClick={() => setValue('africa')}>Africa</div>
      <div onClick={() => setValue('americas')}>America</div>
      <div onClick={() => setValue('asia')}>Asia</div>
      <div onClick={() => setValue('europe')}>Europe</div>
      <div onClick={() => setValue('oceania')}>Oceania</div>
    </div>
  </div>
 )
}

export default Filter
