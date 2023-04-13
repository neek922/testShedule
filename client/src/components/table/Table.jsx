import React from 'react';
import styled from 'styled-components';
import { DataGrid } from '@material-ui/data-grid';
import {WORKING_DAYS} from "../../helpers/constants";
import BtnGroup from "../btnGroup/btnGroup";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const TitleWrapper = styled.div`
  flex: 1;
  text-align: center;
`;
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  font-family: 'Roboto', sans-serif;  
  align-items: center;
`;

const Table = ({title, data = {}, openModal = () => {}, showBtn = false}) => {
    const _openModal = (e) => {
        if (WORKING_DAYS.includes(e.field)) {
            openModal(e)
        }
    }

    return (
        <Wrapper>
            <HeaderWrapper>
                <TitleWrapper>{title}</TitleWrapper>
                {showBtn && <BtnGroup/>}
            </HeaderWrapper>
            <DataGrid
                rows={data && data.rows ? data.rows : []}
                columns={data && data.columns ? data.columns : []}
                rowHeight={35}
                disableSelectionOnClick
                disableColumnFilter
                disableColumnMenu
                hideFooter
                onCellClick={_openModal}/>
        </Wrapper>
    );
};

export default Table;