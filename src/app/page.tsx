'use client';

import { AtmProvider } from '../lib/AtmContext';
import AtmMachine from '../components/AtmMachine';

export default function Home() {
  return (
    <AtmProvider>
      <AtmMachine />
    </AtmProvider>
  );
}
