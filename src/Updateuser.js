import axios from 'axios';
import { backendurl } from './BackEndUrl';

const UpdateUser = async () => {
    try {
        const response = await axios.get(`${backendurl}/auth/updateuser`, { withCredentials: true });
        if (response.data ==='notlog') {
          return 'notlog';
        } else if (response.data==='connectionerror'){
            return 'connectionerror';
        }
        else if(response.data) {
            return response.data;
        }
        else {
            return 'connectionerror';
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return 'connectionerror';

    }
};
export default UpdateUser;