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
        postCategory
        } from '../Actions';


const AdminUI = (props) => {

    const {role,uploadQueueData,
           currentAdminMenu,
           currentAdminSubmenu,
           galleryImages,
           notifications,
           galleryShouldReload,
           selectCategoryImage,
           newCategoryImage,
           categories
           } = props;
    const [showUpload,setShowUpload] = useState(false);
    const [open, setOpen] = useState(false);
    

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
        //
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

    const galleryClickAction = (image)=>{
        if(selectCategoryImage)
            props.dispatch(selectCategoryImageChoose(image));
        
    }            
    
    const galleryImagesList = galleryImages.map((image,index) =>{
                    const isSelected = newCategoryImage !== undefined && image.id === newCategoryImage.id;
                    return (<div className="gallery-item" key={index} onClick={()=>galleryClickAction(image)}>
                            {isSelected && selectCategoryImage && <div className="select-box"></div>}
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
                                            <p>Alege Imaginea</p>
                                        </div>}
                                    </div>)}]


    const [categoryFormData, setCategoryFormData] = useState({name:"",parentId:null})

    const submitCategoryForm = (e)=>{
        e.preventDefault();
        const data = {
            ...categoryFormData,
            imageId:newCategoryImage.id
        }
        props.dispatch(postCategory(data));
        props.dispatch(selectCategoryImageChoose(undefined))
        setCategoryFormData({...categoryFormData,name:""})
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

    const productSuboptions = [{name:'Adauga Produse Noi',
                                content:(<div>Content ADauga Produse</div>)}]

    const generalSettingsSuboptions = [{name:'Setari Generale',
                                        content:(<div>Content Setari Generale</div>)}]


    const options = [{icon:'I',
                      name:'Imagini',
                      content:(<div>
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
                      content:(<div>
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
                      content:(<div>
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
                      content:(<div>
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

    //de facut in reducer
    const togglePanel = () =>{
        setOpen(!open);
    }

    const optionsList = options.map((o,index) => {
                                        const isCurrentOption = currentAdminMenu === index;
                                        OutsideClick(o.ref,isCurrentOption,()=>{console.log("outside");props.dispatch(changeAdminMenu(undefined))});
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
                <div className="admin-panel-button" onClick={togglePanel}>Administrare</div>
                <div className={`admin-panel ${open?'open':'closed'}`}>
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
    categories:state.categories
    
})

export default connect(mapStateToProps)(AdminUI);