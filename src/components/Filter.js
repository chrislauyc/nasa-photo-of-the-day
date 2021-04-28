import React,{useState} from 'react';
export default function Filter(props){
    const {max, min} = props;
    const [value, setValue] = useState(50);

    const handleChange = (e) =>{
        setValue(e.target.value);
    };
    return(
        <input type='range' min={min} max={max} value={value} className='slider' onChange={handleChange}></input>
    );
}