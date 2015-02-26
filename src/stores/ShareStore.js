var ShareStore = {
  data: [],

  clear: function(){
    this.data.length = 0;
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
      });

    setTimeout(request.abort, 3000);
    return request;
  }
};

module.exports = ShareStore;
