const loanBalance = document.getElementById('loanBalance');
const borrowElement = document.getElementById('borrowBtn');
const changeVisibility = document.getElementById('loan');



function Bank() {
    this.currentDebt = 0;
    const display = new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(this.currentDebt);

    this.borrow = function(currentBalance){
        if(currentDebt <= 0)
        {
            const borrowAmount = Number(prompt('Please enter the amount you want to borrow')); 
            const maxBorrowAmount = currentBalance*2;
            if(borrowAmount>maxBorrowAmount){
                alert('You cannot get a loan more than double of your bank balance');
            } 
            else{
                loanBalance.innerText = `${display}`+ " kr"
                changeVisibility.style.visibility = "visible";
            }
        }
        else
        {
            alert('You need to pay back current debt in full to get a new loan')
        }
    }
    this.repayLoan = function (number){ this.currentDebt -= number; if(this.currentDebt <= 0){changeVisibility.style.visibility = "hidden"}}
}

export default Bank;