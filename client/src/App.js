import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Header from './components/Header';
import AdminUI from './components/AdminUI';
import LateralPanel from './components/LateralPanel';
import Main from './components/Main';
import thunk from 'redux-thunk';
import './App.scss';
import {Helmet} from "react-helmet";
import './Actions';
import { //ADD_PAGE,
         //CLEAR_PAGE,
         TOGGLE_LATERAL_PANEL,
         //FETCH_CATEGORIES_BEGIN,
         FETCH_CATEGORIES_SUCCESS,
         FETCH_CATEGORIES_FAILURE,
         POST_LOGIN_BEGIN,
         POST_LOGIN_SUCCESS,
         POST_LOGIN_FAILURE, 
         //CHECK_ADMINS_BEGIN,
         CHECK_ADMINS_SUCCESS,
         CHECK_ADMINS_FAILURE,
         POST_SIGNUP_BEGIN,
         POST_SIGNUP_SUCCESS,
         POST_SIGNUP_FAILURE,
         ADD_IN_UPLOAD_QUEUE,
         REMOVE_FROM_UPLOAD_QUEUE,
         UPDATE_UPLOAD_QUEUE,
         CLEAR_UPLOAD_QUEUE,
         CHANGE_ADMIN_SUBMENU,
         CHANGE_ADMIN_MENU,
         POST_UPLOAD_QUEUE_SUCCESS,
         POST_UPLOAD_QUEUE_FAILURE,
         //FETCH_ALL_IMAGES_BEGIN,
         FETCH_ALL_IMAGES_SUCCESS,
         //FETCH_ALL_IMAGES_FAILURE,
         FETCH_IMAGE_SUCCESS,
         SELECT_CATEGORY_IMAGE_BEGIN,
         SELECT_CATEGORY_IMAGE_END,
         SELECT_CATEGORY_IMAGE_CHOOSE,
         POST_CATEGORY_SUCCESS,
         FETCH_SUBCATEGORIES_SUCCESS,
         FETCH_CLIENT_IMAGE_SUCCESS,
         CHANGE_PAGE,
         INIT_BREADCRUMB_SUCCESS,
         CLEAR_BREADCRUMB,
         SELECT_PRODUCT_IMAGE_BEGIN,
         SELECT_PRODUCT_IMAGE_CHOOSE,
         SELECT_PRODUCT_IMAGE_END,
         SELECT_PRODUCT_IMAGE_DESELECT,
         FETCH_ALL_SUBCATEGORIES_FAILURE,
         FETCH_ALL_SUBCATEGORIES_SUCCESS,
         REDUX_ACTIONS,REDUX_TYPES
        } from './Actions';
import Footer from './components/Footer';

const initialState = {
  lateralPanelToggled:false,
  breadcrumbPath:[{name:'Acasa',url:'/'}],
  breadcrumbsInitialized:false,
  categories:[],
  subcategories:[],
  allSubcategories:[],
  role:undefined,
  hasAdmins:undefined,
  signupSuccess:undefined,
  uploadQueueData:[],
  currentAdminSubmenu:0,
  currentAdminMenu:undefined,
  galleryImages:[],
  galleryShouldReload:false,
  notifications:[],
  selectCategoryImage:false,
  newCategoryImage:undefined,
  imagesHashMap:{},
  pageReload:[],
  selectProductImages:false,
  selectedProductImageIds:[],
  productPreviewImages:[],
  products:[],
  productDetails:undefined
  
}

function reducer(state=initialState,action){

  //action payload e continutul unui action
  switch(action.type){
    case TOGGLE_LATERAL_PANEL:
      return{
        ...state,
        lateralPanelToggled:action.payload
      }
    case FETCH_CATEGORIES_SUCCESS:
      return{
        ...state,
        categories:action.payload
      }
    case FETCH_CATEGORIES_FAILURE:
      return{
        ...state,
        categories:[]
      }
    case POST_LOGIN_BEGIN:
      return{
        ...state,
        role:action.payload
      }
    case POST_LOGIN_SUCCESS:
      return{
        ...state,
        role:action.payload.role
      }
    case POST_LOGIN_FAILURE:
      return{
        ...state,
        role:action.payload.role
      }
    case POST_SIGNUP_BEGIN:
      return{
        ...state
      }
    case POST_SIGNUP_SUCCESS:
      return{
        ...state,
        signupSuccess:true
      }
    case POST_SIGNUP_FAILURE:
      return{
        ...state,
        signupSuccess:false
      }
    case CHECK_ADMINS_SUCCESS:
      console.log(action.payload)
      return{
        ...state,
        hasAdmins:action.payload
    }
    case CHECK_ADMINS_FAILURE:
      return{
        ...state,
        hasAdmins:false
    }
    case ADD_IN_UPLOAD_QUEUE:
      return{
        ...state,
        uploadQueueData:[...state.uploadQueueData,action.payload]
      }
    case REMOVE_FROM_UPLOAD_QUEUE:
      state.uploadQueueData.splice(state.uploadQueueData.findIndex(data => data.name === action.payload),1);
      return{
        ...state,
        uploadQueueData:[...state.uploadQueueData]
      }
    case UPDATE_UPLOAD_QUEUE:
      //de rescris mai frumos
      const updateItemIndex = state.uploadQueueData.findIndex(d => d.name === action.payload.itemName)
      state.uploadQueueData[updateItemIndex].name = action.payload.newValue;
      return{
        ...state,
        uploadQueueData:[...state.uploadQueueData]
      }
    case CLEAR_UPLOAD_QUEUE:
      return{
        ...state,
        uploadQueueData:[]
      }
    case POST_UPLOAD_QUEUE_SUCCESS:
      return{
        ...state,
        galleryShouldReload:true
      }
    case POST_UPLOAD_QUEUE_FAILURE:
      console.log(action.payload);
      return{
        ...state
      }
    case CHANGE_ADMIN_SUBMENU:
      return{
        ...state,
        currentAdminSubmenu:action.payload
      }
    case CHANGE_ADMIN_MENU:
      return{
        ...state,
        currentAdminSubmenu:0,
        currentAdminMenu:action.payload
      }
    case FETCH_ALL_IMAGES_SUCCESS:
      return{
        ...state,
        galleryImages:[...state.galleryImages,...action.payload],
        galleryShouldReload:false
      }
    case FETCH_IMAGE_SUCCESS:
      state.galleryImages[action.payload.index].data = action.payload.data;
      return{
        ...state,
       // galleryImages:[...state.galleryImages]
        notifications:[...state.notifications]
    }
    case SELECT_CATEGORY_IMAGE_BEGIN:
      return{
        ...state,
        currentAdminMenu:0,
        currentAdminSubmenu:1,
        selectCategoryImage:true

      }
    case SELECT_CATEGORY_IMAGE_CHOOSE:
      return{
        ...state,
        newCategoryImage:action.payload
      }
    case SELECT_CATEGORY_IMAGE_END:
      return{
        ...state,
        currentAdminMenu:1,
        currentAdminSubmenu:0,
        selectCategoryImage:false
      }
    case POST_CATEGORY_SUCCESS:
      return {
        ...state,
        notifications:[...state.notifications]
      }
    
    case FETCH_SUBCATEGORIES_SUCCESS:
      //console.log(action.payload);
      return {
        ...state,
        subcategories:[...action.payload],
        notifications:["subcategories",...state.notifications]
      }
    case FETCH_CLIENT_IMAGE_SUCCESS:
      
      state.imagesHashMap[action.payload.id] = action.payload.data;

      return {
        ...state,
        imagesHashMap:{...state.imagesHashMap}
      }
    case CHANGE_PAGE:
      return {
        ...state,
        pageReload:[...state.pageReload]
      }
    case INIT_BREADCRUMB_SUCCESS:
      return{
        ...state,
        breadcrumbPath:[{name:'Acasa',url:'/'},...action.payload],
      }
    case CLEAR_BREADCRUMB:
      const lastCrumbIndex = state.breadcrumbPath.findIndex(crumb => action.payload.url === crumb.url);
      return{
        ...state,
        breadcrumbPath:[...state.breadcrumbPath.splice(0,lastCrumbIndex+1)]
      }
    case SELECT_PRODUCT_IMAGE_BEGIN:
      return {
        ...state,
        currentAdminMenu:0,
        currentAdminSubmenu:1,
        selectProductImages:true
      }
    case SELECT_PRODUCT_IMAGE_CHOOSE:
      return {
        ...state,
        selectedProductImageIds:[...state.selectedProductImageIds,action.payload]
      }
    case SELECT_PRODUCT_IMAGE_DESELECT:
      state.selectedProductImageIds.splice(state.selectedProductImageIds.indexOf(action.payload),1);
      return{
        ...state,
        selectedProductImageIds:[...state.selectedProductImageIds]
      }
    case SELECT_PRODUCT_IMAGE_END:
      const previewImages = [];
      state.galleryImages.map(img =>{
        if(state.selectedProductImageIds.includes(img.id))
          previewImages[state.selectedProductImageIds.indexOf(img.id)] = img; 
      });
      return {
        ...state,
        currentAdminMenu:2,
        currentAdminSubmenu:0,
        selectProductImages:false,
        productPreviewImages:[...previewImages]
      }
    case FETCH_ALL_SUBCATEGORIES_SUCCESS:
      const subcategoryOptions = action.payload.map(sb =>({name:sb.name, value:sb.id}))
      return {
        ...state,
        allSubcategories:[...subcategoryOptions]
      }
    case REDUX_TYPES.POST_PRODUCT_DATA_SUCCESS:
      return {
        ...state
      }
    case REDUX_TYPES.FETCH_PRODUCTS_SUCCESS:
      //console.log(action.payload)
      return {
        ...state,
        products:[...action.payload],
        notifications:[...state.notifications]
      }
    case REDUX_TYPES.FETCH_PRODUCT_DETAILS_SUCCESS:
      console.log(action.payload)
      return {
        ...state,
        productDetails:action.payload,
        notifications:[...state.notifications]
      }
    default:
      return state;
  }
}

const App = () => {
  const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );
  
  return (
    <div className="App">
      <Helmet>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="description" content=""></meta>
        <title>Piese Tractoare Agricole-Utilaje Viticole|Agrobrazdare</title>
      </Helmet>
      <Provider store={store}>
        <Router>
          <Header/>
          <div className="flex">
            <LateralPanel/>
            <Main/>
          </div>
          <AdminUI/>
          <Footer/>
        </Router>
      </Provider>
    </div>
  );
} 

export default App;
