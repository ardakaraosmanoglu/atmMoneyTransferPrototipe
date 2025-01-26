'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AtmStep = 'insert-card' | 'enter-pin' | 'select-operation' | 'enter-amount' | 'confirm-transfer' | 'transaction-result';

interface AtmContextType {
  currentStep: AtmStep;
  cardNumber: string;
  pin: string;
  destinationCard: string;
  amount: number;
  error: string;
  balance: number | null;
  setCardNumber: (cardNumber: string) => void;
  setPin: (pin: string) => void;
  setDestinationCard: (cardNumber: string) => void;
  setAmount: (amount: number) => void;
  setError: (error: string) => void;
  setBalance: (balance: number | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetAtm: () => void;
}

const AtmContext = createContext<AtmContextType | undefined>(undefined);

export function AtmProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<AtmStep>('insert-card');
  const [cardNumber, setCardNumber] = useState('');
  const [pin, setPin] = useState('');
  const [destinationCard, setDestinationCard] = useState('');
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState<number | null>(null);

  const steps: AtmStep[] = [
    'insert-card',
    'enter-pin',
    'select-operation',
    'enter-amount',
    'transaction-result'
  ];

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    }
  };

  const resetAtm = () => {
    setCurrentStep('insert-card');
    setCardNumber('');
    setPin('');
    setDestinationCard('');
    setAmount(0);
    setError('');
    setBalance(null);
  };

  return (
    <AtmContext.Provider
      value={{
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
      }}
    >
      {children}
    </AtmContext.Provider>
  );
}

export function useAtm() {
  const context = useContext(AtmContext);
  if (context === undefined) {
    throw new Error('useAtm must be used within an AtmProvider');
  }
  return context;
}