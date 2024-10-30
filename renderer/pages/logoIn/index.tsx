/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CustomInput, SubmitButton,Header } from '@/renderer/components'
import { LogIn } from '@/renderer/lib'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


interface LoginProps {
  setIsSignIn: (IsSignIn: boolean) => void
}

const Login: React.FC<LoginProps> = ({ setIsSignIn }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async () => {
    setIsLoading(true)
    try {
      if (LogIn(userName, password)) setIsSignIn(true)
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col">

      <Header />

      <div className='h-full flex flex-col justify-center items-center'>
        <p className="font-din-bold text-zinc-200 text-center text-4xl">تسجيل الدخول</p>
        <form id="" className="flex-col justify-center mt-4">
          <div>
            <CustomInput
              placeholder="أدخل اسم المستخدم"
              className="pr-3 text-zinc-300 font-din-regular font-bold text-sm"
              onChange={(e) => setUserName(e.target.value)}
              isArabic
            />
          </div>
          <div>
            <CustomInput
              placeholder="كلمة المرور"
              className="pr-3 text-zinc-300 font-din-regular font-bold text-sm"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              isArabic
            />
          </div>
          <SubmitButton
            onClick={onSubmit}
            isLoading={isLoading}
            className="rounded-lg flex justify-center items-center w-full mt-14"
          >
            <p className="font-din-regular text-zinc-200 text-lg text-center p-2">الدخول</p>
          </SubmitButton>
        </form>
      </div>

    </div>
  )
}

export default Login
