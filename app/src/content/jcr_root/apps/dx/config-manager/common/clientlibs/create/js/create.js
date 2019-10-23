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
(function (document, $) {
    'use strict';

    var CLOUDCONFIGS_PATH = 'settings/cloudconfigs';
    var configType = 'adobe-fonts';

    $(document).on('foundation-contentloaded', function () {
        $('.create-config').on('click', function (event) {
            var contentPath = $('.foundation-collection').data('foundationCollectionId');
            var createUrl = $('coral-columnview').data('createurl');

            if (contentPath === '/conf') {
                _popupAlert(Granite.I18n.get('Please select context folder at first.'));
                return;
            }

            if (!contentPath.includes(CLOUDCONFIGS_PATH)) {
                contentPath += '/' + CLOUDCONFIGS_PATH;
            }

            var createPageUrl = createUrl + contentPath + '/' + configType;

            // check if the configuration exists already, if yes, enter into edit page instead
            $.ajax({
                type: 'GET',
                url: contentPath + '/' + CLOUDCONFIGS_PATH + '.1.json',
                cache: false
            }).done(function (data) {
                var configNode = data[configType];
                if (configNode) {
                    location.href = createPageUrl + '/' + CLOUDCONFIGS_PATH + '/' + configType;
                } else {
                    location.href = createPageUrl;
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                location.href = createPageUrl;
            });
        });
        return;
    });

    function _popupAlert(message) {
        document.body.appendChild(new Coral.Dialog().set({
            id: 'delErrorDialog',
            variant: 'error',
            header: {
                innerHTML: Granite.I18n.get('Error')
            },
            content: {
                innerHTML: '<p>' + message + '</p>'
            },
            footer: {
                innerHTML: '<button is="coral-button" variant="primary" coral-close size="M">' + Granite.I18n.get('Ok') + '</button>'
            }
        }).show());
    }

})(document, Granite.$);
