import React from "react"
import  { navigate } from "gatsby"

const LinkWithTracking = (props) =>{
  const fa = (link)=>{
    if (RegExp("^(http|https)://", "i").test(link)){
        window.dataLayer.push({
            event: 'Outbound link click',
            article: link
        });
        window.open(link, "_blank")
    }else{
        window.dataLayer.push({
            event: 'Article link click',
            article: link
        });
    
        navigate(link)
    }  
    
  }
  return (
      // eslint-disable-next-line
    <a
      {...props}
      id={props.id}
      onClick={e => {
          e.preventDefault();
          fa(props.goal);
        }}
      href=""
    >
      {props.children}
    </a>
  )
}

export default LinkWithTracking