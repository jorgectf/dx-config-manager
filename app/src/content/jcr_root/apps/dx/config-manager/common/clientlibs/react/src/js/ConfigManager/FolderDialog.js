import React from 'react';

import getCsrf from './utils/csrf';

import Provider from '@react/react-spectrum/Provider';
import Dialog from '@react/react-spectrum/Dialog';
import CreateFolder from './CreateFolder';
import Underlay from './Underlay';

export default class CreateFolderDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            title: ''
        };
        this.dialogConfirm = this.dialogConfirm.bind(this);
    }

    async dialogConfirm() {
        const formData = new FormData();
        formData.append(':name', this.state.name);
        formData.append('jcr:title', this.state.title);
        if (this.state.orderable) {
            formData.append('jcr:primaryType', 'sling:OrderedFolder');
        }
        const csrf = await getCsrf();
        await fetch(`${this.props.action}/`, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: { 'CSRF-Token': csrf.token },
            body: formData
        });
        this.props.onDialogClose(true);
    }

    dialogCancel = () => {
        this.props.onDialogClose(false);
    }

    handleFolderChange = (change) => {
        this.setState(change);
    }
    
    render() {
        return (
            <Provider theme="light">
                <Underlay open={this.props.open} />
                <Dialog
                    open={this.props.open}
                    onConfirm={this.dialogConfirm}
                    onCancel={this.dialogCancel}
                    cancelLabel="Cancel"
                    confirmLabel="Create"
                    title="Create folder">
                    <CreateFolder
                        name={this.state.name}
                        title={this.state.title}
                        action={this.props.action}
                        onChange={this.handleFolderChange} />
                </Dialog>
            </Provider>);
    }
}