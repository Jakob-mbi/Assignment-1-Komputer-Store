const bankBalance = document.getElementById('bankBalance');
const loanBalance = document.getElementById('loanBalance');
const borrowElement = document.getElementById('borrowBtn');
const changeVisibility = document.getElementById('loan');
const changeVisibilityWork = document.getElementById('Repay');
const payBalance = document.getElementById('payBalance');
const featuresElement = document.getElementById('features')
const computersElement = document.getElementById('computerSelection');
const productElement = document.getElementById('product')
const descriptionElement = document.getElementById('description')
const priceElement = document.getElementById('price')
const imgElement = document.getElementById('img');

let computers = [];
let currentBalance = 0;
let currentDebt = 0;
let currentPay = 0;
bankBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentBalance)}`;
payBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentPay)}`;

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSelector(computers));

const addComputersToSelector = (computers) => {
    computers.map(element => addComputerToSelector(element));
    featuresElement.innerText = computers[0].specs.join('.\r');
    priceElement.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(computers[0].price)}`;
    descriptionElement.innerText = computers[0].description;
    productElement.innerText = computers[0].title;
    imgElement.src = `https://hickory-quilled-actress.glitch.me/${computers[0].image}`
}


const addComputerToSelector = (computer) => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}
const handleComputerSelectChange = e => {
    const selctedComputer = computers[e.target.selectedIndex];
    featuresElement.innerText = selctedComputer.specs.join('.\r');
    priceElement.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(selctedComputer.price)}`;
    descriptionElement.innerText = selctedComputer.description;
    productElement.innerText = selctedComputer.title;
    imgElement.src = `https://hickory-quilled-actress.glitch.me/${selctedComputer.image}`
}
const buy = () =>{
    const selctedComputer = computers[computersElement.selectedIndex];
    withdrawal(selctedComputer.price)
}
//Bank Balance 

const withdrawal = function(withdrawalAmount) {
    if(withdrawalAmount <= currentBalance){
        currentBalance -= withdrawalAmount;
        bankBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentBalance)}`;
        return true;
    }
    else{
        alert('Your current bank balance is to low!')
        return false;
    }
}
const deposit = function(depositAmount){
    Number(depositAmount);
    currentBalance += depositAmount;
    bankBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentBalance)}`;
}


//Loan Balance 

const borrow = function(){
    if(currentDebt <= 0)
    {
        const borrowAmount = Number(prompt('Please enter the amount you want to borrow')); 
        const maxBorrowAmount = currentBalance*2;
        if(borrowAmount>maxBorrowAmount){
            alert('You cannot get a loan more than double your current bank balance');
        } 
        else{
            currentDebt = borrowAmount;
            currentBalance += currentDebt;
            changeVisibility.style.visibility = "visible";
            changeVisibilityWork.style.visibility = "visible";
        }
    }
    else
    {
        alert('You need to pay back current debt in full to get a new loan')
    }
    loanBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentDebt)}`
    bankBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentBalance)}`;
}
const repayLoan = function (number){
    currentDebt -= Number(number); 
    if(currentDebt <= 0)
    {
        changeVisibility.style.visibility = "hidden"
        changeVisibilityWork.style.visibility = "hidden"
    }

    loanBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentDebt)}`
}

//Pay Balance 

const bankTransfer = function(){
    if(currentDebt>0){
        if(currentDebt>=(currentPay*0.1)){
            repayLoan(currentPay*0.1)
            deposit(currentPay*0.9)
        }
        else{
            const rest = (currentPay*0.1)-currentDebt
            repayLoan(currentDebt)
            deposit(rest+(currentPay*0.9))
        }
    }
    else
    {
        deposit(currentPay);   
    }
    currentPay = 0;
    payBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentPay)}`;
}
const working = function(){
    currentPay += 100;
    payBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentPay)}`;
}

const repayPay = function(){
    if(currentPay<currentDebt)
    {
        repayLoan(currentPay);
    }
    else
    {
        const rest = currentPay - currentDebt;
        deposit(rest)
        repayLoan(currentDebt)
    }
    currentPay=0;
    payBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentPay)}`
}


document.getElementById("borrowBtn").addEventListener("click",borrow);
document.getElementById("work").addEventListener("click",working);
document.getElementById("Repay").addEventListener("click",repayPay);
document.getElementById("bankTransfer").addEventListener("click",bankTransfer);
document.getElementById('computerSelection').addEventListener("change",handleComputerSelectChange);
document.getElementById('buyBtn').addEventListener("click",buy);









