import 'libs/_styles_/bin/Aside.scss';

import { FaHome, FaBriefcase, FaUserInjured } from "react-icons/fa";
import { useListenerScrollActions } from "libs/context/ListenerScrollContext";



function Header() {
    const {toScroll} = useListenerScrollActions();
    
    return (   
        <aside className='Aside'>
            <ul className='Aside-nav'>
                <li 
                    data-name="Главная" 
                    onClick={() => toScroll(1)}
                    className='Aside-nav-item'> 
                        <FaHome/>
                </li>
                <li 
                    data-name="Проекты" 
                    onClick={() => toScroll(2)}
                    className='Aside-nav-item'> 
                        <FaBriefcase/>
                </li>
                <li 
                    data-name="О себе" 
                    onClick={() => toScroll(3)}
                    className='Aside-nav-item'> 
                        <FaUserInjured/>
                </li>
            </ul>
        </aside>
    );
}

export default Header;