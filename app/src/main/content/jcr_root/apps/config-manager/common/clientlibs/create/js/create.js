/*
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2017 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
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
