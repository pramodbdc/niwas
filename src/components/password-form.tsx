'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const passwordSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});

type PasswordFormSchema = z.infer<typeof passwordSchema>;

interface PasswordFormProps {
  onSuccess: () => void;
}

export default function PasswordForm({ onSuccess }: PasswordFormProps) {
  const { toast } = useToast();
  const form = useForm<PasswordFormSchema>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: PasswordFormSchema) => {
    if (values.password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
      onSuccess();
    } else {
      toast({
        title: 'Error',
        description: 'Incorrect password. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center text-foreground bg-background">
      <Card className="w-full max-w-sm mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">Enter Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button type="submit">
                  Enter
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
