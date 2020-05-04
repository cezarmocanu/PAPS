import React,{useState} from 'react';
import {connect} from 'react-redux';
import './../App.scss';
import {toggleLateralPanel} from '../Actions';
import {FaSearch} from 'react-icons/fa';
import Select from './Select';

const Header = (props) => {
    
    
    


    return (<nav className={`header`}>
               <div className="logo">
                    <div className="content">
                        <span className="capital">A</span>
                        <span>GRO</span>
                        <span className="capital">B</span>
                        <span>RAZDARE</span>
                    </div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Cautati un produs..."/>
                    <div className="search-button">
                        <FaSearch className="icon"/>
                    </div>
                </div>
                
               <button onClick={()=>props.dispatch(toggleLateralPanel(true))}className="md-down-show">CATEGORII</button>
            </nav>)
}

const mapStateToProps = (state)=>({
   
})

export default connect(mapStateToProps)(Header);
