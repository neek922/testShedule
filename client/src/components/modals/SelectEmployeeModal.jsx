import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {WORKERS} from "../../helpers/constants";

function SelectEmployeeModal(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Select an employee</DialogTitle>
            <List>
                {WORKERS.map((worker) => (
                    <ListItem button onClick={() => handleListItemClick(worker)} key={worker}>
                        <ListItemText primary={worker} />
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

SelectEmployeeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default SelectEmployeeModal;