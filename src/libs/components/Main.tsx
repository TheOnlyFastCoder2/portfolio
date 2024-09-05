import 'libs/_styles_/bin/Main.scss';
import Home from 'libs/modules/Home';
import Projects from 'libs/modules/Projects';
import About from 'libs/modules/About';

import { useListenerScrollState } from "libs/context/ListenerScrollContext";

function Main() {
    const {refWrapper} = useListenerScrollState();

    return (  
        <main className='Main scrollbar'>
            <div className="Main-content" ref={refWrapper}>
                <Home name="Главная"/>
                <Projects name="Проекты"/>
                <About name="О себе"/>
            </div>
        </main>
    );
}

export default Main;