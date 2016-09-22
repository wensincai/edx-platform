// Proof of Concept for Browser-generated datetime transformations


/*
A quick note about the require lib -- the three moment libraries
act as one in the context of this script, moment, moment-timezone, and
moment-with-locales caqn be called by 'moment', but must be included
in the require call
 */

(function (define) {
    'use strict';

    define([
        'jquery',
        'gettext',
        'moment',
        'moment-with-locales',
        'moment-timezone'

    ], function(
        $,
        gettext,
        moment,
        moment_locales,
        moment_timezone
        ) {

    return function (time_zone, raw_datetime, locale, raw_string) {
        var display_zone;
        var display_time;
        var display_locale;
        var display_string;

        // Make me true to test browser generated timezones & locales
        var test_browser;
        test_browser = false;

        /* to imitate the state of the current workflow,
        the return should look like
        -->
        Oct 14, 2016 at 8:00 UTC
        ** NOTE **
        we should either include the 'at' string for translators as well,
        and thus, we will deliver two objects to the endpoint,
        or
        we eliminate it entirely (TBD)
        */

        if (raw_datetime == undefined) {
            return ''
        }

        /*
         guess timezone based on browser if not previously set
         */
        if (time_zone == "None" || test_browser == true) {
            display_zone = moment.tz.guess();
        } else {
            display_zone = time_zone;
        }
        /*
         Do localization based on browser settings if not
         previously set - with a default view to english-formatting
         (which is the current unlocalized view)
         */
        if (typeof locale == undefined || locale == "None" || test_browser == true) {
            display_locale = window.navigator.userLanguage || window.navigator.language;
        } else {
            display_locale = locale;
        }

        // final check -- Default to US-English, UTC
        if ( display_locale == undefined ) {
            display_locale = 'en-US';
        }
        if ( display_zone == undefined ) {
            display_zone = 'UTC';
        }

        /*
        we should, by now, have a localization language tag and can easily generate a nice
        localized datetime object formatted according to language custom
        preferred_language = 'en' yields Oct. 14, 2016 09:00 BST
        e.g.
        preferred_language = 'ru' yields 14 окт 2016 г. 09:00 BST
        */
        /*
        Note, for clarity I broke this up into several functions, but this could be a one-liner:
        display_time.moment(raw_datetime).tz('UTC').tz(display_zone).locale(display_locale).format('ll HH[:]mm z');
        */
        var date_1 = moment(raw_datetime).tz('UTC');
        var date_2 = date_1.tz(display_zone);
        var date_3 = date_2.locale(display_locale);
        var date_4 = date_3.format('ll HH[:]mm z');
        display_time = date_4;

        /*
        This is a final error bailout -
        will default to UTC/en-US display
        */
        if (display_time.length == 0 || display_time == 'Invalid date') {
            display_time = raw_datetime.tz('UTC').format('ll [at] HH[:]mm z')
            console.log('DateUtil Localization Error')
        }

        /* this is an optional handler for static strings via
        stringutils in the ui toolkit */
        if (raw_string !== undefined && raw_string.length > 0) {
            display_string = edx.StringUtils.interpolate(
                gettext(raw_string + ' {date}'),
                {'date': display_time}
            );
            return display_string;
            }

        return display_time
        };
    });
}).call(this, define || RequireJS.define);

