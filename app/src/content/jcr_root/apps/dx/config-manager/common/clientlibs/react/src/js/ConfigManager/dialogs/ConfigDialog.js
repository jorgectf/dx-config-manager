import React from 'react';

import getCsrf from '../utils/csrf';

import Dialog from '@react/react-spectrum/Dialog';

export default class ConfigDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { view: window.dx.configManager.configs[this.props.configKey] };
        this.dialogConfirm = this.dialogConfirm.bind(this);
    }

    async dialogConfirm() {
        const formData = new FormData();
        formData.append(':operation', 'import');
        formData.append(':contentType', 'json');
        formData.append(':name', this.state.config.name);
        if (this.state.config.replace) {
            formData.append(':replace', this.state.config.replace);
        }
        formData.append(':content', JSON.stringify(this.state.config.data));

        const csrf = await getCsrf();

        await fetch(`${this.props.item.path}/`, {
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

    getConfig = () => {
        if (this.state.view.app) {
            return this.state.view.app;
        }
        return null;
    }

    render() {
        const Config = this.getConfig();
        return (
            <Dialog
                open={this.props.open}
                onConfirm={this.dialogConfirm}
                onCancel={this.dialogCancel}
                title={this.state.view.label}
                mode="fullscreen"
                confirmLabel="Create"
                cancelLabel="Cancel">
                <Config setConfig={this.onChange} config={this.state.config} />
            </Dialog>
        );
    }
}