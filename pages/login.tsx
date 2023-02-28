import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'

import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Login() {

    const [visibility, setVisibility] = useState(false);

    return (
        <div className=' w-screen h-screen flex flex-col items-center justify-center'>
            <div className='max-w-sm flex space-y-6 flex-col items-center'>
                <h1 className='login tracking-wide text-lg'></h1>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-usuario">Usuario</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        className='text-white'
                        type="text"
                        startAdornment={
                            <InputAdornment position="start">
                                <PersonIcon className='text-black' />
                            </InputAdornment>
                        }
                        label="Usuario"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        className='text-white'
                        type={visibility ? "text" : "password"}
                        startAdornment={
                            <InputAdornment position="start">
                                <LockIcon className='text-black' />
                            </InputAdornment>
                        }
                        endAdornment={
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={() => setVisibility(!visibility)}
                            >
                                { visibility ? <VisibilityIcon className='text-black animate-pulse' /> : <VisibilityOffIcon className='text-black animate-pulse' />}
                            </IconButton>
                        }
                        label="Contraseña"
                    />
                </FormControl>
                <button className='py-3 px-20 rounded-lg bg-orange-400 tracking-wider'>Login</button>
            </div>
        </div>
    )
}
