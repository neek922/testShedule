import axios from 'axios';
import Store from '../Store';

const handleSaveDesk = async () => {
    const host = axios.create({
        baseURL: process.env.REACT_APP_API_URL
    })
    const schedule = Store().getState().workTime.schedule;
    await sessionStorage.setItem('boardData', JSON.stringify(schedule));
    const response = await host.post('api/info', {schedule});
    if (response && response.status === 200) {
        alert('DATA SAVED');
    } else {
        alert('ERROR');
        console.log(response);
    }
};

export default handleSaveDesk;