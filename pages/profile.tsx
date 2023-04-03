import React, { useEffect, useState } from 'react'

import NavBar from '@/components/NavBar'
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import { Badge, FormControl, InputAdornment, InputLabel, OutlinedInput, Skeleton } from '@mui/material';

import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';

const StyledBadge: any = styled(Badge)(({ theme }) => ({
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

interface Interest {
    Id: number
    Id_Evento: number,
    Id_Interes: number,
    name_evento: string,
    descripcion_evento: string,
    fecha_evento: Date,
    Tipo: string
}

function Profile() {

    const [interests, setinterests] = useState<Interest[]>([]);
    const intereses = {
        "Programacion": "💻",
        "Escritura": "📝",
        "Lectura": "📖",
        "Artes Visuales": "👀",
        "Deportes": "🏀",
        "Aire Libre": "🍃",
        "Artes Marciales": "🥊",
        "Juegos": "🎮",
        "Musica": "🎧",
        "Artes": "🎱",
        "Fotografia": "📷",
        "Idiomas": "🕵"
    }

    const [visibility, setVisibility] = useState(false);
    const [newIntereses, setNewIntereses] = useState([]);
    const [prueba, setPrueba] = useState(false);
    const [active, setActive] = useState(true);
    const user = useSelector((state: RootState) => state.user)

    useEffect(() => {
        axios.get("https://proactiveweek-superbrandon2018.b4a.run/users/interest/" + user.email).then(response => {
            console.log(response.data.body);
            setPrueba(true);
            setinterests(response.data.body);
        }).catch(error => {
            console.log(error);
        })

    }, [])

    return (
        <div className=''>
            <div className='flex flex-col items-center justify-center h-screen space-y-10'>
                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ width: 100, height: 100, fontSize: 40 }} className="bg-orange-400" alt={user.first_name} src='hola' />
                </StyledBadge>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-nombre">Nombre</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-nombre"
                        className=''
                        defaultValue={user?.first_name}
                        onKeyUp={() => setActive(false)}
                        // onChange={(e) => user.current = e.target.value}
                        type="text"
                        endAdornment={
                            <InputAdornment position="end">
                                <PersonIcon className='text-orange-400' />
                            </InputAdornment>
                        }
                        label="Materia"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-correo">Correo</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-correo"
                        className='lowercase'
                        defaultValue={user?.email}
                        onKeyUp={() => setActive(false)}
                        type="text"
                        endAdornment={
                            <InputAdornment position="end">
                                <EmailIcon className='text-orange-400' />
                            </InputAdornment>
                        }
                        label="Correo"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        className=''
                        defaultValue={user?.password}
                        onKeyUp={() => setActive(false)}
                        type={visibility ? "text" : "password"}
                        endAdornment={
                            <InputAdornment onClick={() => setVisibility(!visibility)} position="end">
                                <LockIcon className='text-orange-400' />
                            </InputAdornment>
                        }
                        label="Contraseña"
                    />
                </FormControl>
                {
                    prueba ?
                        <div className='flex items-center space-x-2 mt-4'>
                            {interests?.map(interest => {
                                return (
                                    <div className='p-2 cursor-default bg-slate-50 bg-opacity-40 text-sm rounded-full flex items-center space-x-1' key={interest.Id_Interes}>
                                        <span>{intereses[(interest.Tipo) as keyof typeof intereses]}</span>
                                        <span>{interest.Tipo}</span>
                                    </div>
                                )
                            })}
                        </div>
                        :
                        (<div className='flex items-center space-x-2'>
                            {[1, 2, 3, 4, 5, 6].map(task => {
                                return (
                                    <Skeleton key={task} variant="rectangular" className='w-5 rounded-full my-3' height={20} />
                                )
                            })}
                        </div>
                        )
                }
                <div className='flex items-center space-x-4'>
                    <button onClick={() => console.log(user)} className='py-3 px-10 shadow-lg border rounded-lg bg-orange-400 text-white tracking-wider self-center disabled:opacity-60' disabled={active}>Guardar</button>
                    <button onClick={() => console.log(user)} className='py-3 px-10 shadow-lg border rounded-lg bg-white text-orange-400 border-orange-400 tracking-wider self-center disabled:opacity-60' disabled={active}>LogOut</button>
                </div>
            </div>
            <NavBar></NavBar>
        </div>
    )
}

export default Profile