
import React,{ useEffect , useState } from "react";
import Api from "libs/utils/Api";


type TApi = Api|null;
const ApiContext = React.createContext<TApi>(null);

export default function ApiProvider({children}: Props) {
    const [api, setApi] = useState<TApi>(null);
    useEffect(() => {
        let timeID:NodeJS.Timeout|null = null;
        const api = new Api();
        api.initApi().then((data) => {
            timeID = setTimeout(() => {
                api.setBD = data;
                setApi(api);
                clearTimeout(timeID!);
            }, 1000)
        })

        return () => {
            clearTimeout(timeID!);
        }
    }, []);

    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    )
}


export function useApiState(): Api {
    return React.useContext(ApiContext)!
}

export function isLoadingData(): boolean {
    return React.useContext(ApiContext) === null;
}

interface Props {
    children: React.ReactNode
}

