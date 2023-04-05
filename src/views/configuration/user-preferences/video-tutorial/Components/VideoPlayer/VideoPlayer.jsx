import { useEffect, useRef } from "react";
import Plyr from "plyr";
// import Hls from "hls.js";
import "plyr/dist/plyr.css";
import "./VideoPlayer.css";

const Hls = window.Hls;

export default function VideoPlayer(props) {
  const videoRef = useRef(null);
  const sourceRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const source = sourceRef.current.src;

    const defaultOptions = {};
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(source);

      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        const availableQualities = hls.levels.map((l) => l.height);
        defaultOptions.quality = {
          default: availableQualities[0],
          options: availableQualities,
          forced: true,
          onChange: (e) => updateQuality(e),
        };
        new Plyr(video, defaultOptions);
        // video.play();
      });
      window.hls = hls;
    } else {
      new Plyr(video, defaultOptions);
    }

    function updateQuality(newQuality) {
      window.hls.levels.forEach((level, levelIndex) => {
        if (level.height === newQuality) {
          console.log("Found quality match with " + newQuality);
          window.hls.currentLevel = levelIndex;
        }
      });
    }
  }, []);

  return (
    <div className="video-container">
      <video controls playsInline ref={videoRef}>
        <source
          ref={sourceRef}
          src={props.source}
          type="application/x-mpegURL"
        />
      </video>
    </div>
  );
}
