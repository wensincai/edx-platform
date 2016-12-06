(function() {

    // state will be populated via initial_state via the `setState` method. Just defining dummy values to make
    // the expected structure clear.
    var state = {
            availableChoices: [],
            selectedChoice: ''
        },
        channel;

    // Establish a channel only if this application is embedded in an iframe.
    // This will let the parent window communicate with this application using
    // RPC and bypass SOP restrictions.
    if (window.parent !== window) {
        channel = Channel.build({
            window: window.parent,
            origin: '*',
            scope: 'JSInput'
        });

        channel.bind('getGrade', getGrade);
        channel.bind('getState', getState);
        channel.bind('setState', setState);
    }

    function init() {
        var select = document.getElementsByClassName('choices')[0];
        select.addEventListener('change', function() {
            console.log("change event!");
            state.selectedChoice = select.options[select.selectedIndex].text;
        });
    }

    function populateSelect() {
        var select = document.getElementsByClassName('choices')[0],
            i,
            option;

        // Clear out any pre-existing options.
        while (select.firstChild) {
            select.removeChild(select.firstChild);
        }

        for (i = 0; i < state.availableChoices.length; i++) {
            option = document.createElement('option');
            option.value = i;
            option.innerHTML = state.availableChoices[i];
            if (state.availableChoices[i] === state.selectedChoice) {
                option.selected = true;
            }

            // then append it to the select element
            select.appendChild(option);
        }
    }

    init();

    function getGrade() {
        // The following return value may or may not be used to grade 
        // server-side.
        // If getState and setState are used, then the Python grader also gets
        // access to the return value of getState and can choose it instead to
        // grade.
        return JSON.stringify(state.selectedChoice);
    }

    function getState() {
        return JSON.stringify(state);
    }

    // This function will be called with 1 argument when JSChannel is not used,
    // 2 otherwise. In the latter case, the first argument is a transaction 
    // object that will not be used here
    // (see http://mozilla.github.io/jschannel/docs/)
    function setState() {
        debugger
        var stateString = arguments.length === 1 ? arguments[0] : arguments[1];
        state = JSON.parse(stateString);
        populateSelect();
    }

    return {
        getState: getState,
        setState: setState,
        getGrade: getGrade
    };
}());