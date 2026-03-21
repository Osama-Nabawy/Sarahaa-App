// Part 1: Coding Questions

// Q1
let str = "123";
let num = Number(str);
console.log(num + 7);
// Q2
let x = 0;
if (!x) {
  console.log("Invalid");
}else {
  console.log("Valid");
}
// Q3
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;
    }else {
        console.log(i);
    }
}
// Q4
let num1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let even = num1.filter(function(n) {
    return n % 2 === 0;
});
console.log(even);
// Q5
let arr1 = [1,2,3,4,5];
let arr2 = [6,7,8,9,10];
let mergedArray = [...arr1, ...arr2];
console.log(mergedArray);
// Q6
let dayNumber = 2;
let day;

switch (dayNumber) {
  case 1:
    day = "Sunday";
    break;
  case 2:
    day = "Monday";
    break;
  case 3:
    day = "Tuesday";
    break;
  case 4:
    day = "Wednesday";
    break;
  case 5:
    day = "Thursday";
    break;
  case 6:
    day = "Friday";
    break;
  case 7:
    day = "Saturday";
    break;
  default:
    day = "Invalid day";
}
console.log(day);

// Q7
let arrey = ["osama", "ahmed", "sayed", "eman"];
let mArray = arrey.map(function(name) {
    return name.length;
});
console.log(mArray);
// Q8
function isDivisibleBy3And5(n) {
    return n % 3 === 0 && n % 5 === 0;
}
console.log(isDivisibleBy3And5(15));
console.log(isDivisibleBy3And5(10));

// Q9
const square = (n) => { return n ** 2 };
console.log(square(5));

// Q10
function formatString({ name, age}) {
  return `Name: ${name}, Age: ${age}`;
}
let object = { name: "Osama", age: 20 };
console.log(formatString(object));

// Q11
function sumAtLeast2(a, b, ...x) {
    let sum = a + b;
    if (x.length > 0) {
        sum += x.reduce((acc, curr) => acc + curr);
    }
    return sum;
}
console.log(sumAtLeast2(1, 2));
console.log(sumAtLeast2(1, 2, 3, 4, 5));
// Q12
function delayedSuccess() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Success");
    }, 3000); 
});
}
delayedSuccess().then((msg) => {
    console.log(msg);
});

// Q13
let arrayLargest = [1, 15, 19, 17, 13, 18, 19, 20, 25, 22];
function findLargestNumber(arr) {
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};
console.log(findLargestNumber(arrayLargest));

// Q14
function getObjectKeys(obj) {
    return Object.keys(obj);
};
let object2 = { name: "Osama", age: 20, country: "Egypt" };
console.log(getObjectKeys(object2));

// Q15
function splitString(string) { 
    return string.split(" ");
}
let myString = "Osama Mohammed Nabawy";
console.log(splitString(myString));
// =================
// =================
// =================
// Part 2: Essay Questions
// 1. What is the difference between forEach and for...of? When would you use each?
// for Each is a method that executes a function for each element in array ,
//  for each is used when you want to perform an action on each element of an array without needing to break out of the loop early.
// for...of is a loop that iterates over iterable objects like arrays, strings, maps, and sets.

// 2. What is hoisting and what is the Temporal Dead Zone (TDZ)? Explain with examples.
// Hoisting : Hoisting is JavaScript’s behavior of moving variable and function declarations to the top of their scope during the compilation phase.
// TDZ : The TDZ is the time between entering a scope and the point where a let or const variable is declared.

// 3. What are the main differences between == and ===?
// The main difference between == and === is that == checks for value equality with type coercion,
//  while === checks for both value and type equality without type coercion.


// 4. Explain how try-catch works and why it is important in async operations.
// try-catch is a mechanism to handle errors in JavaScript without stopping the execution of your program.
// try block: Code you want to execute that might throw an error.
// catch block: Code that runs if an error occurs in the try block.
// JavaScript is asynchronous, meaning many operations (like fetching data) run later.
// Errors in async code won’t be caught by a synchronous try-catch unless handled correctly.


// 5. What’s the difference between type conversion and coercion? Provide examples of each.
// Type conversion is when you manually convert a value from one type to another using functions or methods.
// Type coercion is when JavaScript automatically converts a value to another type to perform an operation.
// Happens behind the scenes.
// Can sometimes lead to unexpected results.
