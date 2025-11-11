import * as React from "react";
import { Chip, Tooltip } from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";        // “sleep” icon
import PowerIcon from "@mui/icons-material/PowerSettingsNew";
import { useWakeLock } from "../hooks/useWakeLock";

export default function CookingModeToggle() {
  const { isActive, enable, disable } = useWakeLock();

  const handleClick = async () => {
    if (isActive) await disable();
    else await enable();
  };

  return (
    <Tooltip
      title={isActive ? "Cooking Mode ON — screen will stay awake" : "Cooking Mode OFF — may auto-lock"}
      arrow
    >
      <Chip
        icon={isActive ? <PowerIcon /> : <HotelIcon />}
        label={isActive ? "Cooking Mode: On" : "Cooking Mode: Off"}
        color={isActive ? "success" : "default"}
        variant={isActive ? "filled" : "outlined"}
        onClick={handleClick}
      />
    </Tooltip>
  );
}
