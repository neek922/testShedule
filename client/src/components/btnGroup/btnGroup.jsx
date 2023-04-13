import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import handleClearDesk from '../../store/actions/handleClearDesk';
import handleRandomizer from "../../store/actions/handleRandomizer";
import handleSaveDesk from "../../store/actions/handleSaveDesk";

const BtnGroup = () => {

    return (
        <ButtonGroup variant="text" size="small" aria-label="text primary button group">
            <Button onClick={handleRandomizer}>Random</Button>
            <Button onClick={handleClearDesk}>Clear</Button>
            <Button onClick={handleSaveDesk}>Save</Button>
        </ButtonGroup>
    );
};

export default BtnGroup;