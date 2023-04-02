import React from 'react'
import Link from 'next/link';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/router';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function NavBar() {
  const user = useSelector((state: RootState) => state.user)
  const router = useRouter().pathname;
  console.log(router)

  const listenPathRoute = () => {
    if(router.includes("/miseventos")){
      return "miseventos"
    }else if(router.includes("/") || router.includes("/eventos")){
      return "eventos"
    }
  }

  return (
    <div className='w-screen bg-white z-50 p-4 flex fixed bottom-0 items-center justify-around text-xs'>
      <Link href={"/"}>
        <div className={`flex flex-col items-center ${listenPathRoute() === "eventos" && "text-orange-400"}`}>
          <FormatListBulletedIcon />
          <span>Eventos</span>
        </div>
      </Link>
      <Link href={"/miseventos"}>
        <div className={`flex flex-col items-center ${listenPathRoute() === "miseventos" && "text-orange-400"}`}>
          <BookmarkAddedIcon />
          <span>Mis Eventos</span>
        </div>
      </Link>
      <Link href={"/profile"}>
        <div className={`flex flex-col items-center`}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar sx={{ width: 36, height: 36 }} className="bg-orange-400" alt="Miguel A" src='hola' />
          </StyledBadge>
          <span>{user?.first_name}</span>
        </div>
      </Link>
    </div>
  )
}
