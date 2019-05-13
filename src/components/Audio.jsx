import React, { useState } from "react";

const Audio2 = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);

  const playNext = () => {
    let next;
    if (currentlyPlaying < 3) {
      next = currentlyPlaying + 1;
    } else {
      next = 0;
      setCurrentlyPlaying(0);
    }
    setCurrentlyPlaying(next);
    const audio = document.getElementById("audioPlayer");
    audio.src = `./audio/audio${next}.mp3`;
    audio.play();
    audio.onended = event => playNext();
  };
  const play = async () => {
    const audio = await document.getElementById("audioPlayer");
    document.getElementById("audioPlayer").onended = event => {
      playNext();
    };
  };
  play();

  return (
    <audio id="audioPlayer" controls>
      <source src={`./audio/audio${currentlyPlaying}.mp3`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default Audio2;
