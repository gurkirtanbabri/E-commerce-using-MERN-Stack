import React from 'react';
import one from "../img/pexels-godisable-jacob-1191531.jpg"
import nine from "../img/pexels-pixabay-248077.jpg"
import four from "../img/4.jpg"
import five from "../img/5.jpg"

const Slider = () => {
    return ( 
        <div id="carouselExampleSlidesOnly" className = "carousel slider" data-ride ="carousel">
            <div className = "carousel-inner">
                <div className ="carousel-item active" data-interval="1000" >
                    <img src ={one} className="d-block w-100  "  alt="one"/>
                </div>
                <div className ="carousel-item" data-interval="1000">
                    <img src ={nine} className="d-block w-100 h-90" alt="one"/>
                </div>
                <div className ="carousel-item" data-interval="1000">
                    <img src ={four} className="d-block w-100 h-90 " alt="one"/>
                </div>
                <div className ="carousel-item" data-interval="1000">
                    <img src ={five} className="d-block w-100  h-90" alt="one"/>
                </div>
            </div>
            <span className="carousel-control-prev"  role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </span>
  <span className="carousel-control-next"  role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </span>

        </div>
     );
}
 
export default Slider;