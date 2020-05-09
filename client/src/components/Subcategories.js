import React,{useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../App.scss';
import {connect} from 'react-redux';
import { initBreadcrumb,fetchSubcategories, fetchClientImage,changePage } from '../Actions';
import {useHistory} from 'react-router-dom';

const Subcategories = (props)=>{
    const {categoryId} = useParams();
    const {subcategories,imagesHashMap,notifications,pageReload} = props;
    const history = useHistory();
    
    //mount
    useEffect(() => {
        props.dispatch(fetchSubcategories(categoryId));
        window.scrollTo(0,0);
    }, [pageReload]);
    
    useEffect(() => {
        if(notifications[0] === "subcategories"){
            subcategories.map(sc => {
                if(imagesHashMap[sc.imageId] === undefined)
                    props.dispatch(fetchClientImage(sc.imageId))
            })
        }
    }, [notifications]);
/*
SELECT p.id AS zid,p.name AS zname,sc.id AS yid,sc.name AS yname FROM (SELECT * FROM products WHERE ID = 3) AS p,categories AS sc  WHERE sc.id = p.categoryId;
*/
    const subcategoriesList = subcategories.map((sc,index) => {
        const urlName = sc.name.trim().replace(' ','-').toLowerCase();
        return (<div key={index} 
                className="item"
                onClick={()=>{
                    history.push(`/${urlName}/${sc.id}/sc`);
                    props.dispatch(initBreadcrumb(sc.id,'sc'));
                    props.dispatch(changePage());
                    }}>
                    <div className="image">
                        <img src={imagesHashMap[sc.imageId]}/>
                    </div>
                    <hr/>
                    <div className="name">
                        <h3 className="name-text">{sc.name}</h3>
                    </div>
                </div>)
    })
    return (<div className="category-list">
                {subcategoriesList}
            </div>)
};

const mapStateToProps = (state)=>({
    subcategories:state.subcategories,
    imagesHashMap:state.imagesHashMap,
    notifications:state.notifications,
    pageReload:state.pageReload
})
 
export default connect(mapStateToProps)(Subcategories);
