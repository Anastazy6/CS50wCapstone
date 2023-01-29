import  { Choice   }  from  "./choice.mjs"
import  { Progress }  from  "./progress.mjs"
import  { Write    }  from  "./write.mjs"
import  { Summary  }  from  "./summary.mjs"

export const View = (function() {

  return {
    Choice  : Choice,
    Progress: Progress,
    Write   : Write,
    Summary : Summary,

  }
})()