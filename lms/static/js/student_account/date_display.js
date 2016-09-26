
/**
 * This function will display localized times based on
 * preferences or user-browser settings.
 *
 * The following are HTML5 Data attributes:
 *
 * @param: data-date="" {string} string of needed date, in UTC
 *
 * @param: data-string="" {string} optional ugettext-able string
 *
 * @param: data-time_zone="${time_zone}" {string} user-pref time_zone via
 * get_user_time_zone(request.user)
 *
 * @param: data-locale="${locale}" {string} the user's preferred language
 *
 *
 * Localized according to preferences first, local data second.
 * Default to UTC/en-US Display if error/unknown
 *
 * @return: $(this).text(display_time)
 *
 */

// we don't seem to need:
// $(window).ready(

(function(define) {
    'use strict';

    define([
        'jquery',
        'js/student_account/date-utils'
    ], function(
        $,
        DateUtils
        ) {
        return function() {
            $('.localized-datetime').each(function() {

                var context = {
                    time_zone: $(this).data('time_zone'),
                    raw_datetime: $(this).data('date'),
                    locale: $(this).data('locale'),
                    raw_string: $(this).data('string'),
                    format: $(this).data('format')
                }
                var display_time = DateUtils(context);
                $(this).text(display_time);
            });
        };
    });
}).call(this, define || RequireJS.define);

