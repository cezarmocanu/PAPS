import React,{useRef,useEffect} from 'react';
import '../App.scss';
import {connect} from 'react-redux';
import {toggleLateralPanel,fetchCategories,addPage} from '../Actions';
import {OutsideClick} from '../OutsideClick';
import { useHistory } from 'react-router-dom';

const LateralPanel = (props)=>{
    const {lateralPanelToggled,categories} = props;
    const wrapperRef = useRef(null);
    OutsideClick(wrapperRef,lateralPanelToggled,()=>props.dispatch(toggleLateralPanel(false)));
    //mount
    useEffect(() => {
        props.dispatch(fetchCategories())
    }, []);
    const history = useHistory();
    const categoriesList = categories.map(c =>  <div 
                                                className="list-item"
                                                onClick={()=>{
                                                    props.dispatch(addPage(c.name,`/${c.name.toLowerCase()}/${c.id}/c`))
                                                    props.dispatch(()=>history.push(`/${c.name.toLowerCase()}/${c.id}/c`))
                                                }} 
                                                key={c.name}>
                                                    {c.name}    
                                                </div>)
    return (<div 
            ref={wrapperRef}
            className={`lateral-panel ${lateralPanelToggled?'open':'closed'}`}>
                {categoriesList}
            </div>)
};

const mapStateToProps = (state)=>({
    lateralPanelToggled:state.lateralPanelToggled,
    categories:state.categories
})
 
export default connect(mapStateToProps)(LateralPanel);
