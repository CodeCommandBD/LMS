import React from "react";
import ReactPlayer from "react-youtube";

const VideoPlayer = ({ url, onEnded, onProgress }) => {
  // Extract video ID from diverse YouTube URL formats
  const getVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-white rounded-lg">
        <p>Video unavailable</p>
      </div>
    );
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
      <ReactPlayer
        videoId={videoId}
        opts={opts}
        className="absolute top-0 left-0 w-full h-full"
        onEnd={onEnded}
        onStateChange={(e) => {
          // Track progress if needed via event data
        }}
      />
    </div>
  );
};

export default VideoPlayer;
