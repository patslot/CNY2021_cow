var plugins = [{
      plugin: require('/Users/kwokpat/Documents/work/CNY2021_cow/node_modules/gatsby-plugin-google-tagmanager/gatsby-ssr'),
      options: {"plugins":[],"id":"GTM-TRHRCX3","includeInDevelopment":true,"routeChangeEventName":"Page change","defaultDataLayer":{"type":"function","value":"function () {\n          return {\n            platform: 'web',\n          }\n        }"}},
    },{
      plugin: require('/Users/kwokpat/Documents/work/CNY2021_cow/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/kwokpat/Documents/work/CNY2021_cow/node_modules/gatsby-plugin-mdx/gatsby-ssr'),
      options: {"plugins":[],"root":"content","gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1200,"linkImagesToOriginal":false}},{"resolve":"gatsby-remark-image-attributes","options":{"styleAttributes":true,"dataAttributes":false}}]},
    },{
      plugin: require('/Users/kwokpat/Documents/work/CNY2021_cow/node_modules/gatsby-plugin-transition-link/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
