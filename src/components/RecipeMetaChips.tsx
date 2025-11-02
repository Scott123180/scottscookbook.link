import * as React from "react";
import { Chip, Stack, Link } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import LaunchIcon from "@mui/icons-material/Launch";

interface Props {
  totalTime?: string | null;
  prepTime?: string | null;
  cookingTime?: string | null;
  originalLink?: string | null;
}

const RecipeMetaChips: React.FC<Props> = ({ totalTime, prepTime, cookingTime, originalLink }) => {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {totalTime && <Chip icon={<AccessTimeIcon />} label={`Total: ${totalTime}`} variant="outlined" />}
      {prepTime && <Chip icon={<TimerIcon />} label={`Prep: ${prepTime}`} variant="outlined" />}
      {cookingTime && <Chip icon={<HourglassBottomIcon />} label={`Cook: ${cookingTime}`} variant="outlined" />}
      {originalLink && (
        <Chip
          label={<Link href={originalLink} target="_blank" rel="noreferrer" underline="hover">Inspiring Recipe</Link>}
          variant="outlined"
          onClick={() => window.open(originalLink, "_blank", "noreferrer")}
          onDelete={() => window.open(originalLink, "_blank", "noreferrer")}
          deleteIcon={<LaunchIcon />}
        />
      )}
    </Stack>
  );
};

export default RecipeMetaChips;
