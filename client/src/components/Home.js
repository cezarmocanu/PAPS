import React from 'react';
import {addPage} from '../Actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Home = (props)=>{

    return (<div>
              <Link onClick={()=>props.dispatch(addPage('Categorii','/categories'))} to="/categories">Mergi la categorii</Link>
            </div>)
};

const mapStateToProps = (state) =>({})

export default connect(mapStateToProps)(Home);