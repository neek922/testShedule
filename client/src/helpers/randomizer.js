import {
    AFTERNOON,
    CLEAR,
    JOBS,
    LUNCH,
    MAX_SHIFTS_AFTERNOON, MAX_SHIFTS_DAY,
    MAX_SHIFTS_LUNCH,
    MAX_SHIFTS_MORNING, MAX_SHIFTS_WEEK,
    MORNING,
    WORKERS,
    WORKING_DAYS
} from "./constants";

const wrkrsList = WORKERS.filter(el => el !== CLEAR);
let rules = { };

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const getRandomWorker =  (weekDay, job) => {
    let worker = wrkrsList[randomInteger(0, wrkrsList.length - 1)];
    let list = [...wrkrsList];
    for (let i = 0; i < wrkrsList.length; i++) {
        if (job.startsWith(LUNCH)) {
            if (rules[worker][weekDay].lunch < MAX_SHIFTS_LUNCH) {
                rules[worker][weekDay].lunch += 1;
                return worker;
            } else {
                list.filter(el => el !== worker);
                worker = list[randomInteger(0, list.length - 1)];
            }
        } else {
            if (rules[worker].week < MAX_SHIFTS_WEEK && rules[worker][weekDay].day < MAX_SHIFTS_DAY) {
                if (job.startsWith(MORNING)) {
                    if (rules[worker][weekDay].morning < MAX_SHIFTS_MORNING) {
                        rules[worker][weekDay].morning += 1;
                        rules[worker][weekDay].day += 1;
                        rules[worker].week += 1;
                        return worker;
                    } else {
                        list.filter(el => el !== worker);
                        worker = list[randomInteger(0, list.length - 1)];
                    }
                } else if (job.startsWith(AFTERNOON)) {
                    if (rules[worker][weekDay].afternoon < MAX_SHIFTS_AFTERNOON) {
                        rules[worker][weekDay].afternoon += 1;
                        rules[worker][weekDay].day += 1;
                        rules[worker].week += 1;
                        return worker;
                    } else {
                        list.filter(el => el !== worker);
                        worker = list[randomInteger(0, list.length - 1)];
                    }
                }
            } else {
                list.filter(el => el !== worker);
                worker = list[randomInteger(0, list.length - 1)];
            }
        }
    }
    return null;
}

const getRandomData =  (keys, job) => {
    const result = {};
    for (const weekDay of keys) {
        result[weekDay] =  getRandomWorker(weekDay, job);
    }
    return result;
}

const getRulesTmp = () => {
    return {
        lunch: 0,
        day: 0,
        morning: 0,
        afternoon: 0
    }
}

export const getRandomSchedule =  () => {
    const columns = [{field: 'jobs', headerName: ' ', width: 170, sortable: false, flex: 1}]
    const rows = []
    const template = {};
    const rulesTmp = {};

    WORKING_DAYS.forEach(day => {
        columns.push({
            field: day,
            width: 170,
            sortable: false,
            flex: 1
        })
        template[day] = null;
        rulesTmp[day] = getRulesTmp();
    });

    for (const worker of wrkrsList) {
        rules[worker] =  JSON.parse(JSON.stringify({
            week: 0,
            ...rulesTmp
        }));
    }

    for (const job of JOBS) {
        const index = JOBS.indexOf(job);
        rows.push({
            id: index,
            jobs: job,
            ...getRandomData(Object.keys(template), job)
        })
    }
    return {rows, columns};
}