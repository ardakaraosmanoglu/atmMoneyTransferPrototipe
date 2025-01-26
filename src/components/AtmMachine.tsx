'use client';

import React from 'react';
import { useAtm } from '../lib/AtmContext';
import { validatePin, validateTransfer, getAccountBalance } from '../lib/mockData';

export default function AtmMachine() {
  const {
    currentStep,
    cardNumber,
    pin,
    destinationCard,
    amount,
    error,
    balance,
    setCardNumber,
    setPin,
    setDestinationCard,
    setAmount,
    setError,
    setBalance,
    nextStep,
    prevStep,
    resetAtm
  } = useAtm();

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length !== 16) {
      setError('Invalid card number');
      return;
    }
    setError('');
    nextStep();
  };

  const handlePinSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePin(cardNumber, pin)) {
      const balance = getAccountBalance(cardNumber);
      setBalance(balance);
      setError('');
      nextStep();
    } else {
      setError('Invalid PIN');
    }
  };

  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationCard || destinationCard.length !== 16) {
      setError('Invalid destination card number');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    const result = validateTransfer(cardNumber, destinationCard, amount);
    setBalance(result.newBalance || null);
    setError(result.success ? '' : result.message);
    nextStep();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'insert-card':
        return (
          <form onSubmit={handleCardSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
                maxLength={16}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Insert Card
            </button>
          </form>
        );

      case 'enter-pin':
        return (
          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                name="pin"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                maxLength={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg tracking-widest"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Submit PIN
            </button>
          </form>
        );

      case 'select-operation':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <p className="text-gray-600 text-sm font-medium mb-2">Current Balance</p>
              <p className="text-3xl font-bold text-gray-900">${balance?.toLocaleString()}</p>
            </div>
            <button
              onClick={nextStep}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Transfer Money</span>
            </button>
          </div>
        );

      case 'enter-amount':
        return (
          <form onSubmit={handleTransferSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={destinationCard}
                onChange={(e) => setDestinationCard(e.target.value)}
                placeholder="Enter destination card number"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
                maxLength={16}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-lg"
                min="0"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 text-lg">$</span>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Transfer
            </button>
          </form>
        );

      case 'transaction-result':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border-2 ${error ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 shadow-lg'}`}>
              {error ? (
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-red-700 mb-2">Transfer Failed</h2>
                  <p className="text-red-600 mb-4">{error}</p>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-6">
                    <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800 mb-1">Transfer Receipt</h2>
                    <p className="text-sm text-green-600 font-medium">Transaction completed successfully</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Transaction Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">{new Date().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Transaction Type:</span>
                          <span className="font-medium">Money Transfer</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Account Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">From Account:</span>
                          <span className="font-medium">{cardNumber.replace(/(.{4})/g, '$1 ').trim()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">To Account:</span>
                          <span className="font-medium">{destinationCard.replace(/(.{4})/g, '$1 ').trim()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Amount Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Transfer Amount:</span>
                          <span className="font-medium text-green-600">${amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">New Balance:</span>
                          <span className="font-bold text-gray-800">${balance?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">Please keep this receipt for your records</p>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={resetAtm}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start New Transaction
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">ATM Machine</h1>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        <div className="mb-6">{renderStep()}</div>
        {currentStep !== 'insert-card' && currentStep !== 'transaction-result' && (
          <button
            onClick={prevStep}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </button>
        )}
      </div>
    </div>
  );
}