// Still working on dot
// operation when you click "=" button after an operator or operators, an error occurs
// negative numbers - now I am using minus to change positive numbers to negative numbers. I have to find a better way. 
// after "=" get output. If I want to use the output number with new operations? 
// resizing texts. when there is a long process that you cannot keep everything on the container. 




const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
const buttonGroup = document.querySelector(".btnGroup");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const process = document.querySelector("#process");
const output = document.querySelector(".output");
const clear = document.querySelector("#clear");


const dot = document.querySelector("#dot");
const neg = document.getElementById("negative")

let lastOperation = "";
let haveDot = false;
let currentOperator = "";
let currentValue = 0;
let arr = [];

function changeTheme() {
  if (toggleSwitch.checked) {
    document.documentElement.setAttribute("mode-changes", "dark");
  } else {
    document.documentElement.setAttribute("mode-changes", "light");
  }
}

toggleSwitch.addEventListener("change", function () {
  changeTheme();
});

// ============= Number Buttons ===============

function displayDigit() {
  currentValue = output.value
  digits.forEach((ele) => {
    ele.addEventListener("click", (event) => {
     const digit = event.target.innerText;
      if (digit === "." && !haveDot) {
        haveDot = true;
      } else if(!isNaN(digit) && haveDot) {
        haveDot = false;
      } else if (digit === "." && haveDot ) {
        arr.push("0",event.target.innerText);
        return;
      }
       arr.push(event.target.innerText);
      
      process.innerText += digit;
      output.value += digit;
    });
  });
}

// ========== Clear Button =============

function clearAll() {
  clear.addEventListener("click", () => {
    output.value = "";
    process.innerText = "";
    arr = [];
  });
}

// ================= Calculate ================

function operatorBtn() {
  operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
      let opBtn = event.target.innerText;

      if (opBtn === "x") {
        opBtn = "*";
        arr.push(opBtn);
      } else if (opBtn === "÷") {
        opBtn = "/";
        arr.push(opBtn);
      } else if (opBtn === "±") {
        opBtn = "-";
        console.log(arr)
      } else if (opBtn === "C") {
        opBtn = "";
        clearAll();
      } else if (opBtn === "=") {
        // arr.pop();
        opBtn = "";
        if (isNaN(arr[arr.length - 1])) {
          console.log(arr[arr.length - 1]);
          arr.pop();
          let cal = arr.join("");
          output.value = math.evaluate(cal);
        } else {
          let cal = arr.join("");
          output.value = math.evaluate(cal);
          console.log(arr);
        }
        clearAll();
        return;
      } else {
        arr.push(opBtn);
      }

      if (opBtn === "") {
        opBtn = output.value;
        haveDot = false;
      }
      output.value = "";
     process.innerText += opBtn
    });
  });
}

// call all the functions

function init() {
  displayDigit();
  clearAll();
  operatorBtn();
}

init();
