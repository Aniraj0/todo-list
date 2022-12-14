export function fetchMock () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("This is resolved!");
      // console.log("This is resolved");
    }, 200000);
  })
}



