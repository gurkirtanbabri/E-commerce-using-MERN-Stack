import React from 'react';
import Menu from './menu';
const Base = ({
    title = "my title",
    discription = "my discripton",
    mg="",
    className = "bg-dark text-white p-4",
    children
}) => {
    console.log(mg);
    return (
      




        <div>
              <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark p-0 text-white text-center">
                    <h2 className="display-4">{title}</h2>
                     <p className="lead">{discription}</p>
                 </div>
    <div className = {className}>{children}</div>

             </div>
             <div className="footer bg-dark mt-4 py-3" style={{marginTop:mg}}>
                 <h6 className="text-light text-center">Design and Developed by</h6>
                 <div className="d-flex justify-content-center ">
                     <div>
                        <p className="text-light text-center"> Mandeep kaur</p>
                     </div>
                 </div>
             </div>
         </div>
      );
}
 
export default Base;