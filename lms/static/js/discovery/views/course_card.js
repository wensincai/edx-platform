(function(define) {
    define([
        'jquery',
        'underscore',
        'backbone',
        'gettext',
        'edx-ui-toolkit/js/utils/date-utils'
    ], function($, _, Backbone, gettext, DateUtils) {
        'use strict';

        function formatDate(date) {
            var context;
            context = {
                datetime: date,
                timezone: '',
                language: '',
                format: DateUtils.dateFormatEnum['shortDate']
            };
            return DateUtils.localize(context)
        }

        return Backbone.View.extend({

            tagName: 'li',
            templateId: '#course_card-tpl',
            className: 'courses-listing-item',

            initialize: function() {
                this.tpl = _.template($(this.templateId).html());
            },

            render: function() {
                var data = _.clone(this.model.attributes);
                data.start = formatDate(new Date(data.start));
                data.enrollment_start = formatDate(new Date(data.enrollment_start));
                this.$el.html(this.tpl(data));
                return this;
            }

        });
    });
})(define || RequireJS.define);
