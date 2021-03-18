// Still working on dot
// operation when you click "=" button after an operator or operators, an error occurs
// negative numbers - now I am using minus to change positive numbers to negative numbers. I have to find a better way.
// after "=" get output. If I want to use the output number with new operations?
// resizing texts. when there is a long process that you cannot keep everything on the container.

const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
const buttonGroup = document.querySelector(".btnGroup");
const digits = Array.from(document.querySelectorAll(".digit"));
const operators = Array.from(document.querySelectorAll(".operator"));
const process = document.querySelector("#process");
const output = document.querySelector(".output");
const clear = document.querySelector("#clear");

const dot = document.querySelector("#dot");
const neg = document.getElementById("negative");

const diZeroError = "Error";
let lastOperation = "";
let haveDot = false;
let currentOperator = "";
let currentValue = 0;
let inputArr = [];

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

// function displayDigit() {

//   digits.forEach((ele) => {
//     ele.addEventListener("click", (event) => {
//       const digit = event.target.innerText;
//       currentValue += digit

//       if (digit === "." && !haveDot) {
//         haveDot = true;
//       } else if(!isNaN(digit) && haveDot) {
//         haveDot = false;
//       } else if (digit === "." && haveDot ) {
//         inputArr.push("0",event.target.innerText);
//         return;
//       }
//        inputArr.push(event.target.innerText);

//       process.innerText += digit;
//     });
//   });
// }

digits.forEach((ele) => ele.addEventListener("click", displayDigit, false));

function displayDigit(event) {
  let number = event.target.innerText;
  currentValue += number;
  if (/^0[0-9]/.test(currentValue)) currentValue = number;
  displayScreen(currentValue);
}



function displayScreen(element) {
  if (element === null) {
    output.textContent = "";
    process.textContent = "";
  }
  if (Number.isNaN(parseFloat(element))) {
    if (element === diZeroError) {
      process.textContent = diZeroError;
      output.textContent = diZeroError;
    } else {
      process.textContent = valueLength(inputArr.join(" "));
      output.textContent = "";
    }
  } else {
      process.textContent = valueLength(inputArr.join(" "));
      output.textContent = valueLength(element);
  }
}


function valueLength(strVal) {
    let maxValLength = 20;
    if(strVal.length > maxValLength) {
        strVal = strVal.slice(-maxValLength);
        return strVal;
    }
}




neg.addEventListener("click", negNumbers);
function negNumbers() {
  if (currentValue.length && currentValue !== "0") {
    if (!/^\-/.test(currentValue)) currentValue = "-" + currentValue;
    else currentValue = currentValue.slice(1);
    displayScreen(currentValue);
  }
}





// ========== Clear Button =============

clear.addEventListener("click", clearAll, false);

function clearAll() {
    currentValue = "";
    inputArr = [];
    displayScreen(null);
}

// ================= Calculate ================

// function operatorBtn() {
//   operators.forEach((operator) => {
//     operator.addEventListener("click", (event) => {
//       let opBtn = event.target.innerText;

//       if (opBtn === "x") {
//         opBtn = "*";
//         inputArr.push(opBtn);
//       } else if (opBtn === "÷") {
//         opBtn = "/";
//         inputArr.push(opBtn);
//       } else if (opBtn === "±") {
//         opBtn = "-";
//         inputArr.push(opBtn);
//       } else if (opBtn === "C") {
//         opBtn = "";
//         clearAll();
//       } else if (opBtn === "=") {
//         // inputArr.pop();
//         opBtn = "";
//         if (isNaN(inputArr[inputArr.length - 1])) {
//           console.log(inputArr[inputArr.length - 1]);
//           inputArr.pop();
//           let cal = inputArr.join("");
//           output.value = math.evaluate(cal);
//         } else {
//           let cal = inputArr.join("");
//           output.value = math.evaluate(cal);
//           console.log(inputArr);
//         }
//         clearAll();
//         return;
//       } else {
//         inputArr.push(opBtn);
//       }

//       if (opBtn === "") {
//         opBtn = output.value;
//         haveDot = false;
//       }
//       output.value = "";
//       process.innerText += opBtn;
//     });
//   });
// }

operators.forEach(operator => operator.addEventListener("click", operatorBtn, false))








function equalBtn() {
    if(inputArr.length) {
        if(!currentValue) {
            inputArr.pop();
        } else {
            currentValue = roundFloat(currentValue);
            inputArr.push(currentValue);
        }
        let finOutput = inputArr.join(" ");
        let multiDiv = /(-?\d*\.{0,1}\d+)\s([÷×])\s(-?\d*\.{0,1}\d+)/;
        let plusMinus = /(-?\d*\.{0,1}\d+)\s([-\+])\s(-?\d*\.{0,1}\d+)/;
        let divZero =  /-?\d*\.{0,1}\d+\s÷\s0/;

        while (multiDiv.test(finOutput)) {
          if(divZero.test(finOutput)) {
            finOutput = divZero;
          } else {
            finOutput = finOutput.replace(multiDiv, operate);
          }
        }
        while (plusMinus.test(finOutput)) {
          finOutput = finOutput.replace(plusMinus, operate);
        }

        if(finOutput !== divZero) {
          currentValue 
        }

    }
}

function roundFloat(el) {
	let number = parseFloat(el);
	let regex = /\d+\.\d\d\d+/;
	
	if(regex.test(el)) {
		number = Math.round(el*100)/100;
		return number.toString();
	}
	else {
		return el;
	}
}

// call all the functions

function init() {
  displayDigit();
  clearAll();
  operatorBtn();
}

init();



/(-?\d*\.{0,1}\d+)\s([÷×])\s(-?\d*\.{0,1}\d+)/;

// \d 숫자 
// \s space 
// .{0,1} .이 최소 0 이상 1이하로 반복됨 
// \d+ 숫자가 한 번 이상 반복됨 
// () 그룹 
// [] 문자 선택 [÷×] 둘 중 하나를 의미 
// ? 존재여부 앞의 문자가 존재할 수도 존재하지 않을 수도 있음 의미 
// * 앞의 문자가 0번 이상 또는 그 이상 반복됨을 의미 
