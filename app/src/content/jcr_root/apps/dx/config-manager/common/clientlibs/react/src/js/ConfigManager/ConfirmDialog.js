import React from 'react';

import Provider from '@react/react-spectrum/Provider';
import Dialog from '@react/react-spectrum/Dialog';
import CreateFolder from './CreateFolder';
import Underlay from './Underlay';

export default class ConfirmDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            title: ''
        };
        this.dialogConfirm = this.dialogConfirm.bind(this);
    }

    async dialogConfirm() {
        const resp = await deleteResource(this.state.selectedItem.path);
        this.props.onDialogClose(true);
    }

    dialogCancel = () => {
        this.props.onDialogClose(false);
    }
    
    render() {
        return (
            <Provider theme="light">
                <Underlay open={this.props.open} />
                <Dialog
                    variant={this.props.dialogContent.variant}
                    open={this.props.open}
                    onConfirm={this.dialogConfirm}
                    onCancel={this.dialogCancel}
                    cancelLabel="Cancel"
                    confirmLabel={this.props.dialogContent.confirmLabel}
                    title={this.props.dialogContent.title}>
                </Dialog>
            </Provider>);
    }
}