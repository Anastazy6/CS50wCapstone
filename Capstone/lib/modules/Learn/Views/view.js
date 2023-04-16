import { Choice } from "./choice.mjs";
import { Progress } from "./progress.mjs";
import { Writing } from "./writing.mjs";
import { Summary } from "./summary.mjs";

/**
 * Separates subviews for namespacing purposes.
 */
export const View = function () {
  return {
    Choice: Choice,
    Progress: Progress,
    Writing: Writing,
    Summary: Summary
  };
}();