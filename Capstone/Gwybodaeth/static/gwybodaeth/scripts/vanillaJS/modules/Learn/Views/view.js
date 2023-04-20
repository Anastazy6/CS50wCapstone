import { Choice } from "./choice.js";
import { Progress } from "./progress.js";
import { Writing } from "./writing.js";
import { Summary } from "./summary.js";

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