/* eslint-disable @typescript-eslint/explicit-function-return-type */
const USERNAME = 'root'
const PASSWORD = 'root'

export const LogIn = (username: string, password: string) => {
  if (USERNAME === username && PASSWORD === password) {
    return true
  }
  throw new Error('يوجد خطاء في اسم المستخدم  أو كلمة المرور')
}
