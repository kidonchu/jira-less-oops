;(function() {
    var $ = require('./libs/jquery');

    function restoreOptions() {
        chrome.storage.sync.get({
            "jlo_default_restriction": "Service Desk Team"
        }, function(items) {
            $("#default_restriction").val(items.jlo_default_restriction);
        });
    }

    function saveOptions() {
        var defaultRestriction = $("#default_restriction").val();
        console.log("Setting restriction to ", defaultRestriction);
        chrome.storage.sync.set({
            "jlo_default_restriction": defaultRestriction
        }, function() {
            var status = document.getElementById('status');
            status.textContent = 'Options saved';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }

    $("document").ready(function() {
        restoreOptions();
        $("#save").click(function() {
            saveOptions();
        });
    });
})();