import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams,useHistory} from 'react-router-dom';
import {fetchProducts,fetchClientImage,changePage,initBreadcrumb} from '../Actions';

const Products = (props)=>{

    const {categoryName,categoryId} = useParams();
    const {products,pageReload,notifications,imagesHashMap} = props;
    const history = useHistory();
    
    useEffect(() => {
      props.dispatch(fetchProducts(categoryId));
      window.scrollTo(0,0);
    },[pageReload]);

    useEffect(() => {
      products.map(pi => {
        if(imagesHashMap[pi.gallery[0].imageId] === undefined)
          props.dispatch(fetchClientImage(pi.gallery[0].imageId));
      })
    }, [notifications]);

  const list = products.map(pi =>{
    const {product,gallery} = pi;
    const urlName = product.name.trim().replace(' ','-').toLowerCase();
    return (<div 
              onClick={()=>{
                history.push(`/${urlName}/${product.id}/p`)
                props.dispatch(initBreadcrumb(product.id,'p'));
              }}
              key={product.id} 
              className="product-item">    
              <div className="image">
                <img src={imagesHashMap[gallery[0].imageId]}/>
              </div>
              <div className="details">
                  <hr/>
                  <h3 className="name-text">{product.name}</h3>
                  <h4 className="code-text">{product.code}</h4>
                  {product.hasPrice &&
                      <div className="price">
                          <h4 className="price-text">{product.price} lei</h4>
                          <h4 className="unit-text"> / {product.unit}</h4>
                      </div>
                  }
              </div>
            </div>)    
  });

  return (<div className="product-list">
              {list}
            </div>)
};

const mapStateToProps = (state) =>({
  imagesHashMap:state.imagesHashMap,
  products:state.products,
  pageReload:state.pageReload,
  notifications:state.notifications,
 
})

export default connect(mapStateToProps)(Products);