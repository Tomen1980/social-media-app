'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation, useQuery } from "@tanstack/react-query"
import { LoginService } from "@/service/auth.service"


const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username or Email must be at least 2 characters.",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})
export default function Home() {

  const loginMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      return await LoginService(values);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        // Handle successful login
        if (data) {
          // Store token if needed
          console.log('Login successful');
        }
      },
      onError: (error) => {
        // Handle error
        form.setError('root', {
          type: 'manual',
          message: error.message
        });
      }
    });
  }

  return (
    <div className="bg-slate-600 h-screen flex items-center justify-center">
      <Card className="w-1/3">
        <CardHeader >
          <CardTitle className="text-center text-2xl">Login</CardTitle>
          {loginMutation.error && (
            <p className="text-red-500 text-center text-sm mt-2">
              {loginMutation.error.message}
            </p>
          )}
        </CardHeader>
        <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username or email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
            type="submit" 
            disabled={loginMutation.isPending}
            className="w-full"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
