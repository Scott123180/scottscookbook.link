import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Grid from "@mui/material/Grid";
import { FormGroup, Typography, Switch, Stack, Select, MenuItem, Container, Box, Card, CardContent, Divider, Paper} from "@mui/material";
import {  } from "@mui/material";
import { getImage, IGatsbyImageData } from "gatsby-plugin-image";

import Layout from "../components/Layout";
import RecipeImage from "../components/RecipeImage";
import IngredientTable from "../components/IngredientTable";
import RecipeMetaChips from "../components/RecipeMetaChips";
import { setCookie, getCookie } from "../utils/cookies";

const COOKIE_ENABLED = "sc_shopping_enabled";
const COOKIE_PROVIDER = "sc_shopping_provider";

type Provider = "AMAZON_FRESH" | "INSTACART" | "WALMART_GROCERY" | "WHOLE_FOODS";
const PROVIDERS: Provider[] = ["AMAZON_FRESH","INSTACART","WALMART_GROCERY","WHOLE_FOODS"];

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


  React.useEffect(() => {
    // enabled
    const enabled = getCookie(COOKIE_ENABLED);
    if (enabled === "1" || enabled === "0") {
      setShoppingModeToggled(enabled === "1");
    }
    // provider (validate)
    const savedProvider = getCookie(COOKIE_PROVIDER) as Provider | null;
    if (savedProvider && (PROVIDERS as string[]).includes(savedProvider)) {
      setShoppingProvider(savedProvider as Provider);
    }
  }, []);

  React.useEffect(() => {
    setCookie(COOKIE_ENABLED, shoppingModeToggled ? "1" : "0");
  }, [shoppingModeToggled]);

  React.useEffect(() => {
    setCookie(COOKIE_PROVIDER, shoppingProvider);
  }, [shoppingProvider]);

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
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      {/* Hero */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1 }}>
          {fm.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Published: {fm.date ?? "—"}
        </Typography>
        <RecipeImage imageData={imageData!} title={fm.title} />
        <Box sx={{ mt: 2 }}>
        <RecipeMetaChips
          totalTime={fm.totalTime}
          prepTime={fm.prepTime}
          cookingTime={fm.cookingTime}
          originalLink={fm.originalLink}
          shopping={{
            enabled: shoppingModeToggled,
            provider: shoppingProvider,
            onToggle: setShoppingModeToggled,
            onProviderChange: setShoppingProvider,
          }}
        />


        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Left column: Ingredients & Directions */}
        <Grid item xs={12} md={8}>
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                Ingredients
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* your grouped ingredients UI */}
              {ingredients}
            </CardContent>
          </Card>

          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                Directions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {directions}
            </CardContent>
          </Card>

          {/* Optional: original HTML content block */}
          {post.html && (
            <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2, md: 3 } }}>
              <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </Paper>
          )}
        </Grid>

        {/* Right column: sticky utilities */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: { md: 24 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
          </Box>
        </Grid>
      </Grid>
    </Container>
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