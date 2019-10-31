import React from 'react';

// Spectrum Components
import Provider from '@react/react-spectrum/Provider';
import { ColumnView } from '@react/react-spectrum/ColumnView';
import ButtonGroup from '@react/react-spectrum/ButtonGroup';
import Button from '@react/react-spectrum/Button';

// Spectrum Icons
import Edit from '@react/react-spectrum/Icon/Edit';
import Close from '@react/react-spectrum/Icon/Close';
import Delete from '@react/react-spectrum/Icon/Delete';

// Custom Components
import columnItem from './columnItem';
import ConfigDataSource from './DataSource';
import FolderDialog from './FolderDialog';
import ConfigDialog from './ConfigDialog';
import ConfirmDialog from './ConfirmDialog';
import CreateMenu from './CreateMenu';
import deleteResource from './utils/delete';

export default class ConfigManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ConfigDataSource(props.dataSourcePath),
            showFixedActionBar: false,
            showDialog: '',
            dialogContent: {}
        };
        this.dialogClose = this.dialogClose.bind(this);
    }

    togglePrimary = () => {
        const primaryState = this.state.showFixedActionBar ? false : true;
        this.setState({ showFixedActionBar: primaryState });
    }

    primaryChange = (value) => {
        if (value === 'delete') {
            this.deleteItem();
        }
    }

    async deleteItem() {
        const dialogContent = {
            title: 'Delete', 
            variant: 'destructive',
            confirmLabel: 'Delete'
        };
        this.setState({ dialogContent, showDialog: 'delete' });
    }

    selectionChange = (items) => {
        const primaryState = items.length === 0 ? false : true;
        this.setState({ showFixedActionBar: primaryState });
    }

    navigate = (items) => {
        this.setState({ selectedItems: items });
        this.setState({ selectedItem: items[items.length - 1] });
    }

    create = (type, config) => {
        this.setState({ showDialog: type });
        if (config) {
            this.setState({ dialogContent: config });
        }
    }

    resetData = () => {
        this.setState({ dataSource : new ConfigDataSource(this.props.dataSourcePath) });
    }

    async dialogClose(resetData) {
        if (resetData) {
            this.resetData();
        }
        this.setState({ showDialog: '' });
    }

    configDialogClose(resetData) {
        if (resetData) {
            this.resetData();
        }
        this.setState({ showDialog: '' });
    }

    render() {
        let showFixedActionBar = 'dx-ActionBar dx-ActionBar--fixed';
        if (this.state.showFixedActionBar) {
            showFixedActionBar += ' is-Active';
        }

        return (
            <React.Fragment>
                <div className={showFixedActionBar}>
                    <Provider theme="lightest" className="dx-ActionBar-Provider">
                        <ButtonGroup aria-label="PrimaryButtons"  onChange={this.primaryChange}>
                            <Button label="Edit" value="edit" icon={<Edit />} />
                            <Button label="Delete" value="delete" icon={<Delete />} />
                        </ButtonGroup>
                        <ButtonGroup aria-label="SecondaryButtons" onChange={this.togglePrimary}>
                            <Button label="Close" value="close" icon={<Close />}
                                    className="spectrum-ActionButton--alignLeft" />
                        </ButtonGroup>
                    </Provider>
                </div>
                <CreateMenu onSelect={this.create} />
                <Provider theme="light" className="dx-Provider--ColumnView">
                    <ColumnView
                        dataSource={this.state.dataSource}
                        renderItem={columnItem}
                        onNavigate={this.navigate}
                        allowsSelection
                        navigatedPath={this.state.selectedItems}
                        onSelectionChange={this.selectionChange} />
                </Provider>
                <FolderDialog 
                    open={this.state.showDialog === 'folder'}
                    onDialogClose={this.dialogClose}
                    action={this.state.selectedItem ? this.state.selectedItem.path : ''} />
                <ConfigDialog
                    onDialogClose={this.dialogClose}
                    action={this.state.selectedItem ? this.state.selectedItem.path : ''}
                    dialogContent={this.state.dialogContent}
                    open={this.state.showDialog === 'config'} />
                <ConfirmDialog
                    onDialogClose={this.dialogClose}
                    open={this.state.showDialog === 'delete'}
                    dialogContent={this.state.dialogContent}
                    action={this.state.selectedItem ? this.state.selectedItem.path : ''} />
            </React.Fragment>
        );
    }
}