import 'libs/_styles_/bin/Projects.scss';
import { FaGithub, FaLink, FaInfoCircle, FaWindowClose } from "react-icons/fa";
import { useApiState } from 'libs/context/APIContext';
import { typesOfProjects, TProjects, IProject} from 'libs/utils/Api';
import { useEffect, useRef, useState, useTransition } from 'react';
import LoadingPage from 'libs/UI/LoadingPage';

// import Markdown from 'react-markdown';
// import remarkGfm from 'remark-gfm'
import MarkdownPreview from '@uiw/react-markdown-preview';

const typesOfProjectsCopy = ['all', ...typesOfProjects] as const;

function Projects({name}:{name: string}) {
    const api = useApiState();
    const refCount = useRef<number>(0);
    const refContainer = useRef<HTMLDivElement>(null);
    const refReadmeActions = useRef<Partial<IPropsActions>>({});
    const [tag, setTag] = useState<TProjects | 'all'>("all");
    const projects = api.Projects.filter(({type}) => tag === 'all' ? true : tag === type);

    function checkIsLoadedImage() {
        refCount.current++;
        if(refCount.current >= api.Projects.length) {
            refContainer.current?.classList.add('__loaded');
        } 
    }

    return (  
        <>
        <ReadMe actions={refReadmeActions} />
        <div className='Projects' data-name={name}>
            <ul className="Projects__filter" id="Projects__filter">
                {typesOfProjectsCopy.map((type: TProjects | 'all') => {
                    const isActive = type === tag ? '__active': '';
                    return (
                        <li key={type} onClick={setTag.bind(null, type)}>
                            <span className={`Projects__filter-tag ${isActive}`}>{isActive && <>🏷️</>} {type}</span>
                        </li>
                    )
                })}
            </ul>
            <div ref={refContainer} className="container scrollbar">
                {
                    projects.map(({srcImg, github, website, type, srcReadme}, i) => {
                        const isActive = tag === 'all' ? '__active': '';

                        return (
                            <div  key={i} className={`Projects-item ${isActive}`}>
                                {tag === 'all' && <span className='Projects-item-tag'>{type}</span>}
                                <span onClick={refReadmeActions.current.toOpen?.bind(null, srcReadme)} title='описание' className='Projects-item-info'> <FaInfoCircle/> </span>
                                <img src={srcImg} alt="" onLoad={checkIsLoadedImage} loading="lazy"/>
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
        </>
    );
}


export default Projects;

interface IPropsActions {
    toOpen: (url:IProject["srcReadme"]) => void,
    toClose: () => void,
}
interface IPropsReadMe {
    actions: React.RefObject<Partial<IPropsActions>>
}

function ReadMe({ actions }:IPropsReadMe) {
    const [data, setData] = useState<string>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    

    const toClose = () => {setIsOpen(false)};
    const toOpen = async (url:IProject["srcReadme"]) => {
        setIsOpen(true);
        startTransition(async () => {
            try {
                const response = await fetch(url);
                const text = await response.text();
                setData(text)
            } catch (err) {
                console.error("error:fetch readme:", err)
            }
        })
    };

    useEffect(() => {
        if(actions.current) {
            actions.current.toOpen = toOpen;
            actions.current.toClose = toClose;
        }
    }, []);

    return isOpen && (
        <div className="ReadMe __not">
            <div className="ReadMe-bar">
                <span onClick={toClose}><FaWindowClose/></span>
            </div>
            <div className="ReadMe-container">
                <h3>README.md</h3>
                <div className={`wrapper ${isPending ? '__pending': '__loaded'}`}>
                    {(
                        isPending 
                        ? <LoadingPage/>
                        : (
                            <MarkdownPreview  
                                source={data} 
                                wrapperElement={{"data-color-mode": "light"}}
                            />
                        )
                    
                    )}
                </div>
            </div>
        </div>
    )
}