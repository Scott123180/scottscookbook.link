#!/usr/bin/env python3
"""
Recipe YAML frontmatter linter / fixer.

Usage:
    python fix_recipes.py           # dry run — prints proposed changes, writes nothing
    python fix_recipes.py --apply   # apply all safe fixes in place
"""

import difflib
import re
import sys
from pathlib import Path

RECIPES_DIR = Path(__file__).parent / "src" / "content" / "recipes"
DRY_RUN = "--apply" not in sys.argv

VALID_TOPICS = {
    "Soup", "Salad", "Main Dish", "Side Dish",
    "One-Pot", "Sauce", "Snack", "Dessert", "Fermentation", "",
}

TOPIC_MAP = {
    "sides":        "Side Dish",
    "side dish":    "Side Dish",
    "snack":        "Snack",
    "soup":         "Soup",
    "salad":        "Salad",
    "main dish":    "Main Dish",
    "one-pot":      "One-Pot",
    "sauce":        "Sauce",
    "dessert":      "Dessert",
    "fermentation": "Fermentation",
}

UNIT_MAP = {
    # spelled-out → abbreviated
    "tablespoons": "tbsp",
    "tablespoon":  "tbsp",
    "teaspoons":   "tsp",
    "teaspoon":    "tsp",
    "ounces":      "oz",
    # capitalized → lowercase
    "Cups":        "cups",
    "Cup":         "cup",
    "Count":       "count",
    "Medium":      "medium",
    "Large":       "large",
    "Tbsp":        "tbsp",
    "Tsp":         "tsp",
    "Oz":          "oz",
    "Lb":          "lb",
    "Cloves":      "cloves",
    "Stalk":       "stalk",
    "Pinch":       "pinch",
    "To Taste":    "to taste",
    "Sprig":       "sprig",
}


# ── frontmatter parsing ────────────────────────────────────────────────────────

def pre_fix_text(text):
    """Fix raw-text issues that would prevent frontmatter from being parsed.

    ]--- (closing delimiter touching previous content) must be split onto its
    own line before split_frontmatter can locate it.
    """
    # Any non-newline character immediately followed by --- → insert newline
    return re.sub(r'([^\n])(---)', r'\1\n\2', text)


def split_frontmatter(text):
    """Return (frontmatter, body) or (None, text) if no frontmatter found."""
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end == -1:
        return text[3:], None
    return text[3:end], text[end + 4:]


def rejoin(fm, body):
    # Ensure the closing --- is always on its own line
    if not fm.endswith('\n'):
        fm += '\n'
    if body is None:
        return f"---{fm}---"
    return f"---{fm}---{body}"


# ── individual fixers ──────────────────────────────────────────────────────────

def fix_cook_time(fm):
    """cookTime: → cookingTime:"""
    return re.sub(r'\bcookTime:', 'cookingTime:', fm)


def fix_scott_rating(fm):
    """scottRating: <blank> → scottRating: 0"""
    return re.sub(r'(scottRating:)([ \t]*)(\n)', r'\g<1> 0\3', fm)


def fix_topic(fm):
    """Normalise topic capitalisation; insert missing topic field."""
    def replace_topic(m):
        raw = m.group(1).strip().strip('"').strip("'")
        canonical = TOPIC_MAP.get(raw.lower())
        if canonical is not None and canonical != raw:
            return f'topic: "{canonical}"'
        return m.group(0)

    fm = re.sub(r'topic:\s*"?([^"\n]*)"?', replace_topic, fm)

    if 'topic:' not in fm:
        # Insert after first available anchor field, in priority order
        for anchor, replacement in [
            (r'(scottRating:[^\n]*\n)',  r'\1topic: ""\n'),
            (r'(originalLink:[^\n]*\n)', r'\1topic: ""\n'),
            (r'(ingredients:)',          r'topic: ""\n\1'),
        ]:
            if re.search(anchor, fm):
                fm = re.sub(anchor, replacement, fm, count=1)
                break

    return fm


def fix_amounts(fm):
    """amount: .5 → amount: 0.5  (leading-zero normalisation)"""
    return re.sub(r'(amount:\s*)(\.\d+)', r'\g<1>0\2', fm)


def fix_units(fm):
    """Normalise unit values: capitalisation, spelled-out → abbreviated, unnecessary quotes."""
    def replace_unit(m):
        prefix, raw = m.group(1), m.group(2)
        unquoted = raw.strip('"').strip("'")

        # Known mapping (covers capitalised and spelled-out variants)
        if unquoted in UNIT_MAP:
            return f'{prefix}{UNIT_MAP[unquoted]}'

        # Strip unnecessary quotes from simple single-word units
        if raw.startswith('"') and re.match(r'^[A-Za-z]+$', unquoted):
            return f'{prefix}{unquoted}'

        return m.group(0)

    return re.sub(r'(unit:\s*)(.+?)(?=\s*[,\n}])', replace_unit, fm)


def fix_preparation(fm):
    """Ensure every preparation value starts with ', ' (comma-space).

    Processes line-by-line to avoid regex double-matching issues with
    values that already contain commas.
    """
    lines = fm.split('\n')
    result = []
    for line in lines:
        m = re.match(r'^(\s*preparation:\s*)(.*?)(\s*,?\s*)$', line)
        if not m:
            result.append(line)
            continue

        prefix   = m.group(1)          # e.g. "    preparation: "
        raw      = m.group(2)          # the value, possibly with trailing comma
        trailing = ',' if raw.endswith(',') else ''
        val      = raw.rstrip(',').rstrip()

        # Extract inner string (strip surrounding quotes if present)
        qm = re.match(r'^"(.*)"$', val)
        inner = qm.group(1) if qm else val

        # Empty preparation value — leave it alone
        if not inner.strip():
            result.append(line)
            continue

        stripped = inner.lstrip()
        if stripped.startswith(', '):
            # already correct — keep line as-is
            result.append(line)
            continue

        # Fix: add ', ' prefix
        if stripped.startswith(','):
            new_inner = ', ' + stripped[1:].lstrip()
        else:
            new_inner = ', ' + stripped

        result.append(f'{prefix}"{new_inner}"{trailing}')

    return '\n'.join(result)


def fix_preparation_trailing_comma(fm):
    """Add missing trailing comma to preparation lines followed by another field.

    In flow-style YAML ingredient objects every field except the last must be
    followed by a comma.  preparation is never the last field, so if its line
    lacks a trailing comma the YAML parser chokes on the next field.
    """
    lines = fm.split('\n')
    result = []
    for i, line in enumerate(lines):
        # Match a preparation line that ends without a trailing comma
        if re.match(r'\s*preparation:\s*"[^"]*"\s*$', line):
            # Look ahead: if the next non-empty line is another field, add comma
            next_line = next((lines[j] for j in range(i + 1, len(lines)) if lines[j].strip()), '')
            if re.match(r'\s+\w[\w\s]*:', next_line):
                result.append(line.rstrip() + ',')
                continue
        result.append(line)
    return '\n'.join(result)


# ── manual-review detection ────────────────────────────────────────────────────

def get_manual_review_items(fm):
    items = []

    # Unit values with slashes or parentheses (composite / annotated)
    for m in re.finditer(r'unit:\s*"([^"]*[/(][^"]*)"', fm):
        items.append(f'  complex unit: {m.group(0).strip()}')

    # Range-format units like "to 2 tsp"
    if re.search(r'unit:\s*"to \d', fm):
        items.append('  range-format unit (e.g. "to 2 tsp") — consider splitting into separate fields')

    # originalLink: "N/A"
    if re.search(r'originalLink:\s*"N/A"', fm, re.IGNORECASE):
        items.append('  originalLink: "N/A" — consider replacing with an empty string')

    # Topic still unrecognised after auto-fix
    m = re.search(r'topic:\s*"?([^"\n]*)"?', fm)
    if m:
        val = m.group(1).strip().strip('"')
        if val not in VALID_TOPICS:
            items.append(f'  unrecognised topic: "{val}" — pick from {sorted(VALID_TOPICS - {""})}')

    # Metric fields (in schema but not rendered in the UI)
    if re.search(r'\bmetric:\s*\S', fm):
        items.append('  has metric field(s) — unused in the UI; keep or remove?')

    return items


# ── diff display ───────────────────────────────────────────────────────────────

def show_diff(original, updated):
    orig_lines = original.splitlines(keepends=True)
    new_lines  = updated.splitlines(keepends=True)
    for line in difflib.unified_diff(orig_lines, new_lines, lineterm=''):
        if line.startswith(('---', '+++', '@@')):
            continue
        if line.startswith('-'):
            print(f'    {line}')
        elif line.startswith('+'):
            print(f'    {line}')


# ── per-file processor ─────────────────────────────────────────────────────────

def process_file(path):
    raw  = path.read_text(encoding='utf-8')
    text = pre_fix_text(raw)
    fm, body = split_frontmatter(text)

    if fm is None:
        print(f'SKIP  {path.name}  (no frontmatter)')
        return False, False

    original_text = raw
    original = fm
    fm = fix_cook_time(fm)
    fm = fix_scott_rating(fm)
    fm = fix_topic(fm)
    fm = fix_amounts(fm)
    fm = fix_units(fm)
    fm = fix_preparation(fm)
    fm = fix_preparation_trailing_comma(fm)

    manual = get_manual_review_items(fm)
    new_text = rejoin(fm, body)
    changed = new_text != original_text

    if changed:
        label = '[DRY RUN] ' if DRY_RUN else ''
        print(f'\n{label}FIXED  {path.name}')
        show_diff(original_text, new_text)
        if not DRY_RUN:
            path.write_text(new_text, encoding='utf-8')

    if manual:
        print(f'\nMANUAL  {path.name}')
        for item in manual:
            print(item)

    return changed, bool(manual)


# ── entry point ────────────────────────────────────────────────────────────────

def main():
    files = sorted(RECIPES_DIR.glob('*.md'))

    print("Scott's Cookbook — recipe frontmatter fixer")
    print(f"Recipes : {RECIPES_DIR}")
    print(f"Mode    : {'DRY RUN — pass --apply to write changes' if DRY_RUN else 'APPLY'}")
    print(f"Files   : {len(files)}\n")
    print("─" * 60)

    fixed_count  = 0
    manual_count = 0

    for path in files:
        changed, needs_manual = process_file(path)
        if changed:
            fixed_count += 1
        if needs_manual:
            manual_count += 1

    print("\n" + "─" * 60)
    print(f"Auto-fixed     : {fixed_count} file(s)")
    print(f"Manual review  : {manual_count} file(s)")
    print("Done.")


if __name__ == '__main__':
    main()
