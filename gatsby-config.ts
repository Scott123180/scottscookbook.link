module.exports = {
  siteMetadata: {
    title: `Scott's Cookbook`,
    description: `A minimal and mobile friendly recipe website`,
    author: `Scott Hansen`,
    siteUrl: `https://scottscookbook.link`
  },
  plugins: [
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [
            {
              resolve: 'gatsby-remark-relative-images',
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 590,
              },
            },
            {
              resolve: `gatsby-plugin-manifest`,
              options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`, // This path is relative to the root of the site.
              },
            },
            {
              resolve: 'gatsby-plugin-sharp',
              options: {
                defaultQuality: 50
              },
            },
          ]
        }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-csv`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

