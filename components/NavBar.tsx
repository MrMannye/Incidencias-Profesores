import React from 'react'
import Link from 'next/link';

import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { Badge } from '@mui/material';

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
  return (
    <div className='w-screen bg-white z-50 p-4 flex fixed bottom-0 items-center justify-around text-xs'>
      <Link href={"/"}>
        <div className='flex flex-col items-center'>
          <FormatListBulletedIcon />
          <span>Menu</span>
        </div>
      </Link>
      <Link href={"/profile"}>
        <div className='flex flex-col items-center'>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar sx={{ width: 36, height: 36 }} alt="Miguel A" src='hola' />
          </StyledBadge>
          <span>Perfil</span>
        </div>
      </Link>
    </div>
  )
}
