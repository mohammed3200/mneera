import { RootLayout } from '@/renderer/components/AppLayout'
import HeaderTitle from '@/renderer/components/HeaderTitle'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <RootLayout>
      <HeaderTitle title='تسجيل'/>
    </RootLayout>
  )
}

export default Page