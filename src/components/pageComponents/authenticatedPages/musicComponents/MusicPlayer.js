import React, { Component } from "react";

import { getToken } from "../../../../auth-provider";

import Hls from "hls.js";

export default class MusicPlayer extends Component {
  
  //maybe more this to the apiRequest class
  async componentDidUpdate() {
    console.log(this.props.directory);
    const beginingUrl = "http://10.34.1.30:8080/songs/";
    const songLoc = this.props.directory + "/outputlist.m3u8";
    var hlsUrl = beginingUrl + songLoc;
    var audio = this.player;

    //Should this logic be loacated here??This looks hacky,
    const token = await getToken();
    let bearerTokenString = "Bearer " + token;

    if (Hls.isSupported()) {
      var hls = new Hls({
        // This configuration is required to insure that only the
        // viewer can access the content by sending a session cookie
        // to api.video service
        xhrSetup: function (xhr, url) {
          xhr.setRequestHeader("Authorization", bearerTokenString);
        },
      });
      hls.loadSource(hlsUrl);
      hls.attachMedia(audio);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        audio.play();
      });
    } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
      console.log("Nigga we here!!");
      audio.src = hlsUrl;
      audio.addEventListener("loadedmetadata", function () {
        audio.play();
      });
    }
  }

  render() {
    return (
      <div>
        <audio
          controls
          ref={(player) => (this.player = player)}
          autoPlay={true}
        />
      </div>
    );
  }
}

//CLose to working, there is an issue with the ref, no callback function like in the class.
// function MusicPlayer({directory}) {
//   const player = useRef()

//   // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
//     console.log(directory);
//     const beginingUrl = "http://10.34.1.30:8080/songs/";
//     const songLoc = directory + "/outputlist.m3u8";
//     var hlsUrl = beginingUrl + songLoc;
//     var audio = player;
//     if (Hls.isSupported()) {
//       var hls = new Hls();
//       hls.loadSource(hlsUrl);
//       hls.attachMedia(audio);
//       hls.on(Hls.Events.MANIFEST_PARSED, function () {
//         audio.play();
//       });
//     } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
//       console.log("Nigga we here!!");
//       audio.src = hlsUrl;
//       audio.addEventListener("loadedmetadata", function () {
//         audio.play();
//       });
//     }
//   });

//   return (
//     <div>
//       <audio
//         controls
//         ref={player => player}
//         autoPlay={true}
//       />
//     </div>
//   );
// }

// export default MusicPlayer;
