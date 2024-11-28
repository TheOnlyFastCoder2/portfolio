import 'libs/_styles_/bin/Projects.scss';
import { FaGithub, FaLink } from "react-icons/fa";
import { useApiState } from 'libs/context/APIContext';


function Projects({name}:{name: string}) {
    const api = useApiState();

    return (  
        <div className='Projects' data-name={name}>
            <div className="container scrollbar">
                {
                    api.Projects.map(({srcImg, github, website}, i) => {
                        return (
                            <div  key={i} className="Projects-item">
                                <img src={srcImg} alt="" loading="lazy"/>
                                <div className="Projects-item-bar">
                                    <a href={github} className='Projects-item-bar-button' target="_blank"><FaGithub/> репозиторий</a>
                                    <a href={website} className='Projects-item-bar-button' target="_blank"><FaLink/> сайт</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Projects;