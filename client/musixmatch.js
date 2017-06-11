// vue
const app = new Vue({
  el: '#app',
  data: {
    query: "Search",
    tracks: [],
    artists: [],
    lyrics: []
  },
  methods: {
    getMusic() {
      let query = this.query;
      axios.get(`http://localhost:3000/search/tracks?q=${query}`)
      .then(response => this.tracks = response.data)
      .catch(err => console.log(err.message));

      axios.get(`http://localhost:3000/search/artists?q=${query}`)
      .then(response => this.artists = response.data)
      .catch(err => console.log(err.message));

      axios.get(`http://localhost:3000/search/lyrics?q=${query}`)
      .then(response => this.lyrics = response.data)
      .catch(err => console.log(err.message));
    },
    getLyric(id){
      console.log(id);
      axios.get(`http://localhost:3000/search/lyrics?q=${id}`)
      .then(response => this.lyrics = response.data)
      .catch(err => console.log(err.message));
    }
  }
});
