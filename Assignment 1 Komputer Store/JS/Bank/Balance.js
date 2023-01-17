const bankBalance = document.getElementById('bankBalance');



function BankBalance(currentBalance) {

    this.currentBalance = Number(currentBalance);
    const displayBalance = new Intl.NumberFormat('sv',{style: 'currency',currency: 'SEK'}).format(this.currentBalance);
    bankBalance.innerText = `${displayBalance}`

    this.withdrawal = function(withdrawalAmount) {
        if(withdrawalAmount <= this.currentBalance){
            this.currentBalance -= withdrawalAmount;
            bankBalance.innerText = `${displayBalance}`;
        }
        else{
            alert('Your current bank balance is to low!')
        }
    }
    this.deposit = function(depositAmount){
        Number(depositAmount);
        this.currentBalance += depositAmount;
        bankBalance.innerText = `${displayBalance}`;
    }
}


export default BankBalance;


