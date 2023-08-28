const axios = require('axios')
// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  // api.loadSource(async actions => {
  //   try {
  //     let opts = {
  //       method: 'get',
  //       url: `${process.env.GRIDSOME_API_URL}/profiles`,
  //       headers: {
  //         'Authorization': process.env.API_KEY
  //       }
  //     }
  //     let profileData = await axios(opts)

  //     const profilesCollection = actions.addCollection({
  //       typeName: 'Profiles'
  //     })

  //     profileData.forEach(el => profilesCollection.addNode(el))

  //   } catch (err) {
  //     console.error("Failed to fetch profiles:", err)
  //   }
  // })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
