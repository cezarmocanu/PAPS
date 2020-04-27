import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Subcategories from './Subcategories';
import Home from './Home';
import Auth from './Auth';
import Products from './Products';
import {useParams} from 'react-router-dom';

const C = ()=><div>X</div>;

const P = ()=>{
    //const {a,b} = useParams();

    return <div>XY</div>
}

/*

 */
const Main = ()=>{
    return (<div className="main-container">
                {<Breadcrumbs/>
                }
                <Switch>
                    <Route exact path="/" children={<Home/>}/>
                    <Route path="/:categoryName/:categoryId/c" children={<Subcategories/>}/>
                    <Route path="/:categoryName/:categoryId/sc" children={<Products/>}/>
                    <Route path="/:productName/:productId/p" children={<div>Pagina Produs</div>}/>
                    <Route path="/admin" children={<Auth/>}/>
                </Switch>
            </div>)
};
export default Main;