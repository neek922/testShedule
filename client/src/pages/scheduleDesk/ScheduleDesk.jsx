import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Table from '../../components/table/Table';
import SelectEmployeeModal from '../../components/modals/SelectEmployeeModal';
import setWorker from '../../store/actions/setWorker';
import {checkColumn} from "../../helpers/common";
import {CLEAR, STAFF_MEMBER, TOTALS} from "../../helpers/constants";
import onMount from "../../store/actions/onMount";

const FormWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #a1a1a1;
`;

const ScheduleDesk = () => {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({});
    const schedule = useSelector((currentState) => currentState.workTime.schedule || {});
    const load = useSelector((currentState) => currentState.workTime.load || {});

    React.useEffect(async () => {
        await onMount();
    }, []);

    const handleClickOpen = (data) => {
        setData(data);
        setOpen(true);
    };

    const handleClose = (value = null) => {
        if (value) {
            let checking = true;
            if (value !== CLEAR) {
                const total = load.rows.find(el => el[STAFF_MEMBER] === value)[TOTALS];
                checking = checkColumn(schedule.rows, data.field, value, data.row.jobs, total);
            }
            if (checking) {
                setWorker(value, data.row.id, data.field);
            }
        }
        setOpen(false);
        setData({});
    };

    return (
        <FormWrapper>
            <Table title={'Schedule'} data={schedule} openModal={handleClickOpen} showBtn={true}/>
            <Table title={'Load'} data={load}/>
            <SelectEmployeeModal
                onClose={handleClose}
                open={open}/>
        </FormWrapper>
    );
};

export default ScheduleDesk;