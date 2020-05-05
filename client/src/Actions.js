import { FaCreativeCommonsZero } from "react-icons/fa";

let last = 0;
const GEN_ID = ()=>{return last++;}


export const TOGGLE_LATERAL_PANEL = GEN_ID();

export const FETCH_CATEGORIES_BEGIN   = GEN_ID();
export const FETCH_CATEGORIES_SUCCESS = GEN_ID();
export const FETCH_CATEGORIES_FAILURE = GEN_ID();

export const FETCH_ALL_SUBCATEGORIES_BEGIN   = GEN_ID();
export const FETCH_ALL_SUBCATEGORIES_SUCCESS = GEN_ID();
export const FETCH_ALL_SUBCATEGORIES_FAILURE = GEN_ID();

export const POST_LOGIN_BEGIN   = GEN_ID();
export const POST_LOGIN_SUCCESS = GEN_ID();
export const POST_LOGIN_FAILURE = GEN_ID();

export const CHECK_ADMINS_BEGIN = GEN_ID();
export const CHECK_ADMINS_SUCCESS = GEN_ID();
export const CHECK_ADMINS_FAILURE = GEN_ID();

export const POST_SIGNUP_BEGIN = GEN_ID();
export const POST_SIGNUP_SUCCESS = GEN_ID();
export const POST_SIGNUP_FAILURE = GEN_ID();

export const CHECK_TOKEN = GEN_ID();

export const ADD_IN_UPLOAD_QUEUE = GEN_ID();
export const REMOVE_FROM_UPLOAD_QUEUE = GEN_ID();
export const UPDATE_UPLOAD_QUEUE = GEN_ID();
export const CLEAR_UPLOAD_QUEUE = GEN_ID();

export const POST_UPLOAD_QUEUE_BEGIN = GEN_ID();
export const POST_UPLOAD_QUEUE_SUCCESS = GEN_ID();
export const POST_UPLOAD_QUEUE_FAILURE = GEN_ID();

export const CHANGE_ADMIN_MENU = GEN_ID();
export const CHANGE_ADMIN_SUBMENU = GEN_ID();

export const FETCH_ALL_IMAGES_BEGIN = GEN_ID();
export const FETCH_ALL_IMAGES_SUCCESS = GEN_ID();
export const FETCH_ALL_IMAGES_FAILURE = GEN_ID();

export const FETCH_IMAGE_BEGIN = GEN_ID();
export const FETCH_IMAGE_SUCCESS = GEN_ID();
export const FETCH_IMAGE_FAILURE = GEN_ID();

export const SELECT_CATEGORY_IMAGE_BEGIN = GEN_ID();
export const SELECT_CATEGORY_IMAGE_CHOOSE = GEN_ID();
export const SELECT_CATEGORY_IMAGE_END = GEN_ID();

export const POST_CATEGORY_BEGIN = GEN_ID();
export const POST_CATEGORY_SUCCESS = GEN_ID();
export const POST_CATEGORY_FAILURE = GEN_ID();

export const FETCH_SUBCATEGORIES_BEGIN = GEN_ID();
export const FETCH_SUBCATEGORIES_SUCCESS = GEN_ID();
export const FETCH_SUBCATEGORIES_FAILURE = GEN_ID();

export const FETCH_CLIENT_IMAGE_BEGIN = GEN_ID();
export const FETCH_CLIENT_IMAGE_SUCCESS = GEN_ID();
export const FETCH_CLIENT_IMAGE_FAILURE = GEN_ID();

export const CHANGE_PAGE = GEN_ID();

export const INIT_BREADCRUMB_BEGIN = GEN_ID();
export const INIT_BREADCRUMB_SUCCESS = GEN_ID();
export const INIT_BREADCRUMB_FAILURE = GEN_ID();

export const CLEAR_BREADCRUMB = GEN_ID();

export const SELECT_PRODUCT_IMAGE_BEGIN = GEN_ID();
export const SELECT_PRODUCT_IMAGE_CHOOSE = GEN_ID();
export const SELECT_PRODUCT_IMAGE_DESELECT = GEN_ID();
export const SELECT_PRODUCT_IMAGE_END = GEN_ID();





//action creators

export const toggleLateralPanel = (value) => ({type:TOGGLE_LATERAL_PANEL,payload:value})

export const fetchCategoriesBegin = () => ({type:FETCH_CATEGORIES_BEGIN})
export const fetchCategoriesSuccess = (categories) => ({type:FETCH_CATEGORIES_SUCCESS,payload:categories})
export const fetchCategoriesFailure = (error) => ({type:FETCH_CATEGORIES_FAILURE,payload:error})

export const fetchAllSubcategoriesBegin = () => ({type:FETCH_ALL_SUBCATEGORIES_BEGIN});
export const fetchAllSubcategoriesSuccess = (subcategories) => ({type:FETCH_ALL_SUBCATEGORIES_SUCCESS,payload:subcategories});
export const fetchAllSubcategoriesFailure = () => ({type:FETCH_ALL_SUBCATEGORIES_FAILURE});

export const postLoginBegin = () => ({type:POST_LOGIN_BEGIN})
export const postLoginSuccess = (tokenData) => ({type:POST_LOGIN_SUCCESS,payload:tokenData})
export const postLoginFailure = (error) => ({type:POST_LOGIN_FAILURE,payload:error})

export const checkAdminsBegin = () => ({type:CHECK_ADMINS_BEGIN})
export const checkAdminsSuccess = (shouldCreate) => ({type:CHECK_ADMINS_SUCCESS,payload:shouldCreate})
export const checkAdminsFailure = (error) => ({type:CHECK_ADMINS_FAILURE,payload:error})

export const postSignupBegin = () => ({type:POST_SIGNUP_BEGIN})
export const postSignupSuccess = () => ({type:POST_SIGNUP_SUCCESS})
export const postSignupFailure = (error) => ({type:POST_SIGNUP_FAILURE,payload:error})

export const checkToken = () => ({type:CHECK_TOKEN})

export const addInUploadQueue = (data) => ({type:ADD_IN_UPLOAD_QUEUE,payload:data})
export const removeFromUploadQueue = (itemName) => ({type:REMOVE_FROM_UPLOAD_QUEUE,payload:itemName})
export const updateUploadQueue = (itemName,newValue) =>({type:UPDATE_UPLOAD_QUEUE,payload:{itemName:itemName,newValue:newValue}})
export const clearUploadQueue = ()=>({type:CLEAR_UPLOAD_QUEUE});

export const postUploadQueueBegin = ()=>({type:POST_UPLOAD_QUEUE_BEGIN})
export const postUploadQueueSuccess = (response) => ({type:POST_UPLOAD_QUEUE_SUCCESS,payload:response})
export const postUploadQueueFailure = (error) => ({type:POST_UPLOAD_QUEUE_FAILURE,payload:error})

export const changeAdminMenu = (optionId) => ({type:CHANGE_ADMIN_MENU,payload:optionId})
export const changeAdminSubmenu = (suboptionId) => ({type:CHANGE_ADMIN_SUBMENU,payload:suboptionId})

export const fetchAllImagesBegin = () => ({type:FETCH_ALL_IMAGES_BEGIN})
export const fetchAllImagesSuccess = (images) => ({type:FETCH_ALL_IMAGES_SUCCESS,payload:images})
export const fetchAllImagesFailure = (error) => ({type:FETCH_ALL_IMAGES_FAILURE,payload:error})

export const fetchImageBegin = ()=>({type:FETCH_IMAGE_BEGIN})
export const fetchImageSuccess = (index,data)=>({type:FETCH_IMAGE_SUCCESS,payload:{index:index,data:data}})
export const fetchImageFailure = (error)=>({type:FETCH_IMAGE_FAILURE})

export const selectCategoryImageBegin = () => ({type:SELECT_CATEGORY_IMAGE_BEGIN})
export const selectCategoryImageChoose = (image) => ({type:SELECT_CATEGORY_IMAGE_CHOOSE,payload:image})
export const selectCategoryImageEnd = () => ({type:SELECT_CATEGORY_IMAGE_END})

export const postCategoryBegin = () => ({type:POST_CATEGORY_BEGIN})
export const postCategorySuccess = () => ({type:POST_CATEGORY_SUCCESS})
export const postCategoryFailure = () => ({type:POST_CATEGORY_FAILURE})

export const fetchSubcategoriesBegin = () => ({type:FETCH_SUBCATEGORIES_BEGIN})
export const fetchSubcategoriesSuccess = (subcategories) => ({type:FETCH_SUBCATEGORIES_SUCCESS,payload:subcategories});
export const fetchSubcategoriesFailure = () => ({type:FETCH_SUBCATEGORIES_FAILURE})

export const fetchClientImageBegin = () => ({type:FETCH_CLIENT_IMAGE_BEGIN});
export const fetchClientImageSuccess = (id,data) => ({type:FETCH_CLIENT_IMAGE_SUCCESS,payload:{id:id,data:data}});
export const fetchClientImageFailure = () => ({type:FETCH_CLIENT_IMAGE_FAILURE});

export const changePage = () => ({type:CHANGE_PAGE})

export const initBreadcrumbBegin = () => ({type:INIT_BREADCRUMB_BEGIN});
export const initBreadcrumbSuccess = (path) => ({type:INIT_BREADCRUMB_SUCCESS,payload:path});
export const initBreadcrumbFailure = () => ({type:INIT_BREADCRUMB_FAILURE});

export const clearBreadcrumb = (lastCrumb) => ({type:CLEAR_BREADCRUMB,payload:lastCrumb});

export const selectProductImageBegin = () =>({type:SELECT_PRODUCT_IMAGE_BEGIN})
export const selectProductImageChoose = (imageId) =>({type:SELECT_PRODUCT_IMAGE_CHOOSE,payload:imageId})
export const selectProductImageDeselect = (imageId) =>({type:SELECT_PRODUCT_IMAGE_DESELECT,payload:imageId})
export const selectProductImageEnd = () =>({type:SELECT_PRODUCT_IMAGE_END})



//const host = "http://localhost:5000";
const host = "http://192.168.1.111:5000";
//const host = "https://agrobrazdare.ro";

export const B64toJSON = (s) => {
  try {
    return JSON.parse(window.atob(s.split('.')[1]));
  } catch (error) {
    return {}
  }
}
//actions
export const fetchCategories = ()=>{
  return dispatch => {
    dispatch(fetchCategoriesBegin());
    return fetch(`${host}/api/categories`)
          .then(res => res.json())
          .then(json=>{
            dispatch(fetchCategoriesSuccess(json))
            return json;
          })
          .catch(error => dispatch(fetchCategoriesFailure(error)))
  }
}


export const reloadToken = (data) => {
  return dispatch => {
    return fetch(`${host}/admin/checktoken/`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:data
    })
    .then(res => res.json())
    .then(json =>{
      if(json.status === 200){
        localStorage.setItem("token",json.token);
        dispatch(postLoginSuccess(B64toJSON(json.token)));
        return;
      }
      localStorage.setItem("token",'');
      dispatch(postLoginFailure({role:''}));
      return;
    })
    .catch(error => dispatch(postLoginFailure({role:''})))
  }
}

export const postLogin = (data) => {
  return dispatch => {
    dispatch(postLoginBegin());
    return fetch(`${host}/admin/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:data
    })
    .then(res => res.json())
    .then(json =>{
      if(json.status === 200){
        localStorage.setItem("token",json.token);
        dispatch(postLoginSuccess(B64toJSON(json.token)));
        return B64toJSON(json.token);
      }
      
      dispatch(postLoginFailure({role:''}))
      //status to message handling
      return {role:''}
    })
    .catch(error => dispatch(postLoginFailure({role:''})))
  }
}

export const checkAdmins = () => {
  return dispatch => {
    dispatch(checkAdminsBegin());
    return fetch(`${host}/admin/createaccount`)
    .then(res => res.json())
    .then(json =>{
      dispatch(checkAdminsSuccess(json));
      return json;
    })
    .catch(error => checkAdminsFailure(error))
  }
}

export const postSignup = (data) => {
  return dispatch => {
    dispatch(postSignupBegin());
    return fetch(`${host}/admin/createaccount`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:data
    })
    .then(() => {
      dispatch(postSignupSuccess());
    })
    .catch(error => dispatch(postSignupFailure(error)))
  }
}

export const postUploadQueue = (formData) => {
    return dispatch => {
      dispatch(postUploadQueueBegin());
      return fetch(`${host}/admin/uploadimages`,{
          method:'POST',
          body:formData
      })
      .then(res =>res.json())
      .then(json => {
        dispatch(postUploadQueueSuccess(json))
      })
      .catch(error => dispatch(postUploadQueueFailure(error)))  
    }
}


export const fetchAllImages = (currentImages) => {
  return dispatch => {
    dispatch(fetchAllImagesBegin());
    return fetch(`${host}/admin/images`)
    .then(res => res.json())
    .then(json =>{
      const indices = currentImages.map(ci => ci.id);
      const newData = json.data.filter(img => !indices.includes(img.id))

      dispatch(fetchAllImagesSuccess(newData))
    })
    .catch(error => dispatch(fetchAllImagesFailure(error)))
  }
}

function arrayBufferToBase64(buffer) {
  let binary = '';
  let bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

export const fetchImage = (index,imageId) => {
  return dispatch => {
    dispatch(fetchImageBegin())
    return fetch(`${host}/admin/images/${imageId}`)
    .then(res => {
      res.arrayBuffer().then(buffer=>{
        const base64Flag = 'data:image/jpeg;base64,';
        const imageData = arrayBufferToBase64(buffer);
        dispatch(fetchImageSuccess(index,base64Flag+imageData));
      })
    })
    .catch(error => dispatch(fetchImageFailure(error)))
  }
}

export const postCategory = (data) => {
  return dispatch => {
    dispatch(postCategoryBegin())
    return fetch(`${host}/api/categories`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      dispatch(postCategorySuccess())
      dispatch(fetchCategories())
    })
    .catch(error => dispatch(postCategoryFailure()))
  }
}

export const fetchSubcategories = (idCategory) =>{
  return dispatch => {
    dispatch(fetchSubcategoriesBegin())
    return fetch(`${host}/api/categories/${idCategory}`)
    .then(res => res.json())
    .then((json) => {
      dispatch(fetchSubcategoriesSuccess(json))
      
    })
    .catch(error => dispatch(fetchSubcategoriesFailure()))
  }
}

export const fetchAllSubcategories = () => {
  return dispatch => {
    dispatch(fetchAllSubcategoriesBegin);
    return fetch(`${host}/api/subcategories/`)
    .then(res => res.json())
    .then((json) => {
      dispatch(fetchAllSubcategoriesSuccess(json))
    })
    .catch(error => dispatch(fetchAllSubcategoriesFailure()))
  }
}

export const fetchClientImage = (id) =>{
  return dispatch => {
    dispatch(fetchClientImageBegin())
    return fetch(`${host}/api/images/${id}`)
    .then(res => {
      res.arrayBuffer().then(buffer=>{
        const base64Flag = 'data:image/jpeg;base64,';
        const imageData = arrayBufferToBase64(buffer);
        
        dispatch(fetchClientImageSuccess(id,base64Flag+imageData));
      })
    })
    .catch(error => dispatch(fetchClientImageFailure()))
  }
}

export const initBreadcrumb = (id,symbol) => {
  return dispatch => {
    dispatch(initBreadcrumbBegin());
    return fetch(`${host}/api/breadcrumb/${id}/${symbol}`)
    .then(res => res.json())
    .then(json => {
      dispatch(initBreadcrumbSuccess(json.path))
    })
    .catch(error =>dispatch(initBreadcrumbFailure()))
  }
}



const ACTION_TYPES = [
  {name:'POST_PRODUCT_DATA',thunk:true}
];

const TYPES = {};
const ACTIONS = {};
ACTION_TYPES.map(T => {
                        if(T.thunk === undefined)
                          return TYPES[T] = T;
                        TYPES[`${T.name}_BEGIN`] =`${T.name}_BEGIN`;
                        TYPES[`${T.name}_SUCCESS`] =`${T.name}_SUCCESS`;
                        TYPES[`${T.name}_FAILURE`] =`${T.name}_FAILURE`; 
                        return;
                      });
ACTION_TYPES.map(T => {
                        if(T.thunk === undefined){
                          const fName = (T.toLowerCase().split("_").map((w,index) => index==0?w:w.charAt(0).toUpperCase()+w.slice(1))).join('');
                          return ACTIONS[fName] = (payload)=>({type:T,payload:payload});
                        }
                        const fName = (T.name.toLowerCase().split("_").map((w,index) => index==0?w:w.charAt(0).toUpperCase()+w.slice(1))).join('');
                        ACTIONS[`${fName}Begin`] = (payload)=>({type:`${T.name}_BEGIN`,payload:payload});
                        ACTIONS[`${fName}Success`] = (payload)=>({type:`${T.name}_SUCCESS`,payload:payload});
                        ACTIONS[`${fName}Failure`] = (payload)=>({type:`${T.name}_FAILURE`,payload:payload});
                        return;
                    });

export const postProductData = (data) => {
  return dispatch => {
    dispatch(ACTIONS.postProductDataBegin());
    console.log(data)
    return fetch(`${host}/api/products`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
      dispatch(ACTIONS.postProductDataSuccess())
    })
    .catch(error => dispatch(ACTIONS.postProductDataFailure()))
    //fetch()
  }
}

export const REDUX_TYPES = {...TYPES};
export const REDUX_ACTIONS = {...ACTIONS};