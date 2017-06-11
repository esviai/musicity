const unirest = require('unirest');

function getTracks(req, res) {
  unirest.get(`https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search?f_has_lyrics=1&page=1&page_size=6&q_track=${req.query.q}&s_track_rating=desc`)
  .header("X-Mashape-Key", "mWqprD6A7cmshi6Pn7LgFGJFfZVEp1F3DA3jsn7t4cxoaM3ySI")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    res.send(result.body);
  });
}

function getArtists(req, res) {
  unirest.get(`https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/artist.search?page=1&page_size=6&q_artist=${req.query.q}&s_artist_rating=desc`)
  .header("X-Mashape-Key", "mWqprD6A7cmshi6Pn7LgFGJFfZVEp1F3DA3jsn7t4cxoaM3ySI")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    res.send(result.body);
  });
}

function getLyrics(req, res) {
  unirest.get(`https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get?track_id=${req.query.q}`)
  .header("X-Mashape-Key", "mWqprD6A7cmshi6Pn7LgFGJFfZVEp1F3DA3jsn7t4cxoaM3ySI")
  .header("Accept", "application/json")
  .end(function (result) {
    console.log(result.status, result.headers, result.body);
    res.send(result.body);
  });
}

module.exports = {
  getTracks, getArtists, getLyrics
}
