import React from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';

const Products = (props)=>{

    const {categoryName} = useParams();
    return (<div>
              Produse din subbcategoria {categoryName}
            </div>)
};

const mapStateToProps = (state) =>({})

export default connect(mapStateToProps)(Products);