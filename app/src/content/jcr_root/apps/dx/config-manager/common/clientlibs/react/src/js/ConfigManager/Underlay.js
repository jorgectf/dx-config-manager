import React from 'react';

export default class Underlay extends React.Component {
    render() {
      const { open } = this.props;
      const classNames = ['spectrum-Underlay'];
      open ? classNames.push('is-open') : false;
      return <div className={classNames.join(' ')} />;
    }
}