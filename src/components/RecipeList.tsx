// src/components/RecipeList.tsx
import * as React from "react";
import { Link } from "gatsby";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  Rating,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerIcon from "@mui/icons-material/Timer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

/** ---------- helpers ---------- */
const normalize = (s: any) => (s ?? "").toString().trim().toLowerCase();
const getFMFromEdge = (e: any) => e?.node?.frontmatter ?? {};
const num = (x: any, d = 0) => (typeof x === "number" ? x : Number(x) || d);
const dateNum = (d: any) => (d ? new Date(d as any).getTime() : 0);

// comparators use edge.node.frontmatter
const SORTS: Record<string, (a: any, b: any) => number> = {
  rating: (a, b) => num(getFMFromEdge(b).scottRating) - num(getFMFromEdge(a).scottRating),
  dateNew: (a, b) => dateNum(getFMFromEdge(b).date) - dateNum(getFMFromEdge(a).date),
  dateOld: (a, b) => dateNum(getFMFromEdge(a).date) - dateNum(getFMFromEdge(b).date),
  title: (a, b) =>
    normalize(getFMFromEdge(a).title).localeCompare(
      normalize(getFMFromEdge(b).title),
      undefined,
      { sensitivity: "base" }
    ),
};

function getTopics(edges: any[]) {
  const set = new Set<string>();
  edges.forEach((e) => {
    const t = getFMFromEdge(e).topic;
    if (t) set.add(t);
  });
  return Array.from(set);
}

/** ---------- component ---------- */
export default function RecipeList({ data }: { data: { edges: any[] } }) {
  const rawEdges = data?.edges ?? [];

  const edges = React.useMemo(
    () => rawEdges.filter((e) => e?.node?.frontmatter && getFMFromEdge(e).title),
    [rawEdges]
  );

  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("rating");
  const [activeTopic, setActiveTopic] = React.useState("all");

  const topics = React.useMemo(() => ["all", ...getTopics(edges)], [edges]);

  const filtered = React.useMemo(() => {
    const q = normalize(query);
    return edges
      .filter((e) => {
        const fm = getFMFromEdge(e);
        const matchesQuery =
          !q || normalize(fm.title).includes(q) || normalize(fm.topic).includes(q);
        const matchesTopic = activeTopic === "all" || fm.topic === activeTopic;
        return matchesQuery && matchesTopic;
      })
      .slice()
      .sort(SORTS[sortBy] || SORTS.rating);
  }, [edges, query, sortBy, activeTopic]);

  const handleSortChange = (e: SelectChangeEvent<string>) => setSortBy(e.target.value as string);

  return (
    <Box>
      {/* Controls */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <TextField
          placeholder="Search recipes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          sx={{ minWidth: 260 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Sort:
          </Typography>
          <Select size="small" value={sortBy} onChange={handleSortChange}>
            <MenuItem value="rating">Rating (high → low)</MenuItem>
            <MenuItem value="dateNew">Date (newest)</MenuItem>
            <MenuItem value="dateOld">Date (oldest)</MenuItem>
            <MenuItem value="title">Title (A→Z)</MenuItem>
          </Select>
        </Stack>
      </Stack>

      {/* Topic filters */}
      {topics.length > 1 && (
        <ToggleButtonGroup
          exclusive
          value={activeTopic}
          onChange={(_, v) => v && setActiveTopic(v)}
          size="small"
          sx={{ mb: 3, flexWrap: "wrap" }}
        >
          {topics.map((t) => (
            <ToggleButton key={t} value={t}>
              {t === "all" ? "All" : t}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}

      {/* Grid of recipe cards */}
      <Grid container spacing={2}>
        {filtered.map((e) => {
          const fm = getFMFromEdge(e);
          const slug = e?.node?.fields?.slug ?? "/";
          const key = e?.node?.id || slug;
          const title = fm.title ?? "Untitled recipe";
          const ratingValue = num(fm.scottRating);

          const imgData = getImage(fm.image?.childImageSharp?.gatsbyImageData);

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
              <Card variant="outlined" sx={{ height: "100%", overflow: "hidden" }}>
                <CardActionArea component={Link as any} to={slug} sx={{ height: "100%" }}>
                  {/* Thumbnail */}
                  {imgData ? (
                    <Box sx={{ aspectRatio: "1 / 1", overflow: "hidden" }}>
                      <GatsbyImage
                        image={imgData}
                        alt={title}
                        style={{ width: "100%", height: "100%" }}
                        imgStyle={{ objectFit: "cover" }}
                      />
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        aspectRatio: "1 / 1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.100",
                      }}
                    >
                      <Typography variant="h3" component="span" role="img" aria-label="frying pan">
                        🍳
                      </Typography>
                    </Box>
                  )}

                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {title}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {fm.totalTime && (
                        <Chip size="small" icon={<AccessTimeIcon />} label={fm.totalTime} variant="outlined" />
                      )}
                      {fm.prepTime && (
                        <Chip size="small" icon={<TimerIcon />} label={`Prep ${fm.prepTime}`} variant="outlined" />
                      )}
                      {fm.date && (
                        <Chip
                          size="small"
                          icon={<CalendarMonthIcon />}
                          label={new Date(fm.date).toLocaleDateString()}
                          variant="outlined"
                        />
                      )}
                      {fm.topic && <Chip size="small" label={fm.topic} />}
                    </Stack>

                    <Box sx={{ mt: "auto", pt: 1 }}>
                      <Rating value={ratingValue} precision={0.5} readOnly size="small" />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}

        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Box
              sx={{
                py: 6,
                textAlign: "center",
                color: "text.secondary",
                border: "1px dashed",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" sx={{ mb: 0.5 }}>
                No recipes found
              </Typography>
              <Typography variant="body2">Try clearing filters or searching a different term.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
