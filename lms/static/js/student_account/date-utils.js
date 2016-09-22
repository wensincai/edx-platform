/**
 * Useful functions for dealing with datetime objects
 *
 * These functions are meant to act as a general localization function
 * for UTC datetime objects, creating platform-friendly strings in the user's
 * local timezone formatted to the user's preferred language
 *
 * Most of the heavy lifting is done by the 'moments' js library,
 * with the moment-with-locales and moment-timezones add-ons
 *
 * @module DateUtils
 *
 */

/**
 * FORMAT:
 * These were previously called from edx-platform/common/djangoapps/util/date_utils.py,
 * but in an effort to move this to the front-end, we're redefining them here
 */

/**
 * Jan 01, 2016
 * python string: "%b %d, %Y"
 * moment formatting string:
 */
var DEFAULT_SHORT_DATE_FORMAT;
DEFAULT_SHORT_DATE_FORMAT = 'll'

/**
 * Friday, January 01, 2016
 * python string: "%A, %B %d, %Y"
 * moment formatting string:
 */
var DEFAULT_LONG_DATE_FORMAT;
DEFAULT_LONG_DATE_FORMAT = 'LLLL';

/**
 * 06:01:00 AM
 * python string: "%I:%M:%S %p"
 * moment formatting string:
 */
var DEFAULT_TIME_FORMAT;
DEFAULT_TIME_FORMAT = 'LTS z';

/**
 * Jan 02, 2014 at 15:30
 * python string: "%b %d, %Y at %H:%M"
 * moment formatting string:
 */
var DEFAULT_DATE_TIME_FORMAT;
DEFAULT_DATE_TIME_FORMAT = 'll HH[:]mm z';

/**
 * NOTE:
 * The three moment libs act as one in the context of this script,
 * and can all be called by 'moment', but they must be included in the require
 * call
 *
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

    return function (context) {
        /**
         * Create a formatted, localized js string representation of a datetime object.
         *
         * @param {string} context.raw_datetime, The UTC formatted datetime string from the server
         * @param {string} context.time_zone, the user set time zone preference, or 'None' if unset
         * @param {string} context.locale, the user set language, or browser set language if unset
         * NOTE: we can refine this (e.g. en-US, en-UK) further than the coarse grain of the current
         * language set of the edx platform.
         *
         * @param {string} context.format, the desired mako-template datetime formatting
         * @returns {string} display_time, a formatted, localized datetime string
         *
         * NOTE: This can be done in one line, but for the sake
         * of clarity and fungibility, I'm breaking this up into
         * many small lines
         *
        */
        var display_zone;
        var display_time;
        var display_locale;
        var display_string;

        /**
         * convert to object, attempt to determine timezone from preference,
         * then browser, then default to UTC
         *
        */
        if (context.raw_datetime == undefined) {
            return ''
        }
        var date_1 = moment(context.raw_datetime).tz('UTC');
        if (context.time_zone == "None") {
            display_zone = moment.tz.guess();
        } else {
            display_zone = context.time_zone;
        }
        if ( display_zone == undefined ) {
            display_zone = 'UTC';
        }
        var date_2 = date_1.tz(display_zone);

        /**
         * We should, by now, have a localization language tag and can easily generate a nice
         * localized datetime object formatted according to language custom
         * e.g.
         * preferred_language = 'en' yields Oct. 14, 2016 09:00 BST
         * preferred_language = 'ru' yields 14 окт 2016 г. 09:00 BST
         *
         * Default to US-English
         * (which is the current unlocalized view)
        */
        if (typeof context.locale == undefined || context.locale == "None") {
            display_locale = window.navigator.userLanguage || window.navigator.language;
        } else {
            display_locale = context.locale;
        }
        if ( display_locale == undefined ) {
            display_locale = 'en-US';
        }
        var date_3 = date_2.locale(display_locale);

        /**
         * Determine the desired format,
         * default to DEFAULT_DATE_TIME_FORMAT if undefined
         *
        */
        if (typeof context.format == 'undefined') {
            context.format = DEFAULT_DATE_TIME_FORMAT;
        }
        var date_4 = date_3.format(context.format);

        /**
         * Note, for clarity I broke this up into several functions, but this could be a one-liner:
         * display_time.moment(raw_datetime).tz('UTC').tz(display_zone).locale(display_locale).format('ll HH[:]mm z');
        */
        display_time = date_4;

        /**
         * This is a final error bailout -
         * will default to UTC/en-US display in default format
        */

        if (display_time.length == 0 || display_time == 'Invalid date') {
            display_time = context.raw_datetime.tz('UTC').format(context.format)
            console.log('DateUtil Localization Error')
        }

        /**
         *  this is an optional handler for static strings via
         * StringUtils in the ui toolkit
         *
         * Please Note: the preferred method is via underscore in the mako
         * templates, however this will also work.
        */
        if (context.raw_string !== undefined && context.raw_string.length > 0) {
            display_string = edx.StringUtils.interpolate(
                gettext(context.raw_string + ' {date}'),
                {'date': display_time}
            );
            return display_string;
            }

        return display_time
        };
    });
}).call(
    this,
    // Pick a define function as follows:
    // 1. Use the default 'define' function if it is available
    // 2. If not, use 'RequireJS.define' if that is available
    // 3. else use the GlobalLoader to install the class into the edx namespace
    // eslint-disable-next-line no-nested-ternary
    typeof define === 'function' && define.amd ? define :
        (typeof RequireJS !== 'undefined' ? RequireJS.define :
            edx.GlobalLoader.defineAs('DateUtils', 'edx-ui-toolkit/js/utils/date-utils'))
);

