function getMaxGifts(
  giftsCities: number[],
  maxGifts: number,
  maxCities: number
): number {
  // sort cities descending
  const sortedCities = [...giftsCities].sort((c1, c2) => c2 - c1);
  return recurse(sortedCities, maxGifts, maxCities);
}

const NOT_POSSIBLE = 0;

/**
 * `cities` has to be sorted in descending order!
 */
function recurse(cities: number[], max: number, count: number): number {
  // we can not take anything
  if (count === 0) return NOT_POSSIBLE;

  // only cities we can actually visit are "relevant"
  const [highest, ...rest] = cities.filter((city) => city <= max);

  // relevant is empty
  if (highest === undefined) return NOT_POSSIBLE;

  // relevant only has one element left
  if (rest.length === 0) return highest;

  // we can only take one more
  if (count === 1) return highest;

  // perform the same logic for the remaining cities
  for (let i = 0; i < rest.length; i++) {
    const remainingHighest = recurse(rest.slice(i), max - highest, count - 1);

    // "match" found
    if (remainingHighest !== NOT_POSSIBLE) return highest + remainingHighest;
  }

  // not possible to visit anything
  return NOT_POSSIBLE;
}
