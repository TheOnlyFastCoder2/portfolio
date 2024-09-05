import 'libs/_styles_/bin/LoadingPage.scss';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function LoadingPage() {


    return (  
        <div className='LoadingPage'>
            <div>
                <AiOutlineLoading3Quarters className='LoadingPage-svg'/>
                <h2>Подожди пару секунд 🥱</h2>
            </div>
            <h4>Подгрузка данных...</h4>
        </div>
    );
}

export default LoadingPage;