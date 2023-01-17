const bankBalance = document.getElementById('bankBalance');
const loanBalance = document.getElementById('loanBalance');
const borrowElement = document.getElementById('borrowBtn');
const changeVisibility = document.getElementById('loan');
const changeVisibilityWork = document.getElementById('Repay');
const payBalance = document.getElementById('payBalance');


let currentBalance = 0;
let currentDebt = 0;
let currentPay = 0;
bankBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentBalance)}`;
payBalance.innerText = `${new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(currentPay)}`;

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


const getALoan = document.getElementById("borrowBtn").addEventListener("click",borrow);
const work = document.getElementById("work").addEventListener("click",working);
const repay = document.getElementById("Repay").addEventListener("click",repayPay);
const transfer = document.getElementById("bankTransfer").addEventListener("click",bankTransfer);









