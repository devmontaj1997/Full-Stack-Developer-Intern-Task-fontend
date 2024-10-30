

// craete tostify
import { toast} from 'react-toastify';

const createTostify =(msg, type="error") =>{
    toast[type](msg)

}

export default createTostify