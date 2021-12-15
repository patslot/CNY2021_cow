import React from "react" ; 
import footerbg from "../images/footer.png" ;

const Footer = ({year}) => (
    <div 
        className="container-fluid"
        style={{
            backgroundImage: `url(${footerbg})`,
            height: "100px",
            marginTop: "10px"
        }}
    >
    </div>
)
export default Footer