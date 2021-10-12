import React from 'react'
import { DataGridPro } from '@mui/x-data-grid-pro'

class TableComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    render() {
        return (
            <div style={{ height: '600px', width: '100%' }}>
                <DataGridPro
                    rows={this.props.rows}
                    columns={this.props.columns}
                    pagination
                    pageSize={10}
                    onRowEditStart={this.handleRowEditStart}                   
                />
            </div>
        );
    }
}

export default TableComponent