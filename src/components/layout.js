/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => {


  return (
    <>
      <Header siteTitle={`Title`} />
      <div
        className="container"
      >
        <div className="row">
            {children}
        </div>
       
      </div>
      <Footer year={new Date().getFullYear()} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
