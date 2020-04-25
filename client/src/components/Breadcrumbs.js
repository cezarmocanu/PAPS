import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearPage} from '../Actions';


const Breadcrumbs = (props)=>{

    
    const {breadcrumbs} = props;
    
    const path = breadcrumbs
                 .map((crumb,index)=>
                 index < breadcrumbs.length-1?
                 <Link 
                 onClick={()=>props.dispatch(clearPage(crumb.name))}
                 key={crumb.name} 
                 to={crumb.path}>
                 {crumb.name}/
                 </Link>
                 :
                 <span key={crumb.name} >
                {crumb.name}
                 </span>)
    
    const backcrumb = breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length-2] : null;
    
    return backcrumb && 
            <div>    
                <Link
                onClick={()=>props.dispatch(clearPage(backcrumb.name))}
                to={backcrumb.path}    
                >
                Inapoi   
                </Link>
                {path}
            </div>
};

const mapStateToProps = (state)=>{
    return{breadcrumbs:state.breadcrumbs}
}

export default connect(mapStateToProps)(Breadcrumbs);