import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { HeaderTitle, RootLayout } from '@/renderer/components';
import { MockDataBrigades, MockDataIndividuals } from '@/renderer/store/mock';

const PageIndividual = () => {
    const router = useRouter();
    const { id } = router.query; // Get the individual ID from the URL
    const Personal = MockDataIndividuals.filter((item) => item.id === id)[0];
    const Brigade = MockDataBrigades.filter(item => item.id == Personal.BrigadesId)[0].name;

    return (
        <RootLayout>
            <HeaderTitle title={"معلومات الفرد"} back="/individuals" />
            <div className='w-full h-full flex justify-center'>
                <div
                    className="flex flex-row py-4 px-8 gap-4 mx-auto bg-white rounded-xl shadow-lg space-y-2">
                    <div className="w-full h-full">
                        <Image
                            src={"https://picsum.photos/200/300"}
                            width={100}
                            height={100}
                            alt="Personal Face"
                            className="object-cover rounded-full h-24 w-24"
                        />
                    </div>
                    <div className="w-full space-y-2 text-right">
                        <div className="w-full space-y-0.5">
                            <div className='w-full flex flex-row justify-between items-center gap-4'>
                            <p className="text-lg text-gray-900 font-din-bold">
                                الاسم : <span className="text-base text-black font-din-regular">{Personal.name}</span>
                            </p>
                            <p className="text-lg text-gray-900 font-din-bold">
                                الكتيبة : <span className="text-base text-black font-din-regular">{Brigade}</span>
                            </p>
                            </div>
                            <p className='text-base text-gray-900 font-din-bold'>
                                رقم الوطني : <span className='text-base text-black font-din-regular'>{Personal.NationalNumber}</span>
                            </p>

                            <div className="w-full flex flex-row justify-between items-center gap-4 py-2">
                                <p className="text-base text-gray-900 font-din-bold text-nowrap">
                                    فصيلة الدم : {" "}
                                    <span className="text-white text-sm font-din-regular border rounded-full bg-red-500 border-transparent px-2 cursor-pointer">
                                        {Personal.BloodType}
                                    </span>
                                </p>
                                <p className='text-base text-gray-900 font-din-bold text-nowrap'>
                                    سنة الميلاد  :
                                    <span className='text-slate-800 text-sm'>
                                        {"1996 - 01 - 05"}
                                    </span>
                                </p>
                            </div>
                            <p className='text-base text-gray-900 font-din-bold pt-2'>
                                رقم الهاتف : <span className='text-base text-black font-din-regular'>{Personal.PhoneNumber}</span>
                            </p>
                            <div className='w-full flex flex-row justify-between items-center gap-4'>
                            <p className='text-base text-gray-900 font-din-bold pt-2 text-nowrap'>
                                نوع السلاح  : <span className='text-base text-black font-din-regular'>{Personal.WeaponType}</span>
                            </p>
                            <p className='text-base text-gray-900 font-din-bold pt-2 text-nowrap'>
                                مكان العمل  : <span className='text-base text-black font-din-regular'>{Personal.Workplace}</span>
                            </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
};
export default PageIndividual;