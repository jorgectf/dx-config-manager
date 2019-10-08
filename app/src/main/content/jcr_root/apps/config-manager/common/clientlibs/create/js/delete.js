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

    $(document).on('click', '.cq-confadmin-actions-delete-activator', deleteConfigMessage);

    function createEl(name) {
        return $(document.createElement(name));
    }

    function deleteConfigMessage() {
        var message = createEl('div');
        var intro = createEl('p').appendTo(message);
        var selections = $('.foundation-selections-item');
        if (selections.length === 1) {
            intro.text(Granite.I18n.get('You are going to delete:'));
        } else {
            intro.text(Granite.I18n.get('You are going to delete the following {0} items:', selections.length));
        }
        var list = [];
        var maxCount = Math.min(selections.length, 12);
        for (var i = 0, ln = maxCount; i < ln; i++) {
            var title = $(selections[i]).find('.foundation-collection-item-title').text();
            list.push(createEl('b').text(title).prop('outerHTML'));
        }
        if (selections.length > maxCount) {
            list.push('&#8230;'); // &#8230; is ellipsis
        }

        createEl('p').html(list.join('<br>')).appendTo(message);

        var ui = $(window).adaptTo('foundation-ui');

        ui.prompt(Granite.I18n.get('Delete'), message.html(), 'notice', [{
            text: Granite.I18n.get('Cancel')
        }, {
            text: Granite.I18n.get('Delete'),
            warning: true,
            handler: function () {
                deleteConfig();
            }
        }]);
    }

    function deleteConfig() {
        var paths = [];
        var items = $('.foundation-selections-item');
        if (items.length) {
            items.each(function (i) {
                var item = $(this);
                var itemPath = item.data('foundation-collection-item-id');
                paths.push(itemPath);
            });

            $.ajax({
                url: Granite.HTTP.externalize('/bin/wcmcommand'),
                type: 'POST',
                data: {
                    _charset_: 'UTF-8',
                    cmd: 'deletePage',
                    path: paths,
                    force: false,
                    checkChildren: true
                },
                success: function () {
                    location.reload();
                }
            })
        }
    }
})(document, Granite.$);
