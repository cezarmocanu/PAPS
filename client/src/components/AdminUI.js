import React,{useEffect,useState,useRef,useCallback} from 'react';
import {connect} from 'react-redux';
import '../App.scss';
import {OutsideClick} from '../OutsideClick';
import {useDropzone} from 'react-dropzone'
import {reloadToken,
        clearUploadQueue,
        addInUploadQueue,
        removeFromUploadQueue,
        updateUploadQueue,
        postUploadQueue,
        changeAdminSubmenu,
        changeAdminMenu,
        fetchAllImages,
        fetchImage,
        selectCategoryImageBegin,
        selectCategoryImageChoose,
        selectCategoryImageEnd,
        postCategory,
        selectProductImageBegin,
        selectProductImageChoose,
        selectProductImageDeselect,
        selectProductImageEnd,
        fetchAllSubcategories,
        postProductData,
        REDUX_ACTIONS} from '../Actions';
import Carousel from './Carousel';
import Select from './Select';

const AdminUI = (props) => {

    const {role,uploadQueueData,
           currentAdminMenu,
           currentAdminSubmenu,
           galleryImages,
           notifications,
           galleryShouldReload,
           selectCategoryImage,
           newCategoryImage,
           categories,
           selectProductImages,
           selectedProductImageIds,
           productPreviewImages,
           allSubcategories,
           adminMenuOpen,
           updateProduct,
           productToUpdate
           } = props;
    const [showUpload,setShowUpload] = useState(false);
    

    const onDrop = useCallback(acceptedFiles => {
    
        //acceptedFiles.forEach(file => formData.append('photos',file));         
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const data = reader.result;
                const dotIndex = file.name.search("\\.[^\\.]*$");
                //if(uploadQueueData.length < 10)
                props.dispatch(addInUploadQueue({name : file.name.substr(0,dotIndex),
                                                 ext  : file.name.substr(dotIndex),
                                                 src  : `${data}`,
                                                 file : file}));
            }
            reader.readAsDataURL(file);
        });
      
    })
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    useEffect(() => {
        setShowUpload(uploadQueueData.length > 0);
    }, [uploadQueueData])

    useEffect(() => {
        if(galleryShouldReload)
            props.dispatch(fetchAllImages(galleryImages));   
    }, [galleryShouldReload])
    
    useEffect(() => {
        galleryImages
        .map((img,index) => {
            if(img.data === undefined)
                props.dispatch(fetchImage(index,img.id))
        });
    }, [galleryImages])

    //mount
    useEffect(() => {
        props.dispatch(reloadToken(JSON.stringify({token:localStorage.getItem('token')})));
        props.dispatch(fetchAllImages([]));
        props.dispatch(fetchAllSubcategories());
    }, []);

    const removeImageFromUpload = (name) => {
        props.dispatch(removeFromUploadQueue(name));
    }

    const changeImageName = (e,name)=>{
        props.dispatch(updateUploadQueue(name,e.target.value))
    }

    const uploadImages = async () => {
        const formData = new FormData();
        uploadQueueData.forEach((imgd)=>{
            formData.append('photos',new File([imgd.file],imgd.name+imgd.ext));
        })
        props.dispatch(postUploadQueue(formData))
        props.dispatch(clearUploadQueue());
    }

    const previewImages = uploadQueueData.map(
        (imgd,index) =>{
                    return (<div className="gallery-item" key={index}>
                        <button className="remove" onClick={()=>removeImageFromUpload(imgd.name)}>X</button>
                        <div className="image">
                            <img src={imgd.src}/>
                        </div>
                        <div className="name-input">
                            <input type="text" value={imgd.name} onChange={(e)=>changeImageName(e,imgd.name)}/>
                            <div className="extension">
                                <span>{imgd.ext}</span>
                            </div>
                        </div>
                    </div>)
    }) 

    const galleryClickAction = (image,isCounted)=>{
        if(selectCategoryImage)
            props.dispatch(selectCategoryImageChoose(image));
        if(selectProductImages)
            if(isCounted)
                props.dispatch(selectProductImageDeselect(image.id));
            else
                props.dispatch(selectProductImageChoose(image.id));
    }            
    
    const galleryImagesList = galleryImages.map((image,index) =>{
                    const isSelected = newCategoryImage !== undefined && image.id === newCategoryImage.id;
                    const indexOfImage = selectedProductImageIds.indexOf(image.id)
                    const isCounted = indexOfImage > -1 ? indexOfImage + 1:undefined;
                    return (<div className="gallery-item" key={index} onClick={()=>galleryClickAction(image,isCounted)}>
                            {isSelected && selectCategoryImage && <div className="select-box"></div>}
                            {selectProductImageBegin && <div className="deselect-overlay"></div>}
                            {selectProductImages &&  isCounted && <div className={`image-select-index`}><span>{isCounted}</span></div>}
                            <div className={`image`}>
                                <img src={image.data}/>
                            </div>
                            <div className="name-input">
                                <input type="text" disabled value={image.name}/>
                                <div className="extension">
                                    <span>{image.ext}</span>
                                </div>
                            </div>
                        </div>)
                    });

    const imageSuboptions = [{name:'Adauga Imagini Noi',
                              content:(
                                    <div className="submenu-content">
                                        <div className="content-head">
                                            <div className={`file-dropbox ${isDragActive && 'drag-active'}`} {...getRootProps()}>
                                                <input {...getInputProps()}/>
                                                {
                                                    isDragActive ?
                                                    <p>Plasati imaginile aici ...</p> :
                                                    <p>Trageti imaginile in aceasta zona sau dati click pentru a selecta fisiere</p>
                                                }
                                            </div>
                                            <div onClick = {()=>{uploadImages()}}
                                                className={`upload-button ${showUpload && 'open'}`}>
                                                <span>Incarca <br/> Imaginile</span>
                                            </div>
                                        </div>
                                        <div className="gallery-container">
                                            {previewImages}
                                        </div>
                                    </div>)},
                            {name:'Vezi Galeria De Imagini',
                            content:(
                                    <div className="submenu-content">
                                        <div className="search-image">
                                            <input type="text" placeholder="Search image...."/>
                                        </div>
                                        <div className="gallery-container">
                                            {galleryImagesList}
                                        </div>
                                        {selectCategoryImage && 
                                        <div className="select-images-button" onClick={()=>props.dispatch(selectCategoryImageEnd())}>
                                            <p>Confimra Imaginea</p>
                                        </div>}
                                        {selectProductImages &&
                                         selectedProductImageIds.length > 0 && 
                                        <div className="select-images-button" onClick={()=>props.dispatch(selectProductImageEnd())}>
                                            <p>Confirma Imaginile</p>
                                        </div>}
                                    </div>)}]


    const [categoryFormData, setCategoryFormData] = useState({name:"",parentId:null})
    const [productFormData, setProductFormData] = useState({name:"",
                                                            code:"",
                                                            hasPrice:false,
                                                            price:0,
                                                            categoryId:"",
                                                            description:"",
                                                            unit:""})

    const [canSubmitProductForm, setCanSubmitProductForm] = useState(false)                                                           

    useEffect(() => {
        if(productToUpdate!==undefined){
            const {product,gallery} = productToUpdate;
            setProductFormData({
                name:product.name,
                code:product.code,
                hasPrice:product.hasPrice,
                price:product.price,
                categoryId:product.categoryId,
                description:product.description,
                unit:product.unit
            });

            gallery.map(g => props.dispatch(selectProductImageChoose(g.imageId)))
           // props.dispatch(selectProductImageEnd())
            //selectProductImageChoose(gallery.map(g => g.imageId))
            //productPreviewImages = gallery.map(g => galleryImages[g.imageId]);
            
        }
    }, [updateProduct])

    useEffect(() => {
        if(updateProduct){
            props.dispatch(selectProductImageEnd())
        }
            
    }, [selectedProductImageIds])

    const submitCategoryForm = (e)=>{
        e.preventDefault();
        const data = {
            ...categoryFormData,
            imageId:newCategoryImage.id
        }
        props.dispatch(postCategory(data));
        props.dispatch(selectCategoryImageChoose(undefined))
        setCategoryFormData({...categoryFormData,name:"",categoryId:""})
    }

    const onChangeCategoryForm = (e)=>{
        e.preventDefault();
        setCategoryFormData({
            ...categoryFormData,
            [e.target.name]:e.target.value
        })
    }

    const categorySuboptions = [{name:'Adauga Categorii Noi',
                                content:(<div className="submenu-content">
                                    <div className="category-content-container">
                                        <div className="category-form">
                                            <form onSubmit={submitCategoryForm}>
                                                <div className="form-input">
                                                    <label htmlFor="name">Numele categoriei</label>
                                                    <input
                                                    className="text-input" 
                                                    name="name" 
                                                    type="text"
                                                    value={categoryFormData.name}
                                                    onChange={onChangeCategoryForm}/>                                               
                                                </div>
                                                <div className="form-input">
                                                    <label  htmlFor="parent">Categorie parinte</label>
                                                    <select 
                                                    name="parent" 
                                                    type="dropdown"
                                                    onChange={onChangeCategoryForm}>
                                                        <option value={null}>Fara categorie parinte</option>
                                                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="form-input">
                                                    <label  htmlFor="imageId">Imagine categorie</label>
                                                    {newCategoryImage && 
                                                    <input 
                                                    name="imageId" 
                                                    type="hidden" 
                                                    value={newCategoryImage.id}/>}
                                                    <button
                                                    className="button-input"
                                                    type="button"  
                                                    onClick={()=>props.dispatch(selectCategoryImageBegin())}>Alege Imaginea</button>
                                                </div>
                                                <div className="form-input">
                                                    <input 
                                                    className="button-input" 
                                                    type="submit" 
                                                    value="Salveaza Categoria"/>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="category-preview">
                                            <div className="category-item w-50 h-50">
                                                <div className="image">
                                                    {newCategoryImage !== undefined && <img src={newCategoryImage.data}/>}
                                                </div>
                                                <div className="name">
                                                    {<h4 className="name-text">{categoryFormData.name===""?"Nume Categorie Noua":categoryFormData.name}</h4>}
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>)},
                                {name:'Modifica Categoriile Existente',
                                content:(
                                    <div className="submenu-content">
                                        Content Modifica Categoriile
                                    </div>)}]

    const selectProductSubcategory = <Select
                            initialValue={productToUpdate !== undefined && updateProduct?productToUpdate.product.categoryId:-1}
                            onChange={o => setProductFormData({...productFormData,categoryId:o.value})}
                            options={allSubcategories}
                            />;

    const onChangeProductForm = (e)=>{
        if(e.target.name !== "hasPrice"){
            e.preventDefault(); 
            return setProductFormData({
                ...productFormData,
                [e.target.name]:e.target.value
            })
        }
        return setProductFormData({
            ...productFormData,
            [e.target.name]:e.target.checked
        })
    }

    const submitProductForm = (e)=>{
        e.preventDefault();
        if(updateProduct){
            const fields = [];
            //const imagesModified = productToUpdate.gallery.length !== selectedProductImageIds || productToUpdate.gallery.map(gI => selectedProductImageIds.indexOf(gI.imageId) !== -1).includes(true);
            
            const imagesModified = true;
            fields.push(...[
                {name:"name"       ,value:productFormData.name       ,condition:productFormData.name!==productToUpdate.product.name},
                {name:"code"       ,value:productFormData.code       ,condition:productFormData.code!==productToUpdate.product.code},
                {name:"category"   ,value:productFormData.categoryId ,condition:productFormData.categoryId!==productToUpdate.product.categoryId},
                {name:"description",value:productFormData.description,condition:productFormData.description!==productToUpdate.product.description},
                {name:"price"      ,value:productFormData.price      ,condition:productFormData.hasPrice===true && productFormData.price !== productToUpdate.product.price},
                {name:"unit"       ,value:productFormData.unit       ,condition:productFormData.hasPrice===true && productFormData.unit !== productToUpdate.product.unit},
                {name:"hasPrice"   ,value:productFormData.hasPrice   ,condition:productFormData.hasPrice!==productToUpdate.product.hasPrice},
                {name:"gallery"    ,value:selectedProductImageIds    ,condition:imagesModified}
            ]);
            
            const updateData =fields.filter(field => field.condition)
                                    .reduce((updateData,field)=>{
                                        updateData[field.name] = field.value;
                                        return updateData;
                                    },{})
            //updateData["galleryImages"] = [...selectedProductImageIds];
            console.log(updateData);

        }
        else{
            props.dispatch(postProductData({
                ...productFormData,
                galleryImages:[...selectedProductImageIds]
            }))
        }

        setProductFormData({name:"",
                            code:"",
                            hasPrice:false,
                            price:0,
                            categoryId:"",
                            description:"",
                            unit:""
                        });
        
    }

    useEffect(() => {
        const hasError = [];
        const hasModification = [];
        hasError.push(...[productFormData.name==="",
                            productFormData.code==="",
                            productFormData.categoryId==="",
                            productFormData.categoryId==="novalue",
                            productFormData.description==="",
                            productFormData.hasPrice===true && productFormData.price <= 0,
                            productFormData.hasPrice===true && isNaN(parseFloat(productFormData.price)),
                            productFormData.hasPrice===true && productFormData.unit==="",
                            selectedProductImageIds.length <= 0])
        
        if(productToUpdate)
            hasModification.push(...[productFormData.name!==productToUpdate.product.name,
                                        productFormData.code!==productToUpdate.product.code,
                                        productFormData.categoryId!==productToUpdate.product.categoryId,
                                        productFormData.description!==productToUpdate.product.description,
                                        productFormData.hasPrice!==productToUpdate.product.hasPrice,
                                        productFormData.hasPrice===true && productFormData.price !== productToUpdate.product.price,
                                        productFormData.hasPrice===true && productFormData.unit !== productToUpdate.product.unit
                                    ])
        if(updateProduct)                    
            setCanSubmitProductForm(hasModification.includes(true) && !hasError.includes(true));
        else
            setCanSubmitProductForm(!hasError.includes(true));
    }, [productFormData])

    const productSuboptions = [{name:'Adauga Produse Noi',
                                content:(<div className="submenu-content">
                                <div className="product-content-container category-content-container">
                                    <div className="product-form">
                                        <form onSubmit={submitProductForm}>
                                            <div className="form-input text">
                                                <input
                                                className="text-input"
                                                onChange={onChangeProductForm} 
                                                name="name" 
                                                type="text"
                                                value={productFormData.name}
                                                required/>
                                                <span className="label" 
                                                >Numele Produsului</span>
                                            </div>
                                            <div className="form-input text">
                                                <input
                                                className="text-input" 
                                                onChange={onChangeProductForm}
                                                name="code" 
                                                type="text"
                                                value={productFormData.code}
                                                required/>
                                                <span className="label" 
                                                >Codul Produsului</span>
                                            </div>
                                            <div className="form-input">
                                                <label  htmlFor="category">Categorie</label>
                                                {selectProductSubcategory}
                                            </div>
                                            <div className="form-input checkbox">
                                                <label htmlFor="hasPrice">Are Pret?</label>
                                                <input
                                                className="has-price"
                                                onChange={onChangeProductForm}
                                                checked={productFormData.hasPrice}
                                                name="hasPrice"
                                                type="checkbox"
                                                />                                               
                                            </div>
                                            {productFormData.hasPrice &&
                                            <div className="form-input text">
                                                <input
                                                className="text-input" 
                                                onChange={onChangeProductForm}
                                                name="price" 
                                                type="text"
                                                value={productFormData.price ? productFormData.price : ''}
                                                required/>
                                                <span className="label" 
                                                >Pret</span>   
                                            </div>
                                            }
                                            {productFormData.hasPrice &&
                                            <div className="form-input text">
                                                <input
                                                className="text-input" 
                                                onChange={onChangeProductForm}
                                                name="unit" 
                                                type="text"
                                                value={productFormData.unit ? productFormData.unit : ''}
                                                required/>
                                                <span className="label" 
                                                >Unitate De Masura</span>   
                                            </div>
                                            } 
                                            <div className="form-input">
                                                    <label  htmlFor="imageId">Imagini Galerie</label>
                                                    <input 
                                                    name="imageId" 
                                                    type="hidden" 
                                                    value={1}/>
                                                    <button
                                                    className="button-input"
                                                    type="button"  
                                                    onClick={()=>props.dispatch(selectProductImageBegin())}>Modifica Galeria</button>
                                            </div>
                                            <div className="form-input text">
                                                <input
                                                className="text-input" 
                                                onChange={onChangeProductForm}
                                                name="description" 
                                                type="text"
                                                value={productFormData.description}
                                                required/>
                                                <span className="label" 
                                                >Descriere</span>
                                            </div>
                                            {canSubmitProductForm &&
                                            <div className="form-input">
                                                {!updateProduct && 
                                                <input 
                                                className="button-input" 
                                                type="submit" 
                                                value="Salveaza Produsul"/>
                                                }
                                                {updateProduct && 
                                                <input 
                                                className="button-input" 
                                                type="submit" 
                                                value="Modifica Produsul"/>
                                                }
                                                
                                            </div>
                                            }
                                            
                                        </form>
                                    </div>
                                    <div className="product-preview-container">
                                        <div className="product-gallery-preview">
                                            <div className="carousel-container">
                                                <Carousel slides={productPreviewImages}/>
                                            </div>
                                        </div>
                                        
                                        <div className="product-preview">    
                                            <div className="image">
                                                {productPreviewImages.length !== undefined &&
                                                 productPreviewImages.length > 0 &&
                                                <img src={productPreviewImages[0].data}/>}
                                            </div>
                                            <div className="details">
                                                <hr/>
                                                {<h3 className="name-text">{productFormData.name===""?"Adaugati un nume de produs":productFormData.name}</h3>}
                                                {<h4 className="code-text">{productFormData.code===""?"Adaugati un cod de produs":productFormData.code}</h4>}
                                                {productFormData.hasPrice &&
                                                    <div className="price">
                                                        {<h4 className="price-text">{isNaN(productFormData.price)?"Pret":productFormData.price} lei</h4>}
                                                        {<h4 className="unit-text">/ {productFormData.unit===""?"Nume Unitate":productFormData.unit}</h4>}
                                                    </div>
                                                }
                                            </div>
                                            
                                        </div>
                                    </div>    
                                </div>
                            </div>)}]

    const generalSettingsSuboptions = [{name:'Setari Generale',
                                        content:(<div>Content Setari Generale</div>)}]


    const options = [{icon:'I',
                      name:'Imagini',
                      content:(<div className="option-box">
                                    {currentAdminSubmenu < imageSuboptions.length && 
                                    imageSuboptions[currentAdminSubmenu].content}
                                    <div className="submenu">
                                        {imageSuboptions.map((suboption,index) => 
                                        (<div key={suboption.name} className={`submenu-option ${index === currentAdminSubmenu && 'active'}`}
                                            onClick={()=>props.dispatch(changeAdminSubmenu(index))}>
                                            <span>{suboption.name}</span>
                                        </div>))}  
                                    </div>
                                </div>),
                      ref:useRef(null)},
                     {icon:'C',
                      name:'Categorii',
                      content:(<div className="option-box">
                                {currentAdminSubmenu < categorySuboptions.length && 
                                categorySuboptions[currentAdminSubmenu].content}
                                <div className="submenu">
                                    {categorySuboptions.map((suboption,index) => 
                                    (<div key={suboption.name} className={`submenu-option ${index === currentAdminSubmenu && 'active'}`}
                                        onClick={()=>props.dispatch(changeAdminSubmenu(index))}>
                                        <span>{suboption.name}</span>
                                    </div>))}
                                </div>
                            </div>),
                      ref:useRef(null)},
                     {icon:'P',
                      name:'Produse',
                      content:(<div className="option-box">
                                    {currentAdminSubmenu < productSuboptions.length && 
                                    productSuboptions[currentAdminSubmenu].content}
                                    <div className="submenu">
                                        {productSuboptions.map((suboption,index) => 
                                        (<div key={suboption.name} className={`submenu-option ${index === currentAdminSubmenu && 'active'}`}
                                            onClick={()=>props.dispatch(changeAdminSubmenu(index))}>
                                            <span>{suboption.name}</span>
                                        </div>))}
                                    </div>
                              </div>),
                      ref:useRef(null)},
                     {icon:'SG',
                      name:'Setari Generale',
                      content:(<div className="option-box">
                                {currentAdminSubmenu < generalSettingsSuboptions.length &&  
                                generalSettingsSuboptions[currentAdminSubmenu].content}
                                <div className="submenu">
                                    {generalSettingsSuboptions.map((suboption,index) => 
                                    (<div key={suboption.name} className={`submenu-option ${index === currentAdminSubmenu && 'active'}`}
                                        onClick={()=>props.dispatch(changeAdminSubmenu(index))}>
                                        <span>{suboption.name}</span>
                                    </div>))}
                                </div>
                              </div>),
                      ref:useRef(null)},
                     ]


    const optionsList = options.map((o,index) => {
                                        const isCurrentOption = currentAdminMenu === index;
                                        OutsideClick(o.ref,isCurrentOption,()=>{
                                            props.dispatch(changeAdminMenu(undefined))
                                            props.dispatch(REDUX_ACTIONS.toggleAdminMenu())
                                            props.dispatch(REDUX_ACTIONS.editProductClear())
                                        });
                                        return(<div ref={o.ref} key={o.name} className={`admin-option ${isCurrentOption?"open":"close"}`} >
                                                <div className="icon" onClick={()=>props.dispatch(changeAdminMenu(index))}>{o.icon}</div>
                                                {isCurrentOption && <div className={`connection ${isCurrentOption?"open":"close"}`}></div>}
                                                {isCurrentOption &&<div className={`connection-triangle ${isCurrentOption?"open":"close"}`}></div>}
                                                {currentAdminMenu === undefined && <div className={`option-name`}>{o.name}</div>}
                                                {isCurrentOption &&
                                                    <div className={`content ${isCurrentOption?"open":"close"}`}>
                                                    {o.content}
                                                    </div>}
                                            </div>)
                                        })

    return (role ==='admin' && 
            <div className="admin-ui">
                <div className="admin-panel-button" onClick={()=>props.dispatch(REDUX_ACTIONS.toggleAdminMenu())}>Administrare</div>
                <div className={`admin-panel ${adminMenuOpen?'open':'closed'}`}>
                    {optionsList}
                </div>
                
            </div>);

};

const mapStateToProps = (state) => ({
    role:state.role,
    uploadQueueData:state.uploadQueueData,
    currentAdminMenu:state.currentAdminMenu,
    currentAdminSubmenu:state.currentAdminSubmenu,
    galleryImages:state.galleryImages,
    galleryShouldReload:state.galleryShouldReload,
    notifications:state.notifications,
    selectCategoryImage:state.selectCategoryImage,
    newCategoryImage:state.newCategoryImage,
    categories:state.categories,
    selectProductImages:state.selectProductImages,
    selectedProductImageIds:state.selectedProductImageIds,
    productPreviewImages:state.productPreviewImages,
    allSubcategories:state.allSubcategories,
    productToUpdate:state.productToUpdate,
    updateProduct:state.updateProduct,
    adminMenuOpen:state.adminMenuOpen
    
})

export default connect(mapStateToProps)(AdminUI);