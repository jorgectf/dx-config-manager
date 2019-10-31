import React from 'react';
import {Form, FormItem} from '@react/react-spectrum/Form';
import Textfield from '@react/react-spectrum/Textfield';
import Checkbox from '@react/react-spectrum/Checkbox';

export default class CreateFolder extends React.Component {
    handleChange = (value, e) => {
        const change = {};
        change[e.target.name] = value;
        this.props.onChange(change);
    }

    render() {
        const action = `${this.props.action}/`;

        return (
            <Form action={action} method="POST">
                <FormItem label="Name">
                    <Textfield
                        name="name"
                        value={this.props.name}
                        placeholder="name"
                        onChange={this.handleChange} />
                </FormItem>
                <FormItem label="Title">
                    <Textfield
                        name="title"
                        value={this.props.title}
                        placeholder="Title"
                        onChange={this.handleChange} />
                </FormItem>
                <FormItem>
                    <Checkbox
                        label="Ordered"
                        name="orderable"
                        onChange={this.handleChange} />
                </FormItem>
            </Form>
        );
    }
}