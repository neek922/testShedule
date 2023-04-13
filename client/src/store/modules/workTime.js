import {getLoad, getSchedule} from "../../helpers/common";

const schedule = getSchedule();
const load = getLoad();

export const initialState = () => ({
    schedule,
    load
});

const workTime = (currentState = initialState(), action) => {
    return (action.type === 'workTime')
        ? action.payload()
        : currentState;

};

export	default workTime;