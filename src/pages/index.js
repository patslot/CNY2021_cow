import  React, {useRef} from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import gsap from 'gsap'
import SEO from "../components/seo"

import './index.scss'
import  TransitionLink , { TransitionPortal }  from "gatsby-plugin-transition-link";




// markup
const IndexPage = ({data}) => {
  const transitioncontent = useRef();
  const coverlayer = useRef();
  const coverlayer2 = useRef();
  const articles = data.allMdx.edges; 
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
  const verticalAnimation = (exit, node, article) => {
    const directionTo =  '-100%';
    const directionFrom = '100%' ;
  
    // convert ms to s for gsap
    const seconds = 2
    console.log(article);
    window.dataLayer.push({
      event: 'Article link click',
      article: article.link ? article.link: ''
    });
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
  const outBoundLinkClick = (url) =>{
    window.dataLayer.push({
      event: 'Outbound link click',
      article: url
    });
    window.open(url, "_blank")
  }
  return (
    <Layout>
      <SEO title="Home" />
      {
        articles.map( (nodes) => {
          const article = nodes.node.frontmatter
          let linkclick = ''
          let outbound = false
          if (RegExp("^(http|https)://", "i").test(article.link)){
             linkclick = article.link; 
             outbound = true; 
          }else{
             linkclick = article.link+'/index.html'
          }
          const image = nodes.node.frontmatter.image.childImageSharp.fluid.src
          return(
           
              <div className="col-6 col-sm-4" key={nodes.node.id} ref={transitioncontent} >
                <div className="row">
                  <div className="thumbnailContainer" > 
                    {! outbound && 
                      <>
                        <TransitionLink
                          to={linkclick}
                          exit={{
                            trigger: ({ exit, node }) => verticalAnimation(exit, node, article),
                            length: 1
                          }}
                          entry={{
                            delay: 1,
                            trigger: ({ entry, node }) => entryPageAni(entry, node),
                          }}
                        >
                        <div className="imageContainer">
                          <img src={image} alt={article.title} className="img-fluid" />
                        </div>
                      </TransitionLink> 
                      </>
                    }
                    { outbound && 
                      <>
                        <a href="/#" onClick={ ()=> outBoundLinkClick(linkclick)} >
                          <div className="imageContainer">
                            <img src={image} alt={article.title} className="img-fluid" /> 
                          </div>
                        </a>
                      </>
                    }  
                  </div>
                  <div className="titleContainer">
                  {! outbound && 
                      <>
                        <TransitionLink
                          to={linkclick}
                          exit={{
                            trigger: ({ exit, node }) => verticalAnimation(exit, node, article),
                            length: 1
                          }}
                          entry={{
                            delay: 1,
                            trigger: ({ entry, node }) => entryPageAni(entry, node),
                          }}
                        >
                           <p dangerouslySetInnerHTML={{__html:article.title}} />
                      </TransitionLink> 
                      </>
                    }
                    { outbound && 
                      <>
                        <a href="/#" onClick={ ()=> outBoundLinkClick(linkclick)} >
                          <p dangerouslySetInnerHTML={{__html:article.title}} />
                        </a>
                      </>
                    }  
                  </div>
                  <TransitionPortal>
                    <div
                      ref={coverlayer}
                      className="transitionbg"
                    >
                      <div className="transition-content" ref={coverlayer2} />
                   </div>
                  </TransitionPortal>
                </div>    
              </div> 
              
          )
        })
      }
    </Layout>
  )
}

export default IndexPage


export const query = graphql`
  query MyQuery {
    allMdx(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          id
          frontmatter {
            link
            title
            image {
              childImageSharp {
                fluid {
                  src
                }
                
              }
            }
            date(formatString: "YYYY-MM-DD HH:mm:ss")
          }
        }
      }
    }
  }
`;