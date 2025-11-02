import * as React from "react";
import {
  Chip,
  Stack,
  Link,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LaunchIcon from "@mui/icons-material/Launch";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Provider =
  | "AMAZON_FRESH"
  | "INSTACART"
  | "WALMART_GROCERY"
  | "WHOLE_FOODS";

interface Props {
  totalTime?: string | null;
  prepTime?: string | null;
  cookingTime?: string | null;
  originalLink?: string | null;
  shopping?: {
    enabled: boolean;
    provider: Provider;
    onToggle: (enabled: boolean) => void;
    onProviderChange: (p: Provider) => void;
  };
}

const providerLabel = (p: Provider) => {
  switch (p) {
    case "AMAZON_FRESH":
      return "Amazon Fresh";
    case "INSTACART":
      return "Instacart";
    case "WALMART_GROCERY":
      return "Walmart Grocery";
    case "WHOLE_FOODS":
      return "Whole Foods";
  }
};

// ...imports stay the same

const RecipeMetaChips: React.FC<Props> = ({
  totalTime,
  prepTime,
  cookingTime,
  originalLink,
  shopping,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const providerMenuOpen = Boolean(anchorEl);

  const openProviderMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const closeProviderMenu = () => setAnchorEl(null);

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {totalTime && (
        <Chip
          icon={<AccessTimeIcon />}
          label={`Total: ${totalTime}`}
          variant="outlined"
        />
      )}
      {prepTime && (
        <Chip
          icon={<TimerIcon />}
          label={`Prep: ${prepTime}`}
          variant="outlined"
        />
      )}
      {cookingTime && (
        <Chip
          icon={<HourglassBottomIcon />}
          label={`Cook: ${cookingTime}`}
          variant="outlined"
        />
      )}
      {originalLink && (
        <Chip
          label={
            <Link
              href={originalLink}
              target="_blank"
              rel="noreferrer"
              underline="hover"
            >
              Inspiring Recipe
            </Link>
          }
          variant="outlined"
          onClick={() => window.open(originalLink, "_blank", "noreferrer")}
          onDelete={() => window.open(originalLink, "_blank", "noreferrer")}
          deleteIcon={<LaunchIcon />}
        />
      )}

      {shopping && (
        <>
          <Tooltip
            title={
              shopping.enabled
                ? "Shopping is ON (click to turn OFF). Click ▾ to change provider."
                : "Shopping is OFF (click to turn ON). Click ▾ to pick a provider and turn ON."
            }
            arrow
          >
            <Chip
              icon={<AddShoppingCartIcon />}
              label={
                shopping.enabled
                  ? `Shopping: ${providerLabel(shopping.provider)}`
                  : "Shopping: Disabled"
              }
              variant={shopping.enabled ? "filled" : "outlined"}
              color={shopping.enabled ? "primary" : "default"}
              onClick={() => shopping.onToggle(!shopping.enabled)} // toggle ON/OFF
              onDelete={openProviderMenu} // open provider menu
              deleteIcon={<ExpandMoreIcon />}
              aria-label={`Shopping mode (${
                shopping.enabled ? "on" : "off"
              }). Provider: ${
                shopping.enabled ? providerLabel(shopping.provider) : "Disabled"
              }.`}
            />
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={providerMenuOpen}
            onClose={closeProviderMenu}
          >
            {(
              [
                "AMAZON_FRESH",
                "INSTACART",
                "WALMART_GROCERY",
                "WHOLE_FOODS",
              ] as Provider[]
            ).map((p) => (
              <MenuItem
                key={p}
                selected={shopping.provider === p}
                onClick={() => {
                  // If currently OFF, enable first
                  if (!shopping.enabled) shopping.onToggle(true);
                  shopping.onProviderChange(p);
                  closeProviderMenu();
                }}
              >
                <ListItemIcon>
                  <AddShoppingCartIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>{providerLabel(p)}</ListItemText>
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Stack>
  );
};

export default RecipeMetaChips;
