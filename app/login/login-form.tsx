'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpDialog } from './signUp-dialog';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email addres'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
    },
  });

  const [disabledUntil, setDisabledUntil] = useState<number | null>(null);
  const [lastEmail, setLastEmail] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  const isDisabled = disabledUntil && Date.now() < disabledUntil;

  function startCooldown(email: string) {
    const expire = Date.now() + 60000;
    setDisabledUntil(expire);
    setLastEmail(email);

    const interval = setInterval(() => {
      const diff = Math.ceil((expire - Date.now()) / 1000);
      if (diff <= 0) {
        clearInterval(interval);
        setDisabledUntil(null);
        setRemaining(0);
      } else {
        setRemaining(diff);
      }
    }, 1000);
  }

  function onSubmit(values: LoginFormValues) {
    if (
      lastEmail === values.email &&
      disabledUntil &&
      Date.now() < disabledUntil
    ) {
      return;
    }

    startCooldown(values.email);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <form id="email-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">Welcome to WorkSpace</h1>
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email-login">Email</FieldLabel>
                <Input
                  {...field}
                  id="email-login"
                  aria-invalid={fieldState.invalid}
                  placeholder="Login button not working on mobile"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field>
            <Button
              type="submit"
              form="email-form"
              disabled={isDisabled || false}
            >
              {isDisabled ? `Wait ${remaining}s` : 'Login'}
            </Button>
          </Field>
        </FieldGroup>
      </form>

      <FieldSeparator>Or</FieldSeparator>

      <Field className="grid gap-4 sm:grid-cols-2">
        <Button variant="outline" type="button">
          Continue with Google
        </Button>
        <SignUpDialog />
      </Field>
    </div>
  );
}
