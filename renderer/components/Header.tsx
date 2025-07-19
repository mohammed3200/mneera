import Image from 'next/image'


export const Header = () => {
  return (
    <div className='w-full flex flex-row items-center justify-between p-8 '>
      <div className='flex flex-col justify-center items-center'>
        <p className='font-din-regular text-gray-100 text-right text-2xl'>
          دولة ليبيا
        </p>
        <p className='font-din-regular text-gray-100 text-right text-2xl'>
          المجلس العسكري
        </p>
        <p className='font-din-regular text-gray-100 text-right text-2xl'>
          لثوار مصراتة
        </p>
      </div>
      <Image
        src={"/assets/logo.png"}
        alt='Logo'
        width={80}
        height={80}
        className='h-36 object-cover w-auto'
      />
    </div>
  )
}

