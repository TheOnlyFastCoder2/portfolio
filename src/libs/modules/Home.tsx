import 'libs/_styles_/bin/Home.scss';
import { useListenerScrollActions } from "libs/context/ListenerScrollContext";

function Home({name}:{name: string}) {
    
    const {toScroll} = useListenerScrollActions();

    return (  
        <div className='Home' data-name={name}>
            <div className='Home-bg'>
                <img src="/imgs/bg.webp" alt="" loading='lazy'/>
            </div>
            <div className="Home-text">
                <h1>Превращаю <span>идеи</span> в реальность</h1>
                <p>
                    Вместе создадим успешное будущее вашего бизнеса — эффективно и результативно. 😁🎉
                </p>
                <button onClick={() => toScroll(2)}>проекты</button>
            </div>
            <img className='Home-hero' src="/imgs/Hero.png" loading='lazy'/>            
        </div>
    );
}

export default Home;