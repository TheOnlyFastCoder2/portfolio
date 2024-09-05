import 'libs/_styles_/bin/Header.scss';
import { useListenerScrollState } from "libs/context/ListenerScrollContext";

function Header() {

    const {currNameSection} = useListenerScrollState();

    return (  
        <header className='Header'>
            <p className='Header-marquee'>Привет 🤗, добропожаловтаь на сайт 👉👈🥺</p>
            <h3 className='Header-namePage'>{currNameSection}</h3>
        </header>
    );
}

export default Header;