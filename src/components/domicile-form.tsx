'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { domicileFormSchema, type DomicileFormSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Image as ImageIcon, XCircle, CheckCircle } from 'lucide-react';

interface DomicileFormProps {
  onSubmitSuccess: (data: DomicileFormSchema & { photoUrl: string }) => void;
}

export default function DomicileForm({ onSubmitSuccess }: DomicileFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const form = useForm<DomicileFormSchema>({
    resolver: zodResolver(domicileFormSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      district: '',
      sbd: '',
      thana: '',
      avedan: '',
      kram: '',
      name: '',
      hname: '',
      selectedOption: '',
      fname: '',
      mname: '',
      house: '',
      mohalla: '',
      village: '',
      officer: '',
      address: '',
      vle: '',
    },
  });

  useEffect(() => {
    const generateRandomNumber = () => {
      const prefix = '2618000'; // First seven digits
      const prefix1 = '5052'
      const remainingLength = 15 - prefix.length; // Calculate remaining length
      const remainingLength1 = 12 - prefix1.length;
      // Generate remaining random digits
      let randomDigits = '';
      for (let i = 0; i < remainingLength; i++) {
        randomDigits += Math.floor(Math.random() * 10); // Append random digits
      }
      let randomDigits1 = '';
      for (let i = 0; i < remainingLength1; i++) {
        randomDigits1 += Math.floor(Math.random() * 10); // Append random digits
      }
      const fullNumber = prefix + randomDigits; // Concatenate prefix with random digits
      const fullNumber1 = prefix1 + randomDigits1;
      form.setValue('avedan', fullNumber);
      form.setValue('kram', fullNumber1);
    };
    generateRandomNumber();
  }, [form]);

  const onSubmit = (values: DomicileFormSchema) => {
    if (!photoUrl) {
      toast({
        title: 'Error',
        description: 'Please upload a photo before submitting.',
        variant: 'destructive',
      });
      return;
    }
    onSubmitSuccess({ ...values, photoUrl });
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        toast({ title: "Invalid File", description: "Please upload an image file.", variant: "destructive" });
        return;
    }

    setUploadStatus('uploading');
    setIsUploading(true);
    setUploadProgress(0);

    const reader = new FileReader();
    reader.onloadstart = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
    };
    reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
        setIsUploading(false);
        setUploadStatus('success');
    };
    reader.onerror = () => {
        setIsUploading(false);
        setUploadStatus('error');
        toast({ title: "Upload Failed", description: "There was an error reading the file.", variant: "destructive" });
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-center">Create Domicile Certificate</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>1. जारी दिनांक</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="district" render={({ field }) => (
                <FormItem><FormLabel>2. जिला</FormLabel><FormControl><Input placeholder="जिला हिन्दी में" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="sbd" render={({ field }) => (
                <FormItem><FormLabel>3. तहसील</FormLabel><FormControl><Input placeholder="तहसील हिन्दी में" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="thana" render={({ field }) => (
                <FormItem><FormLabel>4. थाना</FormLabel><FormControl><Input placeholder="थाना का नाम" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="avedan" render={({ field }) => (
                <FormItem><FormLabel>5. आवेदन क्रमांक</FormLabel><FormControl><Input type="text" placeholder="Application Number" {...field} readOnly /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="kram" render={({ field }) => (
                <FormItem><FormLabel>6. प्रमाण पत्र संख्या</FormLabel><FormControl><Input type="text" placeholder="Certificate Number" {...field} readOnly /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>7. नाम (English)</FormLabel><FormControl><Input placeholder="Enter name in English" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="hname" render={({ field }) => (
                <FormItem><FormLabel>8. नाम (हिंदी)</FormLabel><FormControl><Input placeholder="नाम हिंदी में" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
               <FormField control={form.control} name="selectedOption" render={({ field }) => (
                <FormItem><FormLabel>9. Select Parent</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select parent type" /></SelectTrigger></FormControl>
                  <SelectContent><SelectItem value="पत्नी">Husband</SelectItem><SelectItem value="पुत्र/पुत्री">Father</SelectItem></SelectContent>
                </Select><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="fname" render={({ field }) => (
                <FormItem><FormLabel>10. पिता/पति का नाम</FormLabel><FormControl><Input placeholder="पिता/पति का नाम हिन्दी में" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="mname" render={({ field }) => (
                <FormItem><FormLabel>11. माता का नाम</FormLabel><FormControl><Input placeholder="माता का नाम हिन्दी में" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="house" render={({ field }) => (
                <FormItem><FormLabel>12. मकान संख्या</FormLabel><FormControl><Input placeholder="मकान संख्या" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="mohalla" render={({ field }) => (
                <FormItem><FormLabel>13. मोहल्ला</FormLabel><FormControl><Input placeholder="मोहल्ला का नाम" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="village" render={({ field }) => (
                <FormItem><FormLabel>14. ग्राम</FormLabel><FormControl><Input placeholder="गाँव का नाम" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="officer" render={({ field }) => (
                <FormItem><FormLabel>15. Officer Name (SDM)</FormLabel><FormControl><Input placeholder="Enter SDM officer name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel>16. CSC Address</FormLabel><FormControl><Input placeholder="Enter CSC address" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="vle" render={({ field }) => (
                <FormItem><FormLabel>17. VLE Name</FormLabel><FormControl><Input placeholder="Enter VLE name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormItem className="md:col-span-2 lg:col-span-3">
                <FormLabel>18. Upload Photo</FormLabel>
                <FormControl>
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {uploadStatus === 'idle' && <><UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" /><p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p></>}
                      {uploadStatus === 'uploading' && <><Progress value={uploadProgress} className="w-48 mb-2" /><p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p></>}
                      {uploadStatus === 'error' && <><XCircle className="w-10 h-10 mb-3 text-destructive" /><p className="text-sm text-destructive">Upload failed. Please try again.</p></>}
                      {uploadStatus === 'success' && photoUrl && <>
                          <img src={photoUrl} alt="Preview" className="w-24 h-24 object-cover rounded-md mb-2" />
                          <p className="text-sm text-green-600 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Photo uploaded successfully</p>
                      </>}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                  </label>
                </FormControl>
              </FormItem>
            </div>
            <div className="flex justify-center pt-4">
              <Button type="submit" size="lg" disabled={isUploading || !photoUrl}>
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    