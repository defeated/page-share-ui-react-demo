var React     = require('react'),
    ShareBox  = require('./components/ShareBox.jsx'),
    App       = React.createFactory(ShareBox);

var render = function(){
  React.render(App({ store: ShareStore }), document.body);
};

var ShareStore = {
  data: [],

  clear: function(){
    this.data = [];
    return this;
  },

  addShare: function(share) {
    this.data.unshift(share);
    return this;
  },

  deleteShare: function(share) {
    var index = this.data.indexOf(share);
    this.data.splice(index, 1);
    return this;
  },

  fetchShare: function(url){
    var token = window.btoa(url);
    var endpoint = 'https://page-share.herokuapp.com/' + token + '?callback=?';
    var request = $.getJSON(endpoint)
      .fail(function(){
        alert("Sorry, couldn't reach " + url + " - please try again soon.")
      })
      .done(function(result){
        ShareStore.addShare(result);
        render();
      });

    setTimeout(request.abort, 3000);
    return request;
  }
};

render();
