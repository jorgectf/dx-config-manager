import React from 'react';
import Provider from '@react/react-spectrum/Provider';
import { ColumnViewDataSource, ColumnView } from '@react/react-spectrum/ColumnView';

import ButtonGroup from '@react/react-spectrum/ButtonGroup';
import Button from '@react/react-spectrum/Button';
import CheckmarkCircle from '@react/react-spectrum/Icon/CheckmarkCircle';
import Folder from '@react/react-spectrum/Icon/Folder';
import Settings from '@react/react-spectrum/Icon/Settings';
import Add from '@react/react-spectrum/Icon/Add';
import Close from '@react/react-spectrum/Icon/Close';

class ExampleDS extends ColumnViewDataSource {
    constructor(dataSourcePath) {
        super();
        console.log(dataSourcePath);
        this.dataSourcePath = dataSourcePath;
    }

  async getChildren(item) {
    if (!item) {
      return this.getTree();
    }

    return item.children;
  }

  hasChildren(item) {
    return !!item.children;
  }

  isItemEqual(a, b) {
    return a.label === b.label;
  }

  async getTree() {
    const raw = await (await (
        fetch(`${this.dataSourcePath}.model.json`).then(res => {
            return res.json();
        }).catch(err => {
            console.log('Error: ', err);
        })
    ));
    return raw.items;
  }
}

function renderItem(item) {
    let iconType = <Settings className="dx-Icon dx-Icon--ColumnItem"/>;
    if (item.iconType === 'folder') {
        iconType = <Folder className="dx-Icon dx-Icon--ColumnItem"/>;
    }
    return (
        <React.Fragment>
            {iconType}
            <span className="dx-ColumnItemLabel">{item.label}</span>
        </React.Fragment>
    );
}

function renderDetail(item) {
  return (
    <div>
      <h4>Detail</h4>
      <div>{item.label}</div>
    </div>
  );
}

export default class ConfigManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPrimary: false,
            dataSource: new ExampleDS(props.dataSourcePath),
        };
    }

    togglePrimary = () => {
        const primaryState = this.state.showPrimary ? false : true;
        this.setState({ showPrimary: primaryState });
    }

    selectionChange = (items) => {
        const primaryState = items.length === 0 ? false : true;
        this.setState({ showPrimary: primaryState });
    }

    navigate = (items) => {
        console.log(items);
        console.log('do navigate');
    }

    render() {
        let className = 'dx-ActionBar dx-ActionBar--fixed';
        if (this.state.showPrimary) {
            className += ' is-Active';
        }

        return (
            <React.Fragment>
                <div className={className}>
                    <Provider theme="lightest" className="dx-ActionBar-Provider">
                        <ButtonGroup aria-label="PrimaryButtons">
                            <Button label="React" value="react" icon={<CheckmarkCircle />} />
                            <Button label="Add" value="add" icon={<Add />} />
                        </ButtonGroup>
                        <ButtonGroup aria-label="SecondaryButtons" onChange={this.togglePrimary}>
                            <Button label="Close" value="close" icon={<Close />}
                                    className="spectrum-ActionButton--alignLeft" />
                        </ButtonGroup>
                    </Provider>
                </div>
                <div className="dx-ActionBar dx-ActionBar--secondary">
                    <Provider theme="light">
                        <Button label="Create" variant="cta" onClick={this.togglePrimary} />
                    </Provider>
                </div>
                <Provider theme="light" className="dx-Provider--ColumnView">
                    <ColumnView
                        dataSource={this.state.dataSource}
                        renderItem={renderItem}
                        onNavigate={this.navigate}
                        allowsSelection
                        onSelectionChange={this.selectionChange} />
                </Provider>
            </React.Fragment>
        );
    }
}