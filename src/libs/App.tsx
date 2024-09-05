import Header from "./components/Header";
import Aside from "./components/Aside";
import Main from "./components/Main";
import Footer from "./components/Footer";
import {useEffect} from "react";

import { useListenerScrollActions } from "./context/ListenerScrollContext";
import { isLoadingData } from "./context/APIContext";
import LoadingPage from "./UI/LoadingPage";

function App() {
    const listenerScrollActions = useListenerScrollActions();
    const isLoading = isLoadingData();


    useEffect(() => {
        if(!isLoading) {
            listenerScrollActions.setCurrNameSection("Главная");
            listenerScrollActions.initSections();
            listenerScrollActions.addListenerByScroll(); 
        }
               
    }, [isLoading])

    return ( 
        isLoading 
        ? <LoadingPage/>
        : (
            <>
                <Header/>
                <Aside/>
                <Main/>
                <Footer/>
            </>
        )
     );
}

export default App;