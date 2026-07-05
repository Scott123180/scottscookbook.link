/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */


const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const fs = require(`fs`)
const { validateRecipeFile } = require(`./src/utils/recipeValidation`)

const RECIPES_DIR = path.join(__dirname, `src`, `content`, `recipes`)

exports.onPreBootstrap = () => {
  const files = fs.readdirSync(RECIPES_DIR).filter((f: string) => f.endsWith(`.md`))
  const failures: { file: string; message: string }[] = []

  files.forEach((file: string) => {
    const fullPath = path.join(RECIPES_DIR, file)
    const content = fs.readFileSync(fullPath, `utf8`)
    const result = validateRecipeFile(file, content)

    if (result.parseError) {
      failures.push({ file, message: `YAML parse error: ${result.parseError}` })
    } else if (result.issues.length > 0) {
      const details = result.issues.map((i: { field: string; message: string }) => `${i.field}: ${i.message}`).join(`\n    `)
      failures.push({ file, message: details })
    }
  })

  if (failures.length > 0) {
    const report = failures.map(f => `  ${f.file}\n    ${f.message}`).join(`\n\n`)
    throw new Error(
      `\n\nRecipe validation failed for ${failures.length} file(s) — these would otherwise silently vanish from the site:\n\n${report}\n\nFix the frontmatter above (see reference/recipe-spec.md) and restart. Run "npm run validate:recipes -- <file>" to re-check a single file.\n`
    )
  }
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`{
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }`).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/recipe.tsx`),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }

    type MarkdownRemarkFrontmatter {
      title: String
      date: Date @dateformat
      prepTime: String
      cookingTime: String
      totalTime: String
      originalLink: String
      servings: String
      ingredients: [MarkdownRemarkFrontmatterIngredients]
      directions: [String]
      image: File @fileByRelativePath
    }

    type MarkdownRemarkFrontmatterIngredients @dontInfer {
      name: String
      preparation: String
      amount: String
      unit: String
      section: String
      metric: String
    }
  `)
}
