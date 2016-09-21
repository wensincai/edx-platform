/*
Retrieve HTML5 Data attributes related to student preferred date
timezone and display methods.

Localize according to preferences first, local data second.

Default to UTC/US Display if error

 */
(function(define) {
    'use strict';

    define([
        'jquery',
        'underscore',
        'gettext',
        'moment',
        'moment-with-locales',
        'moment-timezone',
        'js/student_account/datetime_localize'
    ], function(
        $,
        _,
        gettext,
        moment,
        moment_locales,
        moment_timezone,
        DateUtil
        ) {
    return function() {
        $('.localized-datetime').each(function() {
            DateUtil(
                $(this).data('time_zone'),
                $(this).data('date'),
                $(this).data('locale')
            )
            // console.log($(this).data('time_zone'));
        })
            //

                // console.log($(this).data('time_zone'))
                // console.log(display_date)
                // console.log(locale)
            // )

        }



        // define([
//     // 'jquery',
//     'js/student_account/date_util'
// ], function(
//     // $,
//     SayHi
// ) {
//     // var SayHi = parameters.SayHi;
//     'use strict';
//     describe('SayHi', function() {
//     })
// }).call(this, define || RequireJS.define);
// (function (require) {
//
//     var localized_datetime = require('./datetime_localize')
//
//         var local_due_date;
//         local_due_date = 'FART';

        // $(window).ready(
        //     $( '.localized-datetime' ).each(
        // console.log('This is Working')
            // )
// // //             local_due_date = localized_datetime.datetime_transform(
// // //                 time_zone = $(this).data('time_zone'),
// // //                 display_date = $(this).data('date'),
// // //                 locale = $(this).data('locale'),
// // //                 string = $(this).data('string')
// // //                 ),
//             console.log(local_due_date)

            // )
        // )

        });
}).call(this, define || RequireJS.define);

// $(window).ready(
    // $('.localized-datetime').each(

    // )
// )

// $(window).ready(

//.call("LocalizedDatetime", define || RequireJS.define);

// $(window).ready(
//     $( '.localized-datetime' ).each(
//         function() {
//             LocalizedDatetime(
//                 time_zone = $(this).data('time_zone'),
//                 display_date = $(this).data('date'),
//                 locale = $(this).data('locale')
//             )
//         }
//         // time_zone, display_date, locale)
//     )
// )



// define(function (require) {
//     // Load any app-specific modules
//     // with a relative require call,
//     // like:
//     var messages = require('./messages');
//
//     // Load library/vendor modules using
//     // full IDs, like:
//     var print = require('print');
//
//     print(messages.getHello());
// });


// (function(define) {
//     'use strict';
//
//     define(['jquery', 'logger'], function($, Logger) {
//         return function() {
//             console.log('Hello!')
            // $('.accordion-nav').click(function(event) {
            //     Logger.log(
            //         'edx.ui.lms.outline.selected',
            //         {
            //             current_url: window.location.href,
            //             target_url: event.currentTarget.href,
            //             target_name: $(this).find('p.accordion-display-name').text(),
            //             widget_placement: 'accordion'
            //         });
            // });
