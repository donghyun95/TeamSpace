import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type signUpFormValues = z.infer<typeof signUpSchema>;
const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email addres '),
  name: z
    .string()
    .min(2, 'Nickname must be at least 2 characters')
    .max(10, 'Nickname can be up to 10 characters')
    .regex(
      /^[a-zA-Z0-9가-힣]+$/,
      'Nickname can only contain Korean (Hangul), English letters, and numbers',
    ),
});

export function SignUpDialog() {
  const form = useForm<signUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });
  function onSubmit(values: signUpFormValues) {
    console.log(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          👤 Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white text-black border-gray-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800">
        <form id="signUp-form" onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Sign Up</DialogTitle>
            <DialogDescription>
              Sign up with only the minimum information.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-signup">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email-signup"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your Email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Field>
            <Field>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name-signup">NickName</FieldLabel>
                    <Input
                      {...field}
                      id="name-signup"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your NickName"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </Field>
          </FieldGroup>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
