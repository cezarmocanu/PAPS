import React,{useState,useEffect,useRef} from 'react';
import {OutsideClick} from '../OutsideClick';
const Select = (props) => {

    
    const wrapperRef = useRef(null);
    const {onChange,options} = props;
    const defaultOption = {name:"Selectati o valoare",value:"novalue"};
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [open, setOpen] = useState(false);
    OutsideClick(wrapperRef,open,()=>setOpen(false));

    useEffect(() => {
        onChange(selectedOption);
    }, [selectedOption]);

    const optionList = options.map(o => <li key={o.name} onClick={()=>{setSelectedOption(o)}}>{o.name}</li>)

    return <div 
            ref={wrapperRef}
            onClick={()=>setOpen(!open)} 
            className={`custom-select ${open?'open':""} ${selectedOption.value!=="novalue"?"valid":""}`}>
            <div className={`selected`}>
                <span>{selectedOption.name}</span>
            </div>
            <ul>
                <li onClick={()=>{setSelectedOption(defaultOption)}}>{defaultOption.name}</li>
                {optionList}
            </ul>
           </div>
}

/**
 <Select 
onChange={o=>setSelectedOption(o)}
options={selectOptions}/>
*/

export default Select;