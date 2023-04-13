import Store from '../../store';
import React from 'react';
import {getLoad, getSchedule} from "../../helpers/common";

const handleClearDesk = () =>  {
    const currentState = Store().getState().workTime;

    Store().dispatch({
        type: 'workTime',
        payload: () => {
            currentState.schedule = getSchedule();
            currentState.schedule = { ...currentState.schedule };
            currentState.load = getLoad();
            currentState.load = { ...currentState.load };
            return { ...currentState };
        }
    });
}

export default handleClearDesk;