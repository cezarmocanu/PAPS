import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams,useHistory} from 'react-router-dom';
import {fetchProducts,fetchClientImage,changePage,initBreadcrumb,REDUX_ACTIONS} from '../Actions';
import {FaPencilAlt} from 'react-icons/fa';

const Products = (props)=>{

    const {categoryName,categoryId} = useParams();
    const {products,pageReload,notifications,imagesHashMap,role} = props;
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
      //console.log(role)
    }, [notifications]);

  const list = products.map(pi =>{
    const {product,gallery} = pi;
    const urlName = product.name.trim().replace(' ','-').toLowerCase();
    return (<div 
              key={product.id} 
              className="product-item">
              <div
              className="product-content"
              onClick={()=>{
                history.push(`/${urlName}/${product.id}/p`)
                props.dispatch(initBreadcrumb(product.id,'p'));
              }}
              >
                <div className="image">
                  <img src={imagesHashMap[gallery[0].imageId]}/>
                </div>
                <div className="details">
                    <hr/>
                    <h3 className="name-text">{product.name}</h3>
                    <h4 className="code-text">{product.code}</h4>
                    {!product.hasPrice &&
                    <div className="price">
                            <h4 className="price-text">Pret La Solicitare</h4>
                    </div>}
                    {product.hasPrice &&
                        <div className="price">
                            <h4 className="price-text">{product.price} lei</h4>
                            <h4 className="unit-text"> / {product.unit}</h4>
                        </div>
                    }
                </div>
              </div>
              {role ==='admin' &&
              <div
              className="edit-button"
              onClick={()=>props.dispatch(REDUX_ACTIONS.editProductStart(pi))}>
                <FaPencilAlt/>
              </div>}
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
  role:state.role
})

export default connect(mapStateToProps)(Products);