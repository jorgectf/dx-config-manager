import React from 'react';

import Provider from '@react/react-spectrum/Provider';
import Underlay from './Underlay';
import FolderDialog from './FolderDialog';
import ConfigDialog from './ConfigDialog';
import DeleteDialog from './DeleteDialog';

const Dialog = (props) => {
    const onDialogClose = (resetData, closeActionBar) => {
        props.onDialogClose(resetData, closeActionBar);
    };

    const empty = () => {
        return null;
    };

    console.log(props.item ? props.item.path : '');

    const DialogType = props.dialogType === 'folder' ? FolderDialog
                         : props.dialogType === 'delete' ? DeleteDialog
                         : props.dialogType === 'config' ? ConfigDialog
                         : empty;
    return (
        <Provider theme="light">
            <Underlay open={props.open} />
            <DialogType onDialogClose={onDialogClose} {...props} />
        </Provider>
    );
}

export default Dialog;
