;(function() {

    var $ = require('./libs/jquery');

    // Sets restriction of comment
    function setRestriction(el) {

      // Check if restriction default has already been handled. If yes, then
      // user wants to use different restriction from default restriction.
      if (el.data('jlo-handled') === 1) {
        return;
      }

      chrome.storage.sync.get({
        'jlo_default_restriction': 'Service Desk Team'
      }, function(items) {
        var defaultRestriction = $('option:contains(' + items.jlo_default_restriction + ')').val();

        if (items.jlo_default_restriction !== 'All Users') {
          el.find('#commentLevel').val(defaultRestriction);
          el.find('.current-level').html('Restricted to <span class="redText">' + items.jlo_default_restriction + '</span>');
          el.find('span.icon-unlocked').removeClass('icon-unlocked').addClass('icon-locked');
          el.data('jlo-handled', 1);
         }
      });
    }

    var elMapping = [
      {'elParent': 'form#issue-comment-add', 'elToFocus': ['#comment']},
      {'elParent': 'form#assign-issue', 'elToFocus': ['#assignee-field','#comment']},
      {'elParent': 'form#log-work', 'elToFocus': ['#log-work-time-logged','#comment']},
      {'elParent': 'div#edit-issue-dialog', 'elToFocus': ['#issuetype-field','#comment']},
      {'elParent': 'form#issue-workflow-transition', 'elToFocus': ['#assignee-field','#comment']},
    ];

    $('document').ready(function(){

      $.each(elMapping, function(i, item){
        var toFocus = [];
        $.each(item.elToFocus, function(j, subselection){
          toFocus.push(item.elParent + ' ' + subselection);
        });
        $(document.body).on('focus', toFocus.join(','), function(){
          setRestriction($(item.elParent));
        });
      });
    });
})();