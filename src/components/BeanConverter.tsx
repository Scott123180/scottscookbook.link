import * as React from "react";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Alert,
  Stack,
  Chip,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// ===== Constants =====
const IMPERIAL = "imperial" as const;
const METRIC = "metric" as const;
type System = typeof IMPERIAL | typeof METRIC;

type BeanRow = {
  name: string;
  cookedG: number;
  cannedG: number;
  dryG: number;
  cookedMl: number;
  dryMl: number;
  source: "seriousEats" | "mine" | string;
};

const beanMap = new Map<number, BeanRow>([
  [
    1,
    {
      name: "Black",
      dryG: 454.0,
      cookedG: 1048.93,
      cannedG: 1748.22,
      cookedMl: 1656.12,
      dryMl: 610.29,
      source: "seriousEats",
    },
  ],
  [
    2,
    {
      name: "Chickpeas / Garbanzo",
      dryG: 454.0,
      cookedG: 1474.175,
      cannedG: 2456.96324725,
      cookedMl: 1656.12,
      dryMl: 767.221864,
      source: "seriousEats",
    },
  ],
  [
    3,
    {
      name: "Pinto",
      dryG: 454.0,
      cookedG: 1048.93236,
      cannedG: 1748.2240964412001,
      cookedMl: 1537.82,
      dryMl: 767.221864,
      source: "seriousEats",
    },
  ],
  [
    4,
    {
      name: "Kidney",
      dryG: 454.0,
      cookedG: 1105.6314,
      cannedG: 1842.722685438,
      cookedMl: 1537.82,
      dryMl: 639.3515533333334,
      source: "seriousEats",
    },
  ],
  [
    5,
    {
      name: "Cannellini",
      dryG: 454.0,
      cookedG: 1133.98,
      cannedG: 1889.9704466,
      cookedMl: 1537.82,
      dryMl: 706.6517168421052,
      source: "seriousEats",
    },
  ],
  [
    6,
    {
      name: "Black-Eyed Peas",
      dryG: 454.0,
      cookedG: 1275.72854,
      cannedG: 2126.2184857618004,
      cookedMl: 1537.82,
      dryMl: 767.221864,
      source: "seriousEats",
    },
  ],
]);

const beanOptions = Array.from(beanMap, ([id, v]) => ({ id, label: v.name }));

type Style = "dried" | "canned" | "cooked";
type Unit = "grams" | "ml" | "cups" | "fluidOunce" | "ounce";

// ===== Conversions (your originals, organized) =====
const fromCups = (cups: number) => cups * 236.588;
const toCups = (ml: number) => ml / 236.588;
const fromFlOz = (floz: number) => fromCups(floz) / 8;
const toFlOz = (ml: number) => toCups(ml) * 8;
const fromOz = (oz: number) => oz * 28.3495;
const toOz = (g: number) => g / 28.3495;

function convertToDriedBeansG(
  mapEntry: BeanRow,
  qty: number,
  style: Style,
  unit: Unit
) {
  let fluidRatio: number | null;
  let weightRatio: number;

  if (style === "dried") {
    fluidRatio = mapEntry.dryG / mapEntry.dryMl;
    weightRatio = 1;
  } else if (style === "cooked") {
    fluidRatio = mapEntry.dryG / mapEntry.cookedMl;
    weightRatio = mapEntry.dryG / mapEntry.cookedG;
  } else {
    // canned
    fluidRatio = null;
    weightRatio = mapEntry.dryG / mapEntry.cannedG;
  }

  switch (unit) {
    case "cups":
      return fromCups(qty) * (fluidRatio ?? 0);
    case "fluidOunce":
      return fromFlOz(qty) * (fluidRatio ?? 0);
    case "ml":
      return qty * (fluidRatio ?? 0);
    case "ounce":
      return fromOz(qty) * weightRatio;
    case "grams":
    default:
      return qty * weightRatio;
  }
}

function convertDriedBeansToAll(mapEntry: BeanRow, driedG: number) {
  // cooked
  const cookedG = (mapEntry.cookedG / mapEntry.dryG) * driedG;
  const cookedMl = (mapEntry.cookedMl / mapEntry.dryG) * driedG;
  const cooked = {
    g: Math.round(cookedG),
    ml: Math.round(cookedMl),
    cups: toCups(cookedMl).toFixed(3),
    oz: toOz(cookedG).toFixed(3),
    fl: toFlOz(cookedMl).toFixed(3),
  };

  // dried
  const driedMl = (mapEntry.dryMl / mapEntry.dryG) * driedG;
  const dried = {
    g: Math.round(driedG),
    ml: Math.round(driedMl),
    cups: toCups(driedMl).toFixed(3),
    oz: toOz(driedG).toFixed(3),
    fl: toFlOz(driedMl).toFixed(3),
  };

  // canned
  const cannedG = (mapEntry.cannedG / mapEntry.dryG) * driedG;
  const canned = { g: Math.round(cannedG), oz: toOz(cannedG).toFixed(3) };

  return { cooked, dried, canned };
}

// ===== UI =====
export default function BeanConverter() {
  const [system, setSystem] = React.useState<System>(IMPERIAL);
  const [style, setStyle] = React.useState<Style | null>(null);
  const [bean, setBean] = React.useState<{ id: number; label: string } | null>(
    null
  );
  const [qty, setQty] = React.useState<string>("");
  const [unit, setUnit] = React.useState<Unit | "">("");

  const mapEntry = bean ? beanMap.get(bean.id)! : undefined;

  const canUseVolume = style !== "canned"; // canned has no fluid conversions in your model
  const metricUnits: Unit[] = canUseVolume ? ["grams", "ml"] : ["grams"];
  const imperialUnits: Unit[] = canUseVolume
    ? ["ounce", "cups", "fluidOunce"]
    : ["ounce"];

  // 1) Memoize unit choices so they're stable and easy to validate
  const unitChoices = React.useMemo<Unit[]>(() => {
    const metricUnits: Unit[] = canUseVolume ? ["grams", "ml"] : ["grams"];
    const imperialUnits: Unit[] = canUseVolume
      ? ["ounce", "cups", "fluidOunce"]
      : ["ounce"];
    return system === IMPERIAL ? imperialUnits : metricUnits;
  }, [system, canUseVolume]);

  // 2) Ensure a valid unit is always selected
  React.useEffect(() => {
    if (!unit || !unitChoices.includes(unit as Unit)) {
      setUnit(unitChoices[0] ?? ""); // pick first available, or "" if none
    }
  }, [unitChoices, unit]);

  const quantityAsNumber = qty === "" ? NaN : Number(qty);
  const inputValid =
    !!mapEntry &&
    !!style &&
    !!unit &&
    Number.isFinite(quantityAsNumber) &&
    quantityAsNumber >= 0;

  const result =
    inputValid && mapEntry && style && unit
      ? convertDriedBeansToAll(
          mapEntry,
          convertToDriedBeansG(mapEntry, quantityAsNumber, style, unit as Unit)
        )
      : null;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <RestaurantIcon />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Bean Converter
        </Typography>
      </Stack>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
        Convert between dried, cooked, and canned amounts. Pick a bean, style,
        and measurement—get all equivalents instantly.
      </Typography>

      <Grid container spacing={3}>
        {/* Inputs */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Inputs
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Stack spacing={2}>
                {/* System */}
                <Box>
                  <Typography variant="overline">System</Typography>
                  <ToggleButtonGroup
                    value={system}
                    exclusive
                    onChange={(_, v) => v && setSystem(v)}
                    size="small"
                    sx={{ mt: 0.5 }}
                  >
                    <ToggleButton value={IMPERIAL}>Imperial</ToggleButton>
                    <ToggleButton value={METRIC}>Metric</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                {/* Bean */}
                <Autocomplete
                  disablePortal
                  id="bean-combo-box"
                  options={beanOptions}
                  value={bean}
                  onChange={(_, v) => setBean(v)}
                  renderInput={(params) => (
                    <TextField {...params} label="Bean / Legume Type" />
                  )}
                />

                {/* Style */}
                <Box>
                  <Typography variant="overline">Bean Style</Typography>
                  <ToggleButtonGroup
                    value={style}
                    exclusive
                    onChange={(_, v) => setStyle(v)}
                    size="small"
                    sx={{ mt: 0.5, flexWrap: "wrap" }}
                  >
                    <ToggleButton value="dried">Dried</ToggleButton>
                    <ToggleButton value="canned">Canned</ToggleButton>
                    <ToggleButton value="cooked">Cooked</ToggleButton>
                  </ToggleButtonGroup>
                  {style === "canned" && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "text.secondary",
                        mt: 0.5,
                      }}
                    >
                      Canned conversions are weight-based only (no volume).
                    </Typography>
                  )}
                </Box>

                {/* Quantity */}
                <TextField
                  label="Quantity"
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  InputProps={{
                    inputProps: { min: 0, step: "any" },
                    endAdornment: unit ? (
                      <InputAdornment position="end">
                        {prettyUnit(unit)}
                      </InputAdornment>
                    ) : null,
                  }}
                />

                {/* Unit */}
                <Box>
                  <Typography variant="overline">Unit</Typography>
                  <ToggleButtonGroup
                    value={unit}
                    exclusive
                    onChange={(_, v) => setUnit(v)}
                    size="small"
                    sx={{ mt: 0.5, flexWrap: "wrap" }}
                  >
                    {unitChoices.map((u) => (
                      <ToggleButton key={u} value={u}>
                        {prettyUnit(u)}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Results */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                Results
              </Typography>
              <Divider sx={{ mb: 2 }} />

              {!inputValid ? (
                <Alert severity="info">
                  Select a bean, choose style, enter a quantity, and pick a unit
                  to see conversions.
                </Alert>
              ) : (
                <Stack spacing={2}>
                  {/* Quick highlight chips */}
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      label={`Cooked: ${result!.cooked.g} g (${
                        result!.cooked.cups
                      } cups)`}
                      size="small"
                    />
                    <Chip
                      label={`Canned: ${result!.canned.g} g (${
                        result!.canned.oz
                      } oz)`}
                      size="small"
                    />
                    <Chip
                      label={`Dried: ${result!.dried.g} g (${
                        result!.dried.cups
                      } cups)`}
                      size="small"
                    />
                  </Stack>

                  <TableContainer
                    component={Paper}
                    sx={{ borderRadius: 2, overflow: "hidden" }}
                  >
                    <Table size="small" aria-label="bean conversions">
                      <TableBody>
                        {renderRow("Cooked (g)", result!.cooked.g, true)}
                        {renderRow("Cooked (ml)", result!.cooked.ml)}
                        {renderRow("Cooked (cups)", result!.cooked.cups)}
                        {renderRow("Cooked (oz)", result!.cooked.oz)}
                        {renderRow("Cooked (fl oz)", result!.cooked.fl)}
                        <RowDivider />
                        {renderRow("Dried (g)", result!.dried.g, true)}
                        {renderRow("Dried (ml)", result!.dried.ml)}
                        {renderRow("Dried (cups)", result!.dried.cups)}
                        {renderRow("Dried (oz)", result!.dried.oz)}
                        {renderRow("Dried (fl oz)", result!.dried.fl)}
                        <RowDivider />
                        {renderRow("Canned (g)", result!.canned.g, true)}
                        {renderRow("Canned (oz)", result!.canned.oz)}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {mapEntry?.source && (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      Source:{" "}
                      {mapEntry.source === "seriousEats"
                        ? "Serious Eats"
                        : mapEntry.source}
                    </Typography>
                  )}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// ===== Small presentational helpers =====
function prettyUnit(u: Unit | "") {
  switch (u) {
    case "grams":
      return "g";
    case "ml":
      return "mL";
    case "cups":
      return "cups";
    case "fluidOunce":
      return "fl oz";
    case "ounce":
      return "oz";
    default:
      return "";
  }
}

function renderRow(label: string, value: string | number, bold = false) {
  return (
    <TableRow
      sx={{ "&:nth-of-type(odd)": { backgroundColor: "action.hover" } }}
    >
      <TableCell sx={{ fontWeight: bold ? 600 : 400 }}>{label}</TableCell>
      <TableCell
        sx={{
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        }}
      >
        {value}
      </TableCell>
    </TableRow>
  );
}

function RowDivider() {
  return (
    <TableRow>
      <TableCell colSpan={2}>
        <Divider />
      </TableCell>
    </TableRow>
  );
}
