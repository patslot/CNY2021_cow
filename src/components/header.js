import PropTypes from "prop-types"
import React from "react"
import headerDesktopImage from "../images/header.png"

const Header = ({ siteTitle }) => {
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <img src={headerDesktopImage} className="img-fluid" alt="新春沖喜大法" />
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
