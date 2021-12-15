const path = require(`path`)
const PostTemplate = path.resolve('./src/templates/post-template.js')
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
exports.onCreatePage =  ({page, actions }) => {
  const { createPage, deletePage, createRedirect } = actions
  if (page.path === `/`) {
    // remove old one
    deletePage(page)
    // and create new one with modified path
    createPage({
      ...page,
      path: process.env.BASEURL 
    })
  }
     
}

exports.createPages = async ({graphql, actions, reporter }) => {
  const { createPage } = actions
  
  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

   // Handle errors
   if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.slug+'/index.html',
      component: PostTemplate,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.slug,
      },
    })
  })
}

