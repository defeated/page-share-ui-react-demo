var ShareStore = {
  data: [],

  clear: function(){
    this.data = [];
  },

  addShare: function(share) {
    this.data.unshift(share);
  },

  deleteShare: function(index) {
    this.data.splice(index, 1);
  }
};

var ShareBox = React.createClass({
  getInitialState: function(){
    return ShareStore;
  },
  handleShareClear: function(){
    ShareStore.clear();
    this.replaceState(this.getInitialState());
  },
  handleShareDelete: function(index){
    ShareStore.deleteShare(index);
    this.setState(ShareStore);
  },
  handleShareSubmit: function(url){
    var token = window.btoa(url);
    var endpoint = 'https://page-share.herokuapp.com/' + token + '?callback=?';
    var request = $.getJSON(endpoint)
      .fail(function(){
        alert("Sorry, couldn't reach " + url + " - please try again soon.")
      })
      .done(function(result){
        ShareStore.addShare(result);
        this.setState(ShareStore);
      }.bind(this));

    setTimeout(request.abort, 3000);
  },
  render: function(){
    return (
      <div className="shareBox">
        <h1>Metadata used in content sharing</h1>
        <ShareBox.Form
          onShareSubmit={ this.handleShareSubmit }
        />
        <ShareBox.List
          onShareClear={ this.handleShareClear }
          onShareDelete={ this.handleShareDelete }
          data={ this.state.data }
        />
      </div>
    );
  }
});

ShareBox.List = React.createClass({
  handleClear: function(e){
    e.preventDefault();
    this.props.onShareClear();
  },
  handleDelete: function(index){
    this.props.onShareDelete(index);
  },
  render: function(){
    var shareNodes = this.props.data.map(function(shareResult, index){
      return (
        <ShareBox.Result
          key={ index }
          index={ index }
          onDelete={ this.handleDelete }
          { ...shareResult }
        />
      );
    }.bind(this));
    var clearButton;
    if (shareNodes.length) {
      clearButton = (
        <button type="button" onClick={ this.handleClear }>Clear</button>
      );
    }
    return (
      <div className="shareList">
        { clearButton }
        { shareNodes }
      </div>
    );
  }
});

ShareBox.Form = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var url = this.refs.url.getDOMNode().value.trim();
    if (!url) {
      return;
    }
    this.props.onShareSubmit(url);
    this.refs.url.getDOMNode().value = '';
  },
  render: function(){
    return (
      <form className="shareForm" onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Example: http://google.com" ref="url" />
        <button type="submit">&rarr;</button>
      </form>
    );
  }
});

ShareBox.Result = React.createClass({
  handleClickDelete: function(e){
    e.preventDefault();
    this.props.onDelete(this.props.index);
  },
  render: function(){
    return (
      <div className="shareResult">
        <dl>
          <dt>Source</dt>
          <dd>{ this.props.source }</dd>
          <dt>Title</dt>
          <dd>{ this.props.title }</dd>
          <dt>Description</dt>
          <dd>{ this.props.description }</dd>
          <dt>Canonical</dt>
          <dd>{ this.props.canonical }</dd>
          <dt>Image</dt>
          <dd>{ this.props.image }</dd>
          <dt>Favicon</dt>
          <dd>{ this.props.favicon }</dd>
        </dl>

        <button type="button" onClick={ this.handleClickDelete }>Delete</button>
      </div>
    );
  }
});

React.render(
  <ShareBox />,
  document.getElementById('wrapper')
);
