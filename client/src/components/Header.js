import React from 'react';
import {connect} from 'react-redux';
import './../App.scss';
import {toggleLateralPanel} from '../Actions';

const Header = (props) => {
    

    return (<nav className={`header`}>
               <button onClick={()=>props.dispatch(toggleLateralPanel(true))}className="md-down-show">CATEGORII</button>
            </nav>)
}

const mapStateToProps = (state)=>({
   
})

export default connect(mapStateToProps)(Header);
