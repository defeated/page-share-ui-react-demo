var React       = require('react'),
    ShareStore  = require('./stores/ShareStore.js'),
    ShareBox    = require('./components/ShareBox.jsx'),
    App         = React.createFactory(ShareBox);

var save = function(url){
  ShareStore.fetchShare(url).done(function(result){
    ShareStore.addShare(result);
    render();
  });
};

var render = function(){
  React.render(
    App({ store: ShareStore, onSubmit: save }),
    document.body
  );
};

render();
