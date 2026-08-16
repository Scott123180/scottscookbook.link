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
import SearchIcon from "@mui/icons-material/Search";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { matchSorter, matchSorterWithRankInfo } from "match-sorter";

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
    const byTopic = edges.filter((e) => {
      const fm = getFMFromEdge(e);
      return activeTopic === "all" || fm.topic === activeTopic;
    });

    const q = query.trim();
    const sortFn = SORTS[sortBy] || SORTS.rating;

    if (!q) return byTopic.slice().sort(sortFn);

    // Rank each field independently so field priority (title > topic > ingredients >
    // directions) always wins, regardless of match quality within a field. A single
    // matchSorter call across all keys can't guarantee this: it flattens array keys
    // (one entry per ingredient/direction) and ranks purely by string-match quality, so
    // e.g. an ingredient named exactly "Lemon" (an EQUAL match) would outrank a title
    // like "Lemon-Garlic Lima Beans" (only a STARTS_WITH match) — backwards from what a
    // user searching "lemon" would expect.
    //
    // Require a real substring match (not match-sorter's fuzzy "characters in order"
    // MATCHES ranking) on every field. Fuzzy matching sounds helpful for typos, but in
    // practice it matches scattered letters across an entire string — e.g. searching
    // "lemon" fuzzy-matches "Re[st]aurant-[st]y[l]e Miso Ram[en]" purely because
    // l-e-m-o-n appears somewhere in order. That produces exactly the "why are all these
    // unrelated recipes showing up" confusion a search box should avoid.
    const fields: { key: (e: any) => string | string[]; threshold: number }[] = [
      { key: (e) => getFMFromEdge(e).title, threshold: matchSorter.rankings.CONTAINS },
      { key: (e) => getFMFromEdge(e).topic, threshold: matchSorter.rankings.CONTAINS },
      {
        key: (e) => (getFMFromEdge(e).ingredients ?? []).map((i: any) => i?.name),
        threshold: matchSorter.rankings.CONTAINS,
      },
      {
        key: (e) => getFMFromEdge(e).directions ?? [],
        threshold: matchSorter.rankings.CONTAINS,
      },
    ];

    const bestByItem = new Map<any, { fieldIndex: number; rank: number }>();
    fields.forEach((field, fieldIndex) => {
      matchSorterWithRankInfo(byTopic, q, { keys: [field] }).forEach(({ item, rank }) => {
        if (!bestByItem.has(item)) bestByItem.set(item, { fieldIndex, rank });
      });
    });

    return Array.from(bestByItem.entries())
      .sort(([itemA, a], [itemB, b]) =>
        a.fieldIndex - b.fieldIndex || b.rank - a.rank || sortFn(itemA, itemB)
      )
      .map(([item]) => item);
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
          placeholder="Search title, ingredient, or step…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size="small"
          sx={{
            minWidth: 260,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              bgcolor: "#fff",
              "& fieldset": { borderColor: "#ddd3bf" },
              "&:hover fieldset": { borderColor: "#c9bda0" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" sx={{ color: "#5a5348", fontFamily: "'Public Sans', sans-serif" }}>
            Sort:
          </Typography>
          <Select
            size="small"
            value={sortBy}
            onChange={handleSortChange}
            sx={{
              borderRadius: "8px",
              bgcolor: "#fff",
              fontWeight: 600,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd3bf" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#c9bda0" },
            }}
          >
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
          sx={{
            mb: 3,
            flexWrap: "wrap",
            gap: 1,
            "& .MuiToggleButtonGroup-grouped": {
              border: "1px solid #ddd3bf !important",
              borderRadius: "999px !important",
              margin: 0,
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "'Public Sans', sans-serif",
              color: "#5a5348",
              paddingLeft: "16px",
              paddingRight: "16px",
              "&.Mui-selected": {
                bgcolor: "#4a7c3f",
                color: "#fff",
                borderColor: "#4a7c3f",
              },
              "&.Mui-selected:hover": {
                bgcolor: "#3f6b35",
              },
            },
          }}
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
              <Card
                sx={{
                  height: "100%",
                  overflow: "hidden",
                  borderRadius: 3,
                  boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.2s",
                  "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
                }}
              >
                <CardActionArea component={Link as any} to={slug} sx={{ height: "100%" }}>
                  {/* Thumbnail */}
                  <Box sx={{ aspectRatio: "4 / 3", overflow: "hidden", position: "relative" }}>
                    {imgData ? (
                      <GatsbyImage
                        image={imgData}
                        alt={title}
                        style={{ width: "100%", height: "100%" }}
                        imgStyle={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
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
                    {fm.topic && (
                      <Chip
                        size="small"
                        label={fm.topic}
                        sx={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          bgcolor: "rgba(255,253,249,0.92)",
                          color: "#1f2a1f",
                          fontWeight: 700,
                          fontSize: 11,
                          fontFamily: "'Public Sans', sans-serif",
                        }}
                      />
                    )}
                  </Box>

                  <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography variant="h6" sx={{ lineHeight: 1.25 }}>
                      {title}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" alignItems="center" justifyContent="space-between">
                      {fm.totalTime && (
                        <Chip
                          size="small"
                          icon={<AccessTimeIcon sx={{ fontSize: 14 }} />}
                          label={fm.totalTime}
                          variant="outlined"
                          sx={{
                            border: "none",
                            bgcolor: "transparent",
                            color: "#8a8375",
                            fontFamily: "'Public Sans', sans-serif",
                            "& .MuiChip-label": { px: 0.5 },
                          }}
                        />
                      )}
                      <Rating
                        value={ratingValue}
                        precision={0.5}
                        readOnly
                        size="small"
                        sx={{ color: "#b8552f", ml: "auto" }}
                      />
                    </Stack>
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
