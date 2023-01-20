import { Choice  } from "./choice.mjs"
import { Write   } from "./write.mjs"
import { Summary } from "./summary.mjs"

export const View = (function() {

  return {
    Choice : Choice,
    Write  : Write,
    Summary: Summary
  }
})()