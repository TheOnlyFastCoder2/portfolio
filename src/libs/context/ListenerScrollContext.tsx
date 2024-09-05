
import React,{ useRef, useState } from "react";

const ListenerScrollContext = React.createContext<null|{
    data: IData,
    actions: IActions
}>(null);



export default function ListenerScrollProvider({children}: Props) {
    const [_, setCurrNameSection] = useState("");
    const data = useRef<IData>({
        posY: 0,
        prevInd: null,
        timeID: null,
        sections: null,
        currNameSection: null,
        refWrapper: useRef<HTMLDivElement|null>(null)
    })

    function getCSSProp(domEl: HTMLElement, prop: string): string {
        return getComputedStyle(domEl, null).getPropertyValue(prop);
    }

    const actions = {
        setCurrNameSection(name: string) {
            data.current.currNameSection = name;
            setCurrNameSection(name);
        },

        initSections(): HTMLDivElement {
            const div = (data.current.refWrapper.current! as HTMLDivElement);
            
            
            data.current.sections = [...div.children].map((item) => {
                const domEl:HTMLDivElement = item as HTMLDivElement;
                const posTop = domEl.offsetTop - (+parseInt(getCSSProp(domEl, "padding-bottom")))/2;
                const posY = posTop - div.offsetTop;
                return {
                    name: domEl.getAttribute('data-name')!,
                    posY: posY
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
                        top: sections![(prevInd-1??0)].posY,
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
                        if( posY*0.9  <= scrollTop) {
                            actions.setCurrNameSection(name);
                        }
                    })
                }
            }
        },
        
        toScroll(currInd:number) {
            try {
                const div = actions.initSections();
                const checkpoint = data.current.sections![currInd-1].posY;
        
                const timeID = setInterval(() => {
                    const {prevInd, posY} = data.current;
        
                    if(prevInd != null) {
        
                        prevInd <= currInd
                        ? data.current.posY += 20
                        : data.current.posY -= 20;
        
                        if(checkpoint <= posY && prevInd <= currInd) {
                            data.current.prevInd = currInd;
                            clearInterval(timeID!);
                        }
                        else if(checkpoint >= posY && prevInd >= currInd) {
                            data.current.prevInd = currInd;
                            clearInterval(timeID!);
                        }
                    }
        
                    if(prevInd === null) {
                        data.current.posY += 20;
                        if(checkpoint <= posY) {
                            data.current.prevInd = currInd;
                            clearInterval(timeID!);
                        }
                    }
        
                    div.parentElement!.scrollTo({
                        top: posY,
                        behavior: "smooth",
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
    prevInd: null|number;
    timeID: NodeJS.Timeout|null;
    sections: null|ISections[];
    currNameSection: null|string,
    refWrapper: React.MutableRefObject<HTMLDivElement | null>;
}
