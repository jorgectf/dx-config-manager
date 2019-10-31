import React from 'react';

import {Form, FormItem} from '@react/react-spectrum/Form';
import Textfield from '@react/react-spectrum/Textfield';
import Select from '@react/react-spectrum/Select';

const EMBED_OPTIONS = [
    { label: 'Link Tag', value: 'linkTag' },
    { label: 'Style Tag', value: 'styleTag' },
    { label: 'Script Tag', value: 'scriptTag' }
];

export default class AdobeFonts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'adobe-fonts',
            data: {
                'jcr:primaryType': 'cq:Page',
                'jcr:content': {
                    'jcr:primaryType': 'nt:unstructured',
                    'sling:resourceType': 'dx/config-manager/adobe-fonts',
                    'jcr:title': 'Adobe Fonts',
                    'projectId': '',
                    'embedType': 'linkTag'
                }
            }
        };
        this.setConfig();
    }

    setConfig = () => {
        console.log(this.state);
        this.props.setConfig(this.state);
    }

    onNameChange = (value) => {
        this.setState({ name: value }, this.setConfig);
    }

    onContentChange = (value, name) => {
        const data = this.state.data;
        data['jcr:content'][e.target.name] = value;
        this.setState({ data }, this.setConfig);
    }

    onSelectChange = (value, name) => {
        const data = this.state.data;
        data['jcr:content'][name] = value;
        this.setState({ data }, this.setConfig);
    }

    onSelectOpen = (e) => {
        this.setState({ currentSelectValue: e.target });
    }

    render() {
        return (
            <Form>
                <FormItem label="Name">
                    <Textfield
                        name="name"
                        value={this.state.name}
                        placeholder="name"
                        onChange={this.onNameChange} />
                </FormItem>
                <FormItem label="Project ID">
                    <Textfield
                        name="projectId"
                        value={this.state.data['jcr:content'].projectId}
                        placeholder="Project ID"
                        onChange={this.onContentChange} />
                </FormItem>
                <FormItem label="Embed">
                    <Select
                        name="embedType"
                        defaultValue={this.state.data.embedType}
                        onChange={(value) => this.onSelectChange(value, 'embedType')}
                        options={EMBED_OPTIONS} />
                </FormItem>
            </Form>
        );
    }
}