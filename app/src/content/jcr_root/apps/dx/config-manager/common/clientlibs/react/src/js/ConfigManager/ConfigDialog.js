import React from 'react';

import getCsrf from './utils/csrf';

import Provider from '@react/react-spectrum/Provider';
import Dialog from '@react/react-spectrum/Dialog';
import Underlay from './Underlay';

export default class ConfigDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { config: {} };
        this.dialogConfirm = this.dialogConfirm.bind(this);
    }

    async dialogConfirm() {
        const formData = new FormData();
        formData.append(':operation', 'import');
        formData.append(':contentType', 'json');
        formData.append(':name', this.state.config.name);
        formData.append(':content', JSON.stringify(this.state.config.data));

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

    onChange = (config) => {
        this.setState({ config });
    }

    empty = () => {
        return <span></span>;
    }

    render() {
        let Config = this.empty;
        if (this.props.dialogContent.app) {
            Config = this.props.dialogContent.app;
        }
        return (
            <Provider theme="light">
                <Underlay open={this.props.open} />
                <Dialog
                    open={this.props.open}
                    onConfirm={this.dialogConfirm}
                    onCancel={this.dialogCancel}
                    title={this.props.dialogContent.label}
                    mode="fullscreen"
                    confirmLabel="Create"
                    cancelLabel="Cancel">
                    <Config setConfig={this.onChange} config={this.state.config} />
                </Dialog>
            </Provider>
        );
    }
}