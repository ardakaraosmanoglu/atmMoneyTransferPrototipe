export interface Account {
  cardNumber: string;
  pin: string;
  balance: number;
  accountHolder: string;
}

export interface TransactionResult {
  success: boolean;
  message: string;
  newBalance?: number;
}

const accounts: Account[] = [
  {
    cardNumber: '1234567890123456',
    pin: '1234',
    balance: 5000,
    accountHolder: 'John Doe'
  },
  {
    cardNumber: '9876543210987654',
    pin: '4321',
    balance: 3000,
    accountHolder: 'Jane Smith'
  }
];

export const validatePin = (cardNumber: string, pin: string): boolean => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  return account?.pin === pin;
};

export const getAccountBalance = (cardNumber: string): number | null => {
  const account = accounts.find(acc => acc.cardNumber === cardNumber);
  return account ? account.balance : null;
};

export const validateTransfer = (
  fromCard: string,
  toCard: string,
  amount: number
): TransactionResult => {
  const sourceAccount = accounts.find(acc => acc.cardNumber === fromCard);
  const destAccount = accounts.find(acc => acc.cardNumber === toCard);

  if (!sourceAccount) {
    return { success: false, message: 'Source account not found' };
  }

  if (!destAccount) {
    return { success: false, message: 'Destination account not found' };
  }

  if (amount <= 0) {
    return { success: false, message: 'Invalid transfer amount' };
  }

  if (sourceAccount.balance < amount) {
    return { success: false, message: 'Insufficient funds' };
  }

  // Simulate transfer
  sourceAccount.balance -= amount;
  destAccount.balance += amount;

  return {
    success: true,
    message: `Transfer of $${amount.toLocaleString()} from ${sourceAccount.accountHolder} to ${destAccount.accountHolder} was successful`,
    newBalance: sourceAccount.balance
  };
};