"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */


import { Header, RootLayout, SubmitButton } from '@/renderer/components'
import { LogIn } from '@/renderer/lib'
import { zodResolver } from '@hookform/resolvers/zod';
import { AdminFormValidation } from '@/renderer/lib/validation';
import { useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { Input } from '@/renderer/components/ui/input';
import { Form, FormField, FormLabel, FormItem, FormControl, FormMessage } from '@/renderer/components/ui/form';


const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const form = useForm<z.infer<typeof AdminFormValidation>>({
    resolver: zodResolver(AdminFormValidation),
    defaultValues: {
      username: "",
      password: ""
    },
  });

  const onSubmit = (values: z.infer<typeof AdminFormValidation>) => {
    setIsLoading(true);
    try {
      if (LogIn(values.username, values.password)) return router.replace("/dashboard");
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <RootLayout>
      <div className="grid grid-rows-3 w-full flex-col">
        <Header />
        <div className='flex flex-col h-full justify-center items-center row-span-2'>
          <p className="font-din-bold text-zinc-200 text-center text-4xl">تسجيل الدخول</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full px-4 space-y-8"
            >
              <div className='w-full flex-col justify-center px-10 space-y-6'>
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم المستخدم</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder='اسم المستخدم'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>كلمة المرور</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder='كلمة المرور'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {errorMessage &&
                (<div className='w-full flex flex-row items-center justify-center'>
                  <p className='font-din-bold text-red-700 text-right text-lg'>{errorMessage}</p>
                </div>)}
              <div className='w-full flex flex-row px-64 justify-center items-center'>
                <SubmitButton
                  isLoading={isLoading}
                  className='w-full border border-gray-200 text-gray-300 rounded-full bg-transparent hover:bg-blue-700 hover:border-none items-center justify-center py-6 mt-5 justify-self-center self-center duration-500 transition-all ease-out'>
                  <p className='font-din-bold text-md text-right'> تسجيل الدخول</p>
                </SubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </RootLayout>
  )
}

export default Login
