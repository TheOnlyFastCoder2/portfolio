import 'libs/_styles_/bin/Footer.scss';

import { FaVk, FaTelegram, FaDiscord, FaGithub } from "react-icons/fa";

function Header() {
    return (  
        <footer className='Footer'>
            <ul className='Footer-contacts'>
                <li className='Footer-contacts-item'><FaDiscord/></li>
                <li className='Footer-contacts-item'><FaGithub/></li>
                <li className='Footer-contacts-item'><FaTelegram/></li>
                <li className='Footer-contacts-item'><FaVk/></li>
            </ul>
        </footer>
    );
}

export default Header;