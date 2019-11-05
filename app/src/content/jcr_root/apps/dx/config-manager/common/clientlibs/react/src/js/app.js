/*
 *  Copyright 2019 Adobe
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import ConfigManager from './ConfigManager';
import AdobeFontsConfig from './AdobeFontsConfig';

window.dx = { configManager: { configs: { } } };

// Consumer Code
window.dx.configManager.configs['adobe-fonts'] = {
    label: 'Adobe Fonts',
    app: AdobeFontsConfig
}

window.dx.configManager.configs['adobe-ims'] = {
    label: 'Adobe IMS',
    app: AdobeFontsConfig
}

const admin = document.getElementById('dx-ContentFrame');

if (admin) {
    const props = {
        dataSourcePath: admin.dataset.columnviewDatasource,
    };
    ReactDOM.render(<ConfigManager {...props} />, admin);
}