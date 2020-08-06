import React, { Component } from "react";

import styles from "./SongList.module.css";

//Should get song list from server
export class SongList extends Component {
  state = {
    songList: [
      {
        songName: "Belong to the City ft. Drake",
        artist: "PartyNextDoor",
        directory: "belongToTheCity",
      },
      {
        songName: "The Hooch",
        artist: "Travi$ Scott",
        directory: "hooch",
      },
    ],
  };

  updateSong = (directory) => {
    this.props.passedFuction(directory);
  };

  generateSongList = () => {
    const songList = this.state.songList;
    const songItems = songList.map((song) => (
      <div
        className={styles.songHolder}
        key={song.songName}
        onClick={() => {this.updateSong(song.directory)}}
      >
        <h3>{song.songName}</h3>
        <p>{song.artist}</p>
      </div>
    ));

    return <div className={styles.songsContainer}> {songItems} </div>;
  };

  render() {
    return (
      <div>
        <h2>Song List</h2>
        {this.generateSongList()}
      </div>
    );
  }
}

export default SongList;
