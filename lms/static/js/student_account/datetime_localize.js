// Proof of Concept for Browser-generated datetime transformations

// Make me true to test browser generated timezones
// var test_browser = false;

(function (define) {
    'use strict';

    define([
        'jquery',
        'underscore',
        'gettext',
        'moment',
        'moment-with-locales',
        'moment-timezone'
    ], function(
            $,
            _,
            gettext,
            moment,
            moment_locales,
            moment_timezone
        ) {

    return function (time_zone, display_date, locale) {

            console.log('This works too')
            // to imitate the state of the current workflow,
            // the return should look like
            // -->
            // Oct 14, 2016 at 8:00 UTC
            // ** NOTE **
            // we should either include the 'at' string for translators as well,
            // and thus, we will deliver two objects to the endpoint,
            // or
            // we eliminate it entirely
            // if (display_date == undefined) {
            //     return ''
            // }
            //
            // /*
            //  guess timezone based on browser if not previously set
            //  */
            // if (time_zone == "None" || test_browser == true) {
            //     zone = moment_timezone.tz.guess()
            // } else {
            //     zone = time_zone
            // }
            //
            // /*
            //  Do localization based on browser settings if not
            //  previously set - with a default view to english-formatting
            //  (which is the current unlocalized view)
            //  */
            // if (typeof locale == undefined || locale == "None" || test_browser == true) {
            //     preferred_language = window.navigator.userLanguage || window.navigator.language;
            // } else {
            //     preferred_language = locale;
            // }
            //
            // // final check -- Default to english (?)
            // if (typeof preferred_language == 'undefined') {
            //     preferred_language = 'en-US';
            // }
            // /*
            //  we should, by now, have a localization language tag and can easily generate a nice
            //  localized datetime object formatted according to language custom
            //  preferred_language = 'en' yields Oct. 14, 2016 09:00 BST
            //  e.g.
            //  preferred_language = 'ru' yields 14 окт 2016 г. 09:00 BST
            //  */
            //
            // // UTC Object
            // var datetime_date = moment(display_date).tz('UTC');
            //
            // // Localized Object w/ formatting
            // localized_datetime = datetime_date.tz(zone).locale(preferred_language).format('ll HH[:]mm z');
            //
            // // error condition
            // if (localized_datetime.length == 0 || localized_datetime == 'INVALID DATE')
            //     localized_datetime = datetime_date.format('ll [at] HH[:]mm z')
            //
            // // ui toolkit - for static strings only
            // if (string != undefined || string.length > 0) {
            //
            //     localized_datetime = edx.StringUtils.interpolate(
            //         gettext(string + ' {date}'),
            //         {'date': localized_datetime}
            //     )
            // }
            // return localized_datetime
        };
    });
}).call(this, define || RequireJS.define);
