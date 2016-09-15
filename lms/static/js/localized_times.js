// Proof of Concept for Browser-generated datetime transformations

// Make me true to test browser generated timezones
var test_browser = false;

// Todo:
/*
add bailouts for invalid times/timezones.
Always display a time, revert to UTC
*/
function localized_time_display (time_zone, display_date, string) {
    // to imitate the state of the current workflow,
    // the return should look like
    // -->
    // Oct 14, 2016 at 8:00 UTC
    if (time_zone == "None" || test_browser == true) {
        console.log('browser gen tz');
        zone = moment.tz.guess()
    }
    else {
        console.log('prefs gen tz');
        zone = time_zone
    }
    // UTC Object
    var js_due_date = moment(display_date).tz('UTC');
    console.log(js_due_date.format('ha z'));
    // Localized Object w/ formatting
    localized_datetime = js_due_date.tz(zone).format('ll [at] HH[:]mm z');
    // i18n it
    localized_display_date = edx.StringUtils.interpolate(
        gettext(string + ' {date}'),
        {'date': localized_datetime}
        )
    return localized_display_date
}

