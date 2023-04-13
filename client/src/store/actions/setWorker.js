import Store from '../../store';
import React from 'react';
import {updateCounters} from "../../helpers/common";
import {CLEAR} from "../../helpers/constants";

const setWorker = (value, index, title) =>  {
    const currentState = Store().getState().workTime;

    Store().dispatch({
        type: 'workTime',
        payload: () => {
            currentState.schedule.rows[index][title] = value === CLEAR ? null : value;
            currentState.schedule = { ...currentState.schedule };
            currentState.load.rows = [ ...updateCounters(currentState.schedule.rows) ];
            currentState.load = { ...currentState.load };
            return { ...currentState };
        }
    });
}

export default setWorker;