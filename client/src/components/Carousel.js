import React,{useState,useEffect} from 'react';
import {FaChevronLeft,FaChevronRight} from 'react-icons/fa';

const Carousel = (props) => {

    //accepts a list of [imageData]
                         
    const {slides} = props;
    const [currentIndex, setCurrentIndex] = useState(0);

    const previewSlides = slides.map((s,index) => <div 
                                                    onClick={()=>{setCurrentIndex(index)}}
                                                    className={`preview-box ${index === currentIndex && "active"}`}>
                                                        <img src={s.data}/>
                                                    </div>);
    

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            setCurrentIndex((currentIndex+1)%slides.length)
        }, 5000);
        return ()=>clearInterval(interval);

    }, [currentIndex])

    return (slides.length > 0 && 
            <div className="carousel">
                <div className="main-container">
                    <div 
                    onClick={()=>{setCurrentIndex((slides.length + currentIndex - 1)%slides.length)}}
                    className="arrow-left">
                        <FaChevronLeft/>
                    </div>
                    <div className="current-slide">
                        <div className="slide-container">
                            <img src={slides[currentIndex].data}/>
                        </div>
                    </div>
                    <div 
                    onClick={()=>{setCurrentIndex((currentIndex+1)%slides.length)}}
                    className="arrow-right">
                        <FaChevronRight/>
                    </div>
                </div>
                <div className="preview-section">
                    {previewSlides}
                </div>

            </div>)
}

export default Carousel;

