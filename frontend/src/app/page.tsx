"use client";

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import SociosView from '@/views/SociosView';
import CuentasView from '@/views/CuentasView';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'socios' | 'cuentas'>('socios');

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === 'socios' ? <SociosView /> : <CuentasView />}
      </div>
    </main>
  );
}
