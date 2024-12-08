let accounts = JSON.parse(localStorage.getItem('accounts')) || [];

// Create Account
document.getElementById('createAccountForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('accountName').value;
  const deposit = parseFloat(document.getElementById('initialDeposit').value);

  accounts.push({ name, balance: deposit });
  localStorage.setItem('accounts', JSON.stringify(accounts));
  alert('Account Created Successfully!');
  e.target.reset();
});

// Deposit Amount
document.getElementById('depositForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('depositName').value;
  const amount = parseFloat(document.getElementById('depositAmount').value);

  const account = accounts.find(acc => acc.name === name);
  if (account) {
    account.balance += amount;
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert('Amount Deposited Successfully!');
  } else {
    alert('Account Not Found!');
  }
  e.target.reset();
});

// Withdraw Amount
document.getElementById('withdrawForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('withdrawName').value;
  const amount = parseFloat(document.getElementById('withdrawAmount').value);

  const account = accounts.find(acc => acc.name === name);
  if (account) {
    if (account.balance >= amount) {
      account.balance -= amount;
      localStorage.setItem('accounts', JSON.stringify(accounts));
      alert('Amount Withdrawn Successfully!');
    } else {
      alert('Insufficient Balance!');
    }
  } else {
    alert('Account Not Found!');
  }
  e.target.reset();
});

// Display Details
document.addEventListener('DOMContentLoaded', function() {
  const tableBody = document.getElementById('detailsTable')?.querySelector('tbody');
  if (tableBody) {
    tableBody.innerHTML = accounts.map(acc => `
      <tr>
        <td>${acc.name}</td>
        <td>${acc.balance.toFixed(2)}</td>
      </tr>
    `).join('');
  }
});
