import { createRoot } from 'react-dom/client';
import ListenerScrollProvider from "libs/context/ListenerScrollContext";
import ApiProvider from 'libs/context/APIContext';
import App from 'libs/App';

import 'libs/_styles_/index.scss';

createRoot(document.getElementById('root')!).render(
    <ApiProvider>
        <ListenerScrollProvider>
            <App/>
        </ListenerScrollProvider>
    </ApiProvider>
    
);
