import * as React from "react";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type Provider = "AMAZON_FRESH" | "INSTACART" | "WALMART_GROCERY" | "WHOLE_FOODS";

type Ingredient = {
  name: string;
  preparation?: string | null;
  amount?: string | number | null;
  unit?: string | null;
  section: string;
  metric?: string | null;
};

type Props = {
  data: Ingredient[];
  shoppingModeToggled: boolean;
  shoppingProvider: Provider;
};

const formQueryString = (s: string) => s.replace(/\s/g, "+");

const shoppingUrl = (itemName: string, provider: Provider): string | undefined => {
  switch (provider) {
    case "AMAZON_FRESH":
      return "https://www.amazon.com/s?k=" + formQueryString(itemName) + "&i=amazonfresh";
    case "INSTACART":
      return "https://www.instacart.com/store/search/" + itemName;
    case "WALMART_GROCERY":
      return "https://www.walmart.com/search?q=" + itemName;
    case "WHOLE_FOODS":
      return "https://www.amazon.com/s?k=" + formQueryString(itemName) + "&i=wholefoods";
    default:
      return undefined;
  }
};

const IngredientTable: React.FC<Props> = ({
  data,
  shoppingModeToggled,
  shoppingProvider,
}) => {
  if (!data || data.length === 0) return null;

  const section = data[0]?.section ?? "Ingredients";

  return (
    <Box>
      {/* Section header (replaces table caption) */}
      <Typography
        variant="subtitle2"
        sx={{ color: "text.secondary", px: 2, pt: 2, pb: 1 }}
      >
        {section}
      </Typography>
      <Divider />

      {/* Flat list with subtle row borders; no extra Paper/padding */}
      <List disablePadding>
        {data.map((ingredient, idx) => {
          const href =
            shoppingModeToggled && ingredient.name
              ? shoppingUrl(ingredient.name, shoppingProvider)
              : undefined;

          return (
            <ListItem
              key={`${section}.${ingredient.name}.${idx}`}
              sx={{
                px: 2,
                py: { xs: 1.0, md: 0.9 },
                borderBottom:
                  idx === data.length - 1 ? "none" : "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {/* Left “icon” column with fixed width so layout doesn’t jump when toggled */}
              <Box
                sx={{
                  width: 36,
                  display: "flex",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {href && (
                  <IconButton
                    size="small"
                    component="a"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Shop for ${ingredient.name}`}
                  >
                    <AddShoppingCartIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              {/* Main text */}
              <ListItemText
                disableTypography
                primary={
                  <Typography variant="body1">
                    <strong>{ingredient.amount}</strong>{" "}
                    {ingredient.unit}{" "}
                    {ingredient.metric && (
                      <>
                        (<em>{ingredient.metric}</em>){" "}
                      </>
                    )}
                    {ingredient.name}
                    {ingredient.preparation && <> {ingredient.preparation}</>}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default IngredientTable;