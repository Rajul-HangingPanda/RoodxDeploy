'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const formSchema = z.object({
  code: z.string().min(6, 'Code must be at least 6 characters'),
});

type FormData = z.infer<typeof formSchema>;

interface ForgotCodeFormProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ForgotCodeForm({ onNext, onBack }: ForgotCodeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // TODO: Implement API call to verify code
      console.log('Verifying code:', data.code);
      toast.success('Code verified successfully');
      onNext();
    } catch (error) {
      toast.error('Failed to verify code');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="code">Reset Code</Label>
        <Input
          id="code"
          type="text"
          placeholder="Enter the code sent to your email"
          {...register('code')}
        />
        {errors.code && (
          <p className="text-sm text-red-500">{errors.code.message}</p>
        )}
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </Button>
      </div>
    </form>
  );
} 