import React,{useRef,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../App.scss';
import {connect} from 'react-redux';
import { fetchSubcategories, fetchClientImage } from '../Actions';
//import { useHistory } from 'react-router-dom';

const Subcategories = (props)=>{
    //const {lateralPanelToggled,categories} = props;
    const {categoryId} = useParams();
    const {subcategories,imagesHashMap} = props;
    //mount
    useEffect(() => {
        props.dispatch(fetchSubcategories(categoryId));
    }, []);
    
    useEffect(() => {
        subcategories.map(sc => props.dispatch(fetchClientImage(sc.imageId)))
        props.dispatch(fetchSubcategories(categoryId));
    }, [subcategories]);

    const subcategoriesList = subcategories.map((sc,index) => {
        
        return (<div key={index} className="item">
                    <div className="image">
                        <img src={imagesHashMap[sc.imageId]}/>
                    </div>
                    <div className="name">
                        <h4 className="name-text">{sc.name}</h4>
                    </div>
                    {sc.name}
                </div>)
    })
    return (<div className="category-list">
                {subcategoriesList}
            </div>)
};

const mapStateToProps = (state)=>({
    subcategories:state.subcategories,
    imagesHashMap:state.imagesHashMap
})
 
export default connect(mapStateToProps)(Subcategories);
