import 'libs/_styles_/bin/Home.scss';
import { useListenerScrollActions } from "libs/context/ListenerScrollContext";

function Home({name}:{name: string}) {
    
    const {toScroll} = useListenerScrollActions();

    return (  
        <div className='Home' data-name={name}>
            <div className="Home-text">
                <h1>
                    я веб<span>-дизайнер</span> и фронтенд<span>-разработчик</span> 
                </h1>
                <p>
                    Разрабатываю уникальные веб-сайты, объединяющие креативность и инновационные решения.😎🎉
                </p>
                <button onClick={() => toScroll(2)}>проекты</button>
            </div>
            <img className='Home-hero' src="/imgs/Hero.png"/>
        </div>
    );
}

export default Home;