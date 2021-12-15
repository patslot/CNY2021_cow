module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"id":"GTM-TRHRCX3","includeInDevelopment":true,"routeChangeEventName":"Page change","defaultDataLayer":{"type":"function","value":"function () {\n          return {\n            platform: 'web',\n          }\n        }"}},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"root":"content","gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1200,"linkImagesToOriginal":false}},{"resolve":"gatsby-remark-image-attributes","options":{"styleAttributes":true,"dataAttributes":false}}]},
    },{
      plugin: require('../node_modules/gatsby-plugin-transition-link/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
