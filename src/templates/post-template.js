import React, {useRef}  from "react"
import { graphql } from "gatsby"
import gsap from 'gsap'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import  TransitionLink , { TransitionPortal }  from "gatsby-plugin-transition-link";
import { Link } from "gatsby"
import LinkWithTracking from "../components/linkWithTracking"
import VideoPlayer from "../components/videoplayer"

import Layout from "../components/layout"
import "./post-template.scss"
import btn_back from "../images/btn_back.png"
const shortcodes = { Link, LinkWithTracking, VideoPlayer} // Provide common components here

export default ({ data }) => {
  const post = data.mdx

  const transitioncontent = useRef();
  const coverlayer = useRef();
  const coverlayer2 = useRef();

  const entryPageAni = (entry, node)  => {
    return gsap.from(
      node.querySelectorAll('div'),
      { 
        opacity: 0, 
        y: '+=50',
        duration: 1,
        stagger: 0.1,
      },
    )
  }
  const verticalAnimation = () => {
    const directionTo =  '-100%';
    const directionFrom = '100%' ;
  
    // convert ms to s for gsap
    const seconds = 2
  
    return gsap.timeline()
      .set(coverlayer.current, { y: directionFrom })
      .to(coverlayer.current, {
        y: '0%',
        ease: "power1.easeInOut",
        duration: 0.2,
      })  
      .to(coverlayer2.current, {
        scale: 1.5,
        duration: seconds / 4,
      }) 
      .to(coverlayer2.current, {
        scale: 0.8,
        duration: seconds / 4,
      })
      .to(coverlayer2.current, {
        scale: 1,
        duration: seconds / 4,
      })
      .set(transitioncontent.current, { opacity: 0 })
      .to(coverlayer.current, {
        y: directionTo,
        ease: "power1.easeIn",
        duration: seconds / 4,
      })
      
  }
  return (
    <Layout>
      <div className="col-12 btnBackContainer">
      <TransitionLink
                    to={`${process.env.BASEURL}`}
                    exit={{
                      trigger: ({ exit, node }) => verticalAnimation(exit, node),
                      length: 1
                    }}
                    entry={{
                      delay: 1,
                      trigger: ({ entry, node }) => entryPageAni(entry, node),
                    }}
                  >
          <img src={btn_back} alt="回主頁" />
        </TransitionLink>
      </div>
      <div className="col-12" ref={transitioncontent} >
        <h1 dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
        <div className="contentContainer">
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
      <TransitionPortal>
                    
                    <div
                      ref={coverlayer}
                      className="transitionbg"
                    >
                      <div className="transition-content" ref={coverlayer2} />
                   
                    </div>

      </TransitionPortal>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    mdx(slug: { eq: $slug }) {
      excerpt
      frontmatter {
        link
        title
      }
      body
    }
  }
`
