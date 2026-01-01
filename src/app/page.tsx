'use client';
import { useState } from 'react';
import DomicileForm from '@/components/domicile-form';
import DomicilePDF from '@/components/domicile-pdf';
import type { DomicileFormSchema } from '@/lib/validators';

export interface SubmittedData extends DomicileFormSchema {
  photoUrl: string;
}

export default function Home() {
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleFormSubmit = (data: SubmittedData) => {
    setSubmittedData(data);
  };

  if (submittedData) {
    return <DomicilePDF data={submittedData} />;
  }

  return (
    <main className="min-h-screen text-foreground bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold text-primary tracking-tight sm:text-5xl">DomicileEase</h1>
          <p className="text-muted-foreground mt-2 text-lg">जन निवास प्रमाण पत्र आवेदन</p>
        </header>
        <DomicileForm onSubmitSuccess={handleFormSubmit} />
      </div>
    </main>
  );
}
