
/*
This function will display localized times based on
preferences or user-browser settings.

From the template, retrieve HTML5 Data attributes

(raw UTC datetime)
data-date=""

(optional ugettext-able string)
data-string=""

(preferential time_zone or None)
data-time_zone="${time_zone}"
(which is get_user_time_zone(request.user))

(preferential language, or a browser determined language)
NOTE: This may never default to None.
data-locale="${locale}"
(which is the pref-lang setting)


Localize according to preferences first, local data second.

Default to UTC/en-US Display if error/unknown

// we don't seem to need:
// $(window).ready(
*/

(function(define) {
    'use strict';

    define([
        'jquery',
        'js/student_account/datetime_localize'
    ], function(
        $,
        DateUtil
        ) {
        return function() {
            $('.localized-datetime').each(function() {
                var display_time = DateUtil(
                    $(this).data('time_zone'),
                    $(this).data('date'),
                    $(this).data('locale'),
                    $(this).data('string')
                );
                $(this).text(display_time);
            });
        };
    });
}).call(this, define || RequireJS.define);

