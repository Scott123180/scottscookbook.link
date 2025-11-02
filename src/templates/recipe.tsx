import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Grid from "@mui/material/Grid";
import Layout from "../components/Layout";
import { FormGroup, Typography, Switch, Stack, Select, MenuItem } from "@mui/material";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import IngredientTable from "../components/IngredientTable";

// ---------- Types that match your GraphQL shape ----------
type Ingredient = {
  name: string;
  preparation?: string | null;
  amount?: string | number | null;
  unit?: string | null;
  section: string;
  metric?: string | null; // optional
};

type Frontmatter = {
  title: string;
  date?: string | null;
  prepTime?: string | null;
  cookingTime?: string | null;
  totalTime?: string | null;
  originalLink?: string | null;
  ingredients: Ingredient[];
  directions: string[];
  image?: {
    childImageSharp?: {
      gatsbyImageData: IGatsbyImageData;
    } | null;
  } | null;
};

type RecipeQueryData = {
  markdownRemark: {
    html: string;
    frontmatter: Frontmatter;
  };
};

// ---------- Small presentational helpers ----------
const RecipeLinkElement: React.FC<{ link?: string | null }> = ({ link }) => {
  if (link && link.trim() !== "") {
    return (
      <p>
        <a href={link} target="_blank" rel="noreferrer">
          Inspiring Recipe
        </a>
      </p>
    );
  }
  return <div />;
};

type Provider = "AMAZON_FRESH" | "INSTACART" | "WALMART_GROCERY" | "WHOLE_FOODS";

const ShoppingProvider: React.FC<{
  shoppingProvider: Provider;
  enabled: boolean;
  handleChange: (value: Provider) => void;
}> = ({ shoppingProvider, enabled, handleChange }) => {
  if (!enabled) return <div />;

  return (
    <Select
      value={shoppingProvider}
      onChange={(event) => handleChange(event.target.value as Provider)}
      size="small"
    >
      <MenuItem value={"AMAZON_FRESH"}>Amazon Fresh</MenuItem>
      <MenuItem value={"INSTACART"}>Instacart</MenuItem>
      <MenuItem value={"WALMART_GROCERY"}>Walmart Grocery</MenuItem>
      <MenuItem value={"WHOLE_FOODS"}>Whole Foods</MenuItem>
    </Select>
  );
};

// ---------- Page Component ----------
const Recipe: React.FC<PageProps<RecipeQueryData>> = ({ data }) => {
  const post = data.markdownRemark;
  const fm = post.frontmatter;

  // Local UI state
  const [shoppingModeToggled, setShoppingModeToggled] = React.useState<boolean>(false);
  const [shoppingProvider, setShoppingProvider] = React.useState<Provider>("AMAZON_FRESH");

  // Group ingredients by section
  const sections = React.useMemo(() => {
    const map = new Map<string, Ingredient[]>();
    for (const ing of fm.ingredients) {
      const key = ing.section || "Ingredients";
      const arr = map.get(key);
      if (arr) arr.push(ing);
      else map.set(key, [ing]);
    }
    return map;
  }, [fm.ingredients]);

  // Build section grids (Map.forEach gives (value, key))
  const ingredients = (
    <div>
      {Array.from(sections.entries()).map(([sectionName, items]) => (
        <Grid container spacing={2} className="ingredients" key={`sec-${sectionName}`}>
          <Grid item xs={1} md={2} />
          <Grid item xs={10} md={8}>
            <IngredientTable
              data={items}
              shoppingModeToggled={shoppingModeToggled}
              shoppingProvider={shoppingProvider}
            />
          </Grid>
          <Grid item xs={1} md={2} />
        </Grid>
      ))}
    </div>
  );

  const directions = (
    <ol>
      {fm.directions.map((step, idx) => (
        <li className="direction" key={`dir-${idx}`}>
          {step}
        </li>
      ))}
    </ol>
  );

  const imageData = getImage(fm.image?.childImageSharp?.gatsbyImageData as IGatsbyImageData | undefined);

  return (
    <Layout>
      <div className="post-page-container">
        <div className="post-page-flex-container">
          <div className="post-content-container">
            <h1>{fm.title}</h1>
            <h4 style={{ color: "rgb(165, 164, 164)", fontSize: "0.8em" }}>
              Published: {fm.date ?? "—"} | Total Time: {fm.totalTime ?? "—"}
            </h4>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10%",
                marginRight: "10%",
              }}
            >
              {imageData && <GatsbyImage image={imageData} alt={fm.title || "Recipe image"} />}
            </div>
            <p>* recipe image may have been created by generative AI</p>
            <br />

            <FormGroup>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Shopping Mode</Typography>
                <Switch
                  inputProps={{ "aria-label": "Shopping Mode" }}
                  onChange={(_, value) => setShoppingModeToggled(value)}
                  checked={shoppingModeToggled}
                />
                <ShoppingProvider
                  shoppingProvider={shoppingProvider}
                  enabled={shoppingModeToggled}
                  handleChange={(value) => setShoppingProvider(value)}
                />
              </Stack>
            </FormGroup>

            <h4>Ingredients</h4>
            {ingredients}

            <h4>Directions</h4>
            {directions}

            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <RecipeLinkElement link={fm.originalLink} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Recipe;

// ---------- GraphQL (unchanged) ----------
export const query = graphql`
  query PostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        prepTime
        cookingTime
        totalTime
        originalLink
        ingredients {
          name
          preparation
          amount
          unit
          section
          metric
        }
        directions
        image {
          childImageSharp {
            gatsbyImageData(width: 1000, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;