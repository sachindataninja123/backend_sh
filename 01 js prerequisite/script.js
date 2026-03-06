// fundamentals of js
// array and objects
// function return
// async js coding
// forEach map filter find indexOf

// let arr = [1, 2, 3, 4];
// arr.forEach((val) => {
//   console.log(val + "hello");
// });

// let arr = [1, 2, 3, 4];
// arr.map((val) => {
//   console.log(val + 12);
// });

// let arr = [1, 2, 3, 4];
// let filterArr = arr.filter((val) => {
//   if (val > 3) {
//     return true;
//   } else return false;
// });

// console.log(filterArr)

// let arr = [1, 2, 3, 4];
// let findElem = arr.find((val) => {
//   if (val === 2) return val;
// });

// console.log(findElem);

// objects
// var obj = {
//   name: "harsh",
//   age: 12,
// };

// Object.freeze(obj);
// obj.age = 26;
// console.log(obj.name);
// console.log(obj.age);

//asynchronous js coding
async function getProducts() {
  console.log("hello");
  const blob = await fetch("https://fakestoreapi.com/products");
  console.log("what about you")
  var res = await blob.json();
  console.log("i am synchronous")

  console.log(res);
}

getProducts();
