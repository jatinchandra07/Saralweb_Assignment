/**
 * Merges discontinuous time ranges within a given threshold.
 *
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Step 1: Sort ranges by start time
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currentStart, currentEnd] = sorted[0];

  // Step 2: Iterate through sorted ranges and merge
  for (let i = 1; i < sorted.length; i++) {
    const [nextStart, nextEnd] = sorted[i];

    // If ranges overlap or gap <= threshold → merge them
    if (nextStart <= currentEnd + threshold) {
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      merged.push([currentStart, currentEnd]);
      [currentStart, currentEnd] = [nextStart, nextEnd];
    }
  }

  // Step 3: Push last merged range
  merged.push([currentStart, currentEnd]);

  return merged;
};

module.exports = { mergeTimeRanges };
