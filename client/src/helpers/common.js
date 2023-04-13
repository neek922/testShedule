import {AFTERNOON, CLEAR, JOBS, LUNCH, MORNING, STAFF_MEMBER, TOTALS, WORKERS, WORKING_DAYS} from './constants';

export const getSchedule = () => {
    const columns = [{ field: 'jobs', headerName: ' ', width: 170, sortable: false, flex: 1}]
    const rows = []
    const template = {};

    WORKING_DAYS.forEach(day => {
        columns.push({
            field: day,
            width: 170,
            sortable: false,
            flex: 1
        })
        template[day] = null;
    });

    JOBS.forEach((job, index) => {
        rows.push({
            id: index,
            jobs: job,
            ...template
        })
    });

    return {rows, columns};
}

export const getLoad = () => {
    const columns = [{ field: STAFF_MEMBER, width: 170, sortable: false, flex: 1 }]
    const rows = []
    const template = {};

    WORKING_DAYS.forEach(day => {
        columns.push({
            field: day,
            width: 170,
            sortable: false,
            flex: 1
        })
        template[day] = 0;
    });
    columns.push({field: TOTALS, width: 170, sortable: false, flex: 1});

    WORKERS.forEach((worker, index) => {
        if (worker !== CLEAR) {
            rows.push({
                id: index,
                [STAFF_MEMBER]: worker,
                ...template,
                [TOTALS]: 0
            })
        }
    })

    return {rows, columns};
}

export const updateCounters = (data) => {
    const rows = getLoad().rows;
    data.forEach(scheduleRow => {
        WORKING_DAYS.forEach(day => {
            if (!scheduleRow.jobs.startsWith(LUNCH) && scheduleRow[day]) {
                const index = rows.findIndex(el => el[STAFF_MEMBER] === scheduleRow[day]);
                if (index !== -1) {
                    rows[index][day] += 1;
                    rows[index][TOTALS] += 1;
                }
            }
        })
    });
    return rows;
}

export const checkColumn = (rows, day, member, job, total) => {
    if (job.startsWith(LUNCH)) {
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].jobs.startsWith(LUNCH) && rows[i][day] === member) {
                return confirm('Staff member is in consecutive lunch slots on the same day!');
            }
        }
    } else {
        const stat = {
            day: 0,
            morning: 0,
            afternoon: 0,
        }
        for (let i = 0; i < rows.length; i++) {
            if (!rows[i].jobs.startsWith(LUNCH)) {
                if (rows[i][day] === member) {
                    stat.day += 1;
                    if (rows[i].jobs.startsWith(MORNING)) {
                        stat.morning += 1;
                    } else {
                        stat.afternoon += 1;
                    }
                }
            }
        }
        const result = [];
        if ((stat.morning >= 1 && job.startsWith(MORNING))
            || (stat.afternoon >= 1 && job.startsWith(AFTERNOON))) {
            result.push(confirm('Staff member is selected to be in two places at once.'));
        }
        if (stat.day >= 2) {
            result.push(confirm('Staff member has more than 2 shifts per day!'));
        }
        if (total >= 7) {
            result.push(confirm('Staff member has more than 7 shifts per week!'));
        }
        if (result.length) {
            return result.every(el => el === true);
        }
    }
    return true;
}
