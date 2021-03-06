
App = React.createClass({


  getInitialState() {
    return {
      loading: false,
      searchingText: '',
      gif: {}
    };
  },

  getGif: function (searchingText) {  // 1.

    var GIPHY_API_URL = 'https://api.giphy.com';
    var GIPHY_PUB_KEY = 'lA633ceMPtTlq8MoyOVlGkflqY0a7DyA';

    return new Promise(
      (resolve, reject) => {
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        var xhr = new XMLHttpRequest();  // 3.
        xhr.open('GET', url);
        xhr.onload = function () {
          if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText).data; // 4.
            var gif = {  // 5.
              url: data.fixed_width_downsampled_url,
              sourceUrl: data.url
            };
            resolve(gif);
          } else {
            reject(new Error('Error'));
          }
        };
        xhr.send();
      }
    )
  },

  handleSearch: function (searchingText) { // 1.
    this.setState({
      loading: true  // 2.
    });
    this.getGif(searchingText) // 3.
      .then(gif => {
        this.setState({  // 4
          loading: false,  // a
          gif: gif,  // b
          searchingText: searchingText  // c
        });
      });
  },

  render: function () {

    var styles = {
      margin: '0 auto',
      textAlign: 'center',
      width: '90%'
    };

    return (
      <div style={styles}>
        <h1>GIF Browser</h1>
        <p>Find GIF on<a href='http://giphy.com'> G I P H Y </a>. Press ENTER to get another one.</p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});