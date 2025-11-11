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
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useWakeLock } from "../hooks/useWakeLock";

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

  // ✅ Cooking Mode (wake lock)
  const { isActive: cookingMode, enable, disable } = useWakeLock();

  const toggleCookingMode = async () => {
    if (cookingMode) await disable();
    else await enable();
  };
  // Remember state for wake lock
  React.useEffect(() => {
    const last = localStorage.getItem("sc_cooking_mode");
    if (last === "1") enable().catch(() => {});
  }, [enable]);

  React.useEffect(() => {
    localStorage.setItem("sc_cooking_mode", cookingMode ? "1" : "0");
  }, [cookingMode]);

  return (
    <Stack
      direction="row"
      spacing={1}
      flexWrap="wrap"
      useFlexGap
      sx={{
        gap: 1, // adds both row and column spacing (unlike spacing={1}, which only affects one axis)
        rowGap: 1.5, // a bit extra vertical breathing room when wrapping
        alignItems: "center",
      }}
    >
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

      {/* Shopping Chip */}
      {shopping && (
        <>
          <Tooltip
            title={
              shopping.enabled
                ? "Shopping mode is ON (click to turn OFF)"
                : "Shopping mode is OFF (click to turn ON)"
            }
            arrow
          >
            <Chip
              icon={<AddShoppingCartIcon />}
              label={`Shopping: ${
                shopping.enabled ? providerLabel(shopping.provider) : "Disabled"
              }`}
              variant={shopping.enabled ? "filled" : "outlined"}
              color={shopping.enabled ? "primary" : "default"}
              onClick={() => shopping.onToggle(!shopping.enabled)}
              onDelete={openProviderMenu}
              deleteIcon={<ExpandMoreIcon />}
              aria-label={`Shopping mode (${
                shopping.enabled ? "on" : "off"
              }). Provider: ${providerLabel(shopping.provider)}.`}
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

      {/* ✅ Cooking Mode Chip */}
      <Tooltip
        title={
          cookingMode
            ? "Cooking Mode ON — screen will stay awake"
            : "Cooking Mode OFF — may auto-lock"
        }
        arrow
      >
        <Chip
          icon={<PowerSettingsNewIcon />}
          label={cookingMode ? "Cooking Mode: On" : "Cooking Mode: Off"}
          color={cookingMode ? "success" : "default"}
          variant={cookingMode ? "filled" : "outlined"}
          onClick={toggleCookingMode}
        />
      </Tooltip>
    </Stack>
  );
};

export default RecipeMetaChips;
