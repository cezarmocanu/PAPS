import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {initBreadcrumb,clearBreadcrumb} from '../Actions';
import {useHistory} from 'react-router-dom';
import {FaAngleDoubleRight,FaGripLinesVertical,FaAngleDoubleLeft} from 'react-icons/fa';

const Breadcrumbs = (props)=>{

    const {breadcrumbPath} = props;
    const history = useHistory();
    useEffect(() => {
        const arr = window.location.href.split('/'); 
        const length = arr.length;
        if(arr[length-1] === '')
            console.log('Nu se face fetch');
        else
            props.dispatch(initBreadcrumb(arr[length-2],arr[length-1]));
    }, [])


    const breadcrumb = breadcrumbPath.map(crumb => <div
                                                    className="crumb"
                                                    onClick={()=>{
                                                        props.dispatch(clearBreadcrumb(crumb));
                                                        history.push(crumb.url)}}
                                                    >
                                                        <div className="crumb-text">
                                                            {crumb.name}
                                                            <hr></hr>
                                                        </div>
                                                        <div className="arrow">
                                                            <FaAngleDoubleRight/>
                                                        </div>
                                                    </div>)

    const lastBreadcrumb = breadcrumbPath.length > 1 ? breadcrumbPath[breadcrumbPath.length - 2] : null;
    
    return <div className="breadcrumb">
            {lastBreadcrumb && 
            <div
            className="back"
            onClick={()=>{
                props.dispatch(clearBreadcrumb(lastBreadcrumb));
                history.push(lastBreadcrumb.url)}}
            >
                <div className="arrow">
                    <FaAngleDoubleLeft/>
                </div>
                <div className="crumb-text">
                    Inapoi
                    <hr></hr>
                </div>
            </div>}
            {lastBreadcrumb && 
            <div className="pause">
                <FaGripLinesVertical/>
            </div>
            }
            {lastBreadcrumb && breadcrumb}
          </div>
};

const mapStateToProps = (state)=>({
    breadcrumbPath:state.breadcrumbPath,
    breadcrumbsInitialized:state.breadcrumbsInitialized
})

export default connect(mapStateToProps)(Breadcrumbs);