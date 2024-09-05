import 'libs/_styles_/bin/Footer.scss';

import { FaVk, FaTelegram, FaDiscord, FaGithub } from "react-icons/fa";
import { useApiState } from 'libs/context/APIContext';


function Header() {
    const api = useApiState();
    
    return (  
        <footer className='Footer'>
            <ul className='Footer-contacts'>
                <li className='Footer-contacts-item'><a href={api.contacts.discord} target='_blank'> <FaDiscord/></a></li> 
                <li className='Footer-contacts-item'><a href={api.contacts.github} target='_blank'><FaGithub/></a></li> 
                <li className='Footer-contacts-item'><a href={api.contacts.telegram} target='_blank'><FaTelegram/></a></li> 
                <li className='Footer-contacts-item'><a href={api.contacts.vk} target='_blank'><FaVk/></a></li> 
            </ul>
        </footer>
    );
}

export default Header;