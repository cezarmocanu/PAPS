import React,{useState,useEffect} from 'react';
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa';

const Carousel = (props) => {

    //accepts a list of [imageData]
                         
    const {slides} = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const previewSlides = slides.map((s,index) => <div 
                                                    key={index}
                                                    onClick={()=>{setCurrentIndex(index)}}
                                                    className={`preview-box ${index === currentIndex && "active"}`}>
                                                        <img src={s.data}/>
                                                    </div>);
    

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            const next = (currentIndex+1)%slides.length;
            setCurrentIndex(isNaN(next)?0:next);
        }, 5000);
        return ()=>clearInterval(interval);

    }, [currentIndex])

    return (
            <div className="carousel">
                {   slides.length > 0 && (
                        <div className="main-container">
                        <div 
                        onClick={()=>{setCurrentIndex((slides.length + currentIndex - 1)%slides.length)}}
                        className="arrow-left">
                            <FaChevronLeft/>
                        </div>
                        <div className="current-slide">
                            <div className="slide-container">
                                {
                                slides[currentIndex] &&
                                <img src={slides[currentIndex].data}/>    
                                }
                            </div>
                        </div>
                        <div 
                        onClick={()=>{setCurrentIndex((currentIndex+1)%slides.length)}}
                        className="arrow-right">
                            <FaChevronRight/>
                        </div>
                    </div>)}
                {   slides.length > 0 && 
                    <div className="preview-section">
                    {previewSlides}
                    </div>
                }
                {
                    slides.length <= 0 &&
                    <div className="empty-slide">
                        <div className="logo">
                            <div className="logo-content">
                                <span className="capital">A</span>
                                <span>GRO</span>
                                <span className="capital">B</span>
                                <span>RAZDARE</span>
                            </div>
                        </div>
                        <span className="indications">Alegeti Imaginile Pentru Galeria Produsului</span>
                    </div>
                }

            </div>)
}

export default Carousel;

