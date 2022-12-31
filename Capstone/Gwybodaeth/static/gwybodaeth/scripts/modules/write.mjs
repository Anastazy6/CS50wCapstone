export const Write = function() {
  const testFunction = () => {
    console.log("Write module loaded successfully!");
  }



  return {
    testFunction: testFunction
  };
}();