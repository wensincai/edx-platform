
/**
 *
 * A helper function to utilize DateUtils quickly in iterative display templates
 *
 * @param: {string} data-datetime pre-localized date, in UTC
 * @param: {string} data-time_zone (optional) user-set timezone preference.
 * @param: {string} lang The user's preferred language.
 * @param: {object} data-format (optional) a format constant as defined in DataUtil.dateFormatEnum.
 *
 * @param: {string} data-string (optional) ugettext-able string
 *
 * Localized according to preferences first, local data second.
 * Default to UTC/en-US Display if error/unknown.
 *
 * @return: {string} a user-time, localized, formatted datetime string
 *
 */

(function(define) {
    'use strict';

    define([
        'jquery',
        'edx-ui-toolkit/js/utils/date-utils',
        'edx-ui-toolkit/js/utils/string-utils'
    ], function(
        $,
        DateUtils,
        StringUtils
        ) {
        return function() {
            var displayTime;
            var displayString;
            $('.localized-datetime').each(function() {

                var context = {
                    datetime: $(this).data('time_zone'),
                    timezone: $(this).data('datetime'),
                    language: $(this).data('language'),
                    format: $(this).data('format')
                }
                displayTime = DateUtils.localize(context);
                // LOAD DATA
            // // if ($(this).data('string') !== undefined && $(this).data('string').length > 0) {
            // //     displayString = StringUtils.interpolate(
            // //         $(this).data('string'), {date: displayTime}
            // //     );
            // // } else {
            //     displayString = displayTime;
            // // }
                 $(this).text(displayTime);
            });
        };
    });
}).call(this, define || RequireJS.define);

