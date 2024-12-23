import 'libs/_styles_/bin/About.scss';
import { useState } from 'react';

import { useApiState } from 'libs/context/APIContext';


function About({name}:{name: string}) {
    const api = useApiState();
    const [currSkill, setCurrSkill] = useState(0);

    return (  
        <div className='About' data-name={name}>
           <div className="container">
                <div  lang="ru" className="About-story">
                    <h3>{api.AboutMe.story.headline}</h3>
                    <p  lang="ru">{api.AboutMe.story.text}</p>
                </div>
                <div className="About-skills">
                    <h3>скилы</h3>
                    <ul>
                        {api.skills.map(([skill], i) => {
                            const isActive = i === currSkill ? 'active' : '';
                            return <li key={i} className={isActive}  onClick={setCurrSkill.bind(null, i)}>{skill}</li>
                        })}
                    </ul>
                    <div className="About-skills-text">
                        <p>
                            {api.skills.map(([_,description], i) => {
                                return (
                                    i === currSkill && <span key={i}>{description}</span>
                                )
                            })}
                        </p>
                    </div>
                </div>
           </div>
        </div>
    );
}

export default About;


