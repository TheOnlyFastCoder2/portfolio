import React,{ useEffect, useRef, useState } from "react";

const ListenerScrollContext = React.createContext<null|{
    data: IData,
    actions: IActions
}>(null);


function getPosY(parent:HTMLDivElement, child:HTMLDivElement): number {
    return child.getBoundingClientRect().top - parent.getBoundingClientRect().top
}

export default function ListenerScrollProvider({children}: Props) {
    const stepScroll = 20;
    const [_, setCurrNameSection] = useState("");
    const data = useRef<IData>({
        posY: 0,
        prevInd: 1,
        timeID: null,
        sections: null,
        currNameSection: null,
        refWrapper: useRef<HTMLDivElement|null>(null)
    })

    useEffect(() => {
        return () => {
            clearInterval(data.current.timeID!);
        }
    }, []);

    const actions = {
        setCurrNameSection(name: string) {
            data.current.currNameSection = name;
            setCurrNameSection(name);
        },

        initSections(): HTMLDivElement {
            const div = (data.current.refWrapper.current! as HTMLDivElement);
            data.current.sections = [...div.children].map((item) => {
                const domEl:HTMLDivElement = item as HTMLDivElement;
                return {
                    name: domEl.getAttribute('data-name')!,
                    posY: getPosY(div, domEl),
                };
            })
    
            return div;
        },
        
        addListenerResizedWindow() {
            window.onresize = () => {
                const {sections, prevInd} = data.current;
                actions.initSections();
                actions.addListenerByScroll();
                
                if(prevInd) {
                    data.current.refWrapper.current!.parentElement!.scrollTo({
                        top: sections![(prevInd-1||0)].posY,
                        behavior: "smooth",
                     });
                }
            }
        },
        
        addListenerByScroll() {
            if(data.current.refWrapper.current != null) {
                data.current.refWrapper.current.parentElement!.onscroll = (e) => {
                    const {scrollTop}  = (e.target as HTMLDivElement);
                    data.current.sections?.forEach(({name, posY}) => {
                        if( posY <= scrollTop) {
                            actions.setCurrNameSection(name);
                        }
                    })
                }
            }
        },
        
        toScroll(currInd:number) {
            try {
                clearInterval(data.current.timeID!);
                const div = actions.initSections();
                const checkpoint = data.current.sections![currInd-1].posY;
                const offsetTop = Math.abs(checkpoint - div.parentElement!.scrollTop);
                 
                if(currInd === data.current.prevInd && offsetTop < stepScroll) return;
                const timeID = setInterval(() => {
                    const {prevInd, posY} = data.current;
        
                    if(prevInd != null) {
        
                        prevInd < currInd
                        ? data.current.posY += stepScroll
                        : data.current.posY -= stepScroll;
        
                        if(checkpoint < posY && prevInd <= currInd) {
                            data.current.prevInd = currInd;
                            clearInterval(timeID!);
                        }
                        else if(checkpoint > posY-stepScroll && prevInd >= currInd) {
                            data.current.prevInd = currInd;
                            clearInterval(timeID!);
                        }
                    }
        
                    if(prevInd === null) {
                        data.current.posY += stepScroll;
                        if(checkpoint < posY) {
                            data.current.prevInd = currInd;
                            clearInterval(timeID!);
                        }
                    }
        
                    div.parentElement!.scrollTo({
                        top: posY,
                        behavior: "auto"
                    });
                }, 10)
            } catch (error) {
                console.error("Нет такого элемента в родителе: Неправильный индекс");
            }
            
        }
    }
    
    return (
        <ListenerScrollContext.Provider value={{
            data:data.current,
            actions: actions,
        }}>
            {children}
        </ListenerScrollContext.Provider>
    )
}


export function useListenerScrollState(): IData {
    return React.useContext(ListenerScrollContext)!.data
}

export function useListenerScrollActions(): IActions {
    return React.useContext(ListenerScrollContext)!.actions
}


interface Props {
    children: React.ReactNode
}

export interface IActions {
    initSections: () => void;
    addListenerResizedWindow:  () => void;
    addListenerByScroll: () => void;
    toScroll: (indSection:number) => void;
    setCurrNameSection: (name: string) => void
}

interface ISections {
    name: string;
    posY: number;
}

interface IData {
    posY: number;
    prevInd: number;
    timeID: NodeJS.Timeout|null;
    sections: null|ISections[];
    currNameSection: null|string,
    refWrapper: React.MutableRefObject<HTMLDivElement | null>;
}
