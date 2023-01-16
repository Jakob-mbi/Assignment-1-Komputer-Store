const bankBalance = document.getElementById('bankBalance');
const loanBalance = document.getElementById('loanBalance');
const borrowElement = document.getElementById('borrowBtn');
const changeVisibility = document.getElementById('loan');



function Bank(currentBalance) {

    this.currentBalance = currentBalance;
    bankBalance.innerText = `${this.currentBalance}`+ " kr"

    this.withdrawal = function(withdrawalAmount) {
        if(withdrawalAmount <= this.currentBalance){
            this.currentBalance -= withdrawalAmount;
            bankBalance.innerText = `${this.currentBalance}` + " kr";
        }
        else{
            alert('Your current bank balance is to low!')
        }
    }
    this.deposit = function(depositAmount){
        Number(depositAmount);
        this.currentBalance += depositAmount;
        bankBalance.innerText = `${this.currentBalance}` + " kr";
    }
    this.bankBalance = function(){return this.currentBalance};

    this.currentDebt = 0;

    this.borrow = function(){
        if(currentDebt <= 0)
        {
            const borrowAmount = prompt('Please enter the amount you want to borrow'); 
            const maxBorrowAmount = this.currentBalance*2;
            if(borrowAmount>maxBorrowAmount){
                alert('You cannot get a loan more than double of your bank balance');
            } 
            else{
                loanBalance.innerText = `${this.currentDebt}`+ " kr"
                changeVisibility.style.visibility = "visible";
            }
        }
        else
        {
            alert('You need to pay back current debt in full to get a new loan')
        }
    }
    this.repayLoan = function (number){ this.currentDebt -= number}
    this.outstandingLoan = function(){return this.currentDebt};
}


export default Bank;


