;(function() {

    var $ = require('./libs/jquery');

    // Sets restriction of comment
    function setRestriction(el) {
      chrome.storage.sync.get({
        'jlo_default_restriction': 'Service Desk Team'
      }, function(items) {
        var defaultRestriction = $('option:contains(' + items.jlo_default_restriction + ')').val();

        if (items.jlo_default_restriction !== 'All Users') {
          el.find('#commentLevel').val(defaultRestriction);
          el.find('.current-level').html('Restricted to <span class="redText">' + items.jlo_default_restriction + '</span>');
          el.find('span.icon-unlocked').removeClass('icon-unlocked').addClass('icon-locked');
        }
      });
    }

    $('document').ready(function(){

      $(document.body).on('focus', '#issue-comment-add #comment', function(){
        setRestriction($('form#issue-comment-add'));
      }).on('focus', 'form#assign-issue #comment', function(){
        setRestriction($('form#assign-issue'));
      }).on('focus', 'form#comment-add #comment', function(){
        setRestriction($('form#comment-add'));
      }).on('focus', 'form#log-work #log-work-time-logged', function(){
        setRestriction($('form#log-work'));
      }).on('focus', 'div#edit-issue-dialog #comment', function(){
        setRestriction($('div#edit-issue-dialog'));
      });
    });
})();