import { FaConciergeBell, FaCocktail, FaMusic, FaTheaterMasks, FaRunning, FaReact, FaBible, FaGamepad, FaTag } from 'react-icons/fa'

export const categories = [
    { name: 'Festa', cod: 1, icon: <FaCocktail color='black' size='40px' />},
    { name: 'Show', cod: 2, icon: <FaMusic color='black' size='40px' />},
    { name: 'Arte', cod: 3, icon: <FaTheaterMasks color='black' size='40px' />},
    { name: 'Esporte', cod: 4, icon: <FaRunning color='black' size='40px' />},
    { name: 'Gastronomia', cod: 5, icon: <FaConciergeBell color='black' size='40px' />},
    { name: 'Tecnologia', cod: 6, icon: <FaReact color='black' size='40px' />},
    { name: 'Religioso', cod: 7, icon: <FaBible color='black' size='40px' />},
    { name: 'Games', cod: 8, icon: <FaGamepad color='black' size='40px' />},
    { name: 'Outros', cod: 9, icon: <FaTag color='black' size='40px' />}
]