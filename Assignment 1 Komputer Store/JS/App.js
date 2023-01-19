const bankBalance = document.getElementById('bankBalance');
const loanBalance = document.getElementById('loanBalance');
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

//Figure 3 Laptop Selection Area & Figure 4 Laptop Information Area

fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => computers = data)
    .then(computers => addComputersToSelector(computers));

const addComputersToSelector = (computers) => {
    computers.map(element => addComputerToSelector(element));
    featuresElement.innerText = computers[0].specs.join('.\r');    
    descriptionElement.innerText = computers[0].description;
    productElement.innerText = computers[0].title;
    imgElement.src = `https://hickory-quilled-actress.glitch.me/${computers[0].image}`
    updateUiCurrencyAmount(priceElement,computers[0].price);
}


const addComputerToSelector = computer => {
    const computerElement = document.createElement("option");
    computerElement.value = computer.id;
    computerElement.appendChild(document.createTextNode(computer.title));
    computersElement.appendChild(computerElement);
}
const handleComputerSelectChange = e => {
    const selctedComputer = computers[e.target.selectedIndex];
    featuresElement.innerText = selctedComputer.specs.join('.\r');
    descriptionElement.innerText = selctedComputer.description;
    productElement.innerText = selctedComputer.title;
    imgElement.src = `https://hickory-quilled-actress.glitch.me/${selctedComputer.image}`
    updateUiCurrencyAmount(priceElement,selctedComputer.price);
}

const buy = () => {
    const selctedComputer = computers[computersElement.selectedIndex];
    if((withdrawal(selctedComputer.price))){
        alert(`You are now the owner of the new ${selctedComputer.title}`)
    }
}

//Figure 1 The Bank Section

//Bank Balance 

const withdrawal = function(withdrawalAmount) {
    if(withdrawalAmount > currentBalance){
        return alert('Your current bank balance is to low!')   
    }
    currentBalance -= withdrawalAmount;
    updateUiCurrencyAmount(bankBalance,currentBalance);
    return true
}
const deposit = function(depositAmount){
    currentBalance += depositAmount;
    updateUiCurrencyAmount(bankBalance,currentBalance);   
}

//Loan Balance 

const borrow = function(){
    if(currentDebt != 0)
    {
        return alert('You need to pay back current debt in full to get a new loan')
    }
    const borrowAmount = Number(prompt('Please enter the amount you want to borrow'));
    if(Number.isNaN(borrowAmount)){return alert('That is not a number')} 
    if(borrowAmount<0){return alert('You can not do that')} 
    const maxBorrowAmount = currentBalance*2;
    if(borrowAmount>maxBorrowAmount){
        return alert('You cannot get a loan more than double your current bank balance');
    } 
    currentDebt = borrowAmount;
    currentBalance += currentDebt;
    showAndHidde(true) 
    updateUiCurrencyAmount(loanBalance,currentDebt);
    updateUiCurrencyAmount(bankBalance,currentBalance);
}
const repayLoan = function (number){
    currentDebt -= number; 
    if(currentDebt <= 0){showAndHidde(false)}
    updateUiCurrencyAmount(loanBalance,currentDebt);
}

// Figure 2 Work Section

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
    updateUiCurrencyAmount(payBalance,currentPay);
}
const working = function(){
    currentPay += 100;
    updateUiCurrencyAmount(payBalance,currentPay);
}

const repayFromPay = function(){
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
    updateUiCurrencyAmount(payBalance,currentPay);
}

// Repeated code

const showAndHidde = e => {
    e ? changeVisibility.style.visibility = "visible" : changeVisibility.style.visibility = "hidden";
    e ? changeVisibilityWork.style.visibility = "visible" : changeVisibilityWork.style.visibility = "hidden"; 
}
const currencyFormat = e => {return `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(e)}`};
const updateUiCurrencyAmount= (i,c) => {return i.innerText = currencyFormat(c)};

//Event Listners

document.getElementById("borrowBtn").addEventListener("click",borrow);
document.getElementById("work").addEventListener("click",working);
document.getElementById("Repay").addEventListener("click",repayFromPay);
document.getElementById("bankTransfer").addEventListener("click",bankTransfer);
document.getElementById('computerSelection').addEventListener("change",handleComputerSelectChange);
document.getElementById('buyBtn').addEventListener("click",buy);









