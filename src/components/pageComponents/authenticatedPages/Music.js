import React, {useState} from 'react';
import SongList from "./musicComponents/SongList";
import MusicPlayer from "./musicComponents/MusicPlayer";

export default function Music() {
    const [selectedSong, setSelectedSong] = useState("");

    const selectSong = (directoryName) => {
      setSelectedSong(directoryName);
    };
    return (
        <React.Fragment>
        <main>
          <div>
            <h1>Play Some Music</h1>
          </div>
          <SongList passedFuction={selectSong} />
        </main>
        <footer className="App-footer">
          <MusicPlayer directory={selectedSong} />
        </footer>
      </React.Fragment>
    )
}
