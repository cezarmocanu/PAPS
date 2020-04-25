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
import './Actions';
import { ADD_PAGE,
         CLEAR_PAGE,
         TOGGLE_LATERAL_PANEL,
         FETCH_CATEGORIES_BEGIN,
         FETCH_CATEGORIES_SUCCESS,
         FETCH_CATEGORIES_FAILURE,
         POST_LOGIN_BEGIN,
         POST_LOGIN_SUCCESS,
         POST_LOGIN_FAILURE, 
         CHECK_ADMINS_BEGIN,
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
         FETCH_ALL_IMAGES_BEGIN,
         FETCH_ALL_IMAGES_SUCCESS,
         FETCH_ALL_IMAGES_FAILURE,
         FETCH_IMAGE_SUCCESS,
         SELECT_CATEGORY_IMAGE_BEGIN,
         SELECT_CATEGORY_IMAGE_END,
         SELECT_CATEGORY_IMAGE_CHOOSE,
         POST_CATEGORY_SUCCESS,
         FETCH_SUBCATEGORIES_SUCCESS,
         FETCH_CLIENT_IMAGE_SUCCESS
        } from './Actions';


const initialState = {
  lateralPanelToggled:false,
  breadcrumbs:[{name:'Acasa',path:'/'}],
  categories:[],
  subcategories:[],
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
  imagesHashMap:{}
  
}

function reducer(state=initialState,action){

  //action payload e continutul unui action
  switch(action.type){
    case ADD_PAGE:
      ///de facut fara push si de testat
      state.breadcrumbs.push(action.payload);
      return{
        ...state,
        breadcrumbs:[...state.breadcrumbs]
      }
    case CLEAR_PAGE:
      const index = state.breadcrumbs.findIndex(crumb => crumb.name === action.payload)
      return{
        ...state,
        breadcrumbs:[...state.breadcrumbs.slice(0,index+1)]
      }
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
      console.log(action.payload);
      return {
        ...state,
        subcategories:[...action.payload]
      }
    case FETCH_CLIENT_IMAGE_SUCCESS:
      
      state.imagesHashMap[action.payload.id] = action.payload.data;

      return {
        ...state,
        imagesHashMap:{...state.imagesHashMap}
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
      <Provider store={store}>
        <Router>
          <Header/>
          <div className="flex">
            <LateralPanel/>
            <Main/>
          </div>
          <AdminUI/>
        </Router>
      </Provider>
    </div>
  );
} 

export default App;
