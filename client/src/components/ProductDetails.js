import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams,useHistory} from 'react-router-dom';
import {fetchProductDetails,fetchClientImage} from '../Actions';

const ProductDetails = (props)=>{

    const {productId} = useParams();
    const {productDetails,notifications,pageReload,imagesHashMap} = props;
    
    useEffect(() => {
      props.dispatch(fetchProductDetails(productId));
      window.scrollTo(0,0);
    },[pageReload]);

    useEffect(() => {
      if(productDetails)
        productDetails.gallery.map(g => props.dispatch(fetchClientImage(g.imageId)))
    }, [notifications])

    const images = productDetails && productDetails.gallery.map(g => <img src={imagesHashMap[g.imageId]} width="100" height="100"/>)
  
    return <div>
              {productDetails && 
                <div>
                  {images}                  
                  <h1>{productDetails.product.name}</h1>
                  <h3>{productDetails.product.code}</h3>
                  
                  {productDetails.product.hasPrice  && <h4>Pret:{productDetails.product.price}/{productDetails.product.unit}</h4>}
                  
                </div>}
          </div>
};

const mapStateToProps = (state) =>({  
  productDetails:state.productDetails,
  notifications:state.notifications,
  pageReload:state.pageReload,
  imagesHashMap:state.imagesHashMap
})

export default connect(mapStateToProps)(ProductDetails);