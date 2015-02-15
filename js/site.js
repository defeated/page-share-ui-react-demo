var ShareBox = React.createClass({
  getInitialState: function(){
    return { data: [] };
  },
  handleShareSubmit: function(url){
    var token = window.btoa(url);
    var endpoint = 'https://page-share.herokuapp.com/' + token + '?callback=?';
    var request = $.getJSON(endpoint)
      .fail(function(){
        alert("Couldn't reach " + url)
      })
      .done(function(result){
        var results = [ result ].concat(this.state.data);
        this.setState({ data: results });
      }.bind(this));

    setTimeout(request.abort, 3000);
  },
  render: function(){
    return (
      <div className="shareBox">
        <h1>Shares</h1>
        <ShareForm onShareSubmit={ this.handleShareSubmit } />
        <ShareList data={ this.state.data } />
      </div>
    );
  }
});

var ShareList = React.createClass({
  render: function(){
    var shareNodes = this.props.data.map(function(shareResult){
      return (
        <ShareResult key={ shareResult.source } { ...shareResult } />
      );
    });
    return (
      <div className="shareList">
        { shareNodes }
      </div>
    );
  }
});

var ShareForm = React.createClass({
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
        <input type="text" ref="url" />
        <button type="submit">&rarr;</button>
      </form>
    );
  }
});

var ShareResult = React.createClass({
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
      </div>
    );
  }
});

React.render(
  <ShareBox />,
  document.getElementById('wrapper')
);
