import axios from 'axios';
import Store from '../Store';
import {updateCounters} from "../../helpers/common";


const onMount = async () => {
    let data = JSON.parse(sessionStorage.getItem('boardData'));
    if (!data) {
        const host = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        })
        const response = await host.get('api/info');
        if (response && response.status === 200 && response.data && response.data.schedule) {
            data = response.data.schedule;
        }
    }
    if (data) {
        const state = Store().getState().workTime;
        Store().dispatch({
            type: 'workTime',
            payload: () => {
                state.schedule = { ...data }
                state.load.rows = [ ...updateCounters(state.schedule.rows) ];
                state.load = { ...state.load };
                return { ...state };
            }
        });
    }
};

export default onMount;