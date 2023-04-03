import React from 'react'
import Link from 'next/link';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';

export default function Header() {
    const user = useSelector((state: RootState) => state.user)
    const router = useRouter().pathname;
    console.log(router)

    const listenPathRoute = () => {
        if (router.includes("/miseventos")) {
            return "miseventos"
        } else if (router.includes("/") || router.includes("/eventos")) {
            return "eventos"
        }
    }

    return (
        <div className='w-screen bg-white z-50 p-4 px-8 flex fixed top-0 items-center justify-between text-xs'>
            <div className={`flex items-center`}>
                <ArrowBackIcon />
            </div>
            <Link href={"/miseventos"}>
                <div className={`flex items-center`}>
                    <SearchIcon />
                </div>
            </Link>
        </div>
    )
}
