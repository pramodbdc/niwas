'use client';
import { useState, useEffect } from 'react';
import DomicileForm from '@/components/domicile-form';
import DomicilePDF from '@/components/domicile-pdf';
import type { DomicileFormSchema } from '@/lib/validators';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface SubmittedData extends DomicileFormSchema {
  photoUrl: string;
}

export default function Home() {
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleFormSubmit = (data: SubmittedData) => {
    setSubmittedData(data);
  };
  
  useEffect(() => {
    if (submittedData) {
      const input = document.getElementById('printable-area');
      if (input) {
        html2canvas(input, {
          useCORS: true,
          scale: 2, 
        }).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
          });
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;
          const ratio = canvasWidth / canvasHeight;
          const width = pdfWidth;
          const height = width / ratio;

          let position = 0;
          if (height > pdfHeight) {
             position = (height - pdfHeight)/2;
          }

          pdf.addImage(imgData, 'PNG', 0, -position, width, height);
          pdf.save('niwas.pdf');
          setSubmittedData(null);
        });
      }
    }
  }, [submittedData]);

  const handleBackToForm = () => {
    setSubmittedData(null);
  }

  return (
    <main className="min-h-screen text-foreground">
      <div className="container mx-auto px-4 py-8">
        {submittedData && (
          <div className="fixed -z-10 -left-[9999px] top-0">
            <DomicilePDF data={submittedData} onBack={handleBackToForm} />
          </div>
        )}
        <header className="text-center mb-8">
          <h1 className="font-headline text-4xl font-bold text-primary tracking-tight sm:text-5xl">DomicileEase</h1>
          <p className="text-muted-foreground mt-2 text-lg">जन निवास प्रमाण पत्र आवेदन</p>
        </header>
        <DomicileForm onSubmitSuccess={handleFormSubmit} />
      </div>
    </main>
  );
}
