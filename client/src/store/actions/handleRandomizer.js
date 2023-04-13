import Store from '../../store';
import React from 'react';
import {getRandomSchedule} from "../../helpers/randomizer";
import {updateCounters} from "../../helpers/common";

const handleRandomizer = async () => {
    const currentState = Store().getState().workTime;
    const randomData = getRandomSchedule();

    Store().dispatch({
        type: 'workTime',
        payload: () => {
            currentState.schedule = { ...randomData };
            currentState.load.rows = [...updateCounters(currentState.schedule.rows)];
            currentState.load = {...currentState.load};
            return {...currentState};
        }
    });
}

export default handleRandomizer;