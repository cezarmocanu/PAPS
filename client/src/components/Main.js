import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import Subcategories from './Subcategories';
import Home from './Home';
import Auth from './Auth';

const Main = ()=>{
    return (<div>
                <Breadcrumbs/>
                <Switch>
                    <Route exact path="/" children={<Home/>}/>
                    <Route path="/:categoryName/:categoryId/c" children={<Subcategories/>}/>
                    <Route path="/admin" children={<Auth/>}/>
                </Switch>
            </div>)
};
export default Main;