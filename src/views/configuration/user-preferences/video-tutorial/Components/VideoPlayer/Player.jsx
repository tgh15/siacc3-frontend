import { useEffect, useRef, useState } from "react";
// import { Hls } from "hls.js";
import "./Player.css";
const Hls = window.Hls;

const Player = (props) => {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const mainMenuRef = useRef(null);
  const resolusiMenuRef = useRef(null);
  const kecepatanMenuRef = useRef(null);
  const settingMenuRef = useRef(null);

  const [quality, setQuality] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;
    const volumeSlider = volumeSliderRef.current;

    volumeSlider.addEventListener("input", (e) => {
      video.volume = e.target.value;
      video.muted = e.target.value === 0;
    });

    video.addEventListener("play", () => {
      videoContainer.classList.remove("paused");
    });

    video.addEventListener("pause", () => {
      videoContainer.classList.add("paused");
    });

    video.addEventListener("volumechange", () => {
      volumeSlider.value = video.volume;
      let volumeLevel;
      if (video.muted || video.volume === 0) {
        volumeSlider.value = 0;
        volumeLevel = "muted";
      } else if (video.volume >= 0.5) {
        volumeLevel = "high";
      } else {
        volumeLevel = "low";
      }

      videoContainer.dataset.volumeLevel = volumeLevel;
    });
    let videoSource = `http://147.139.162.58:5002${props.source}`;
    let videoSourceSplit = videoSource.split(".");
    let extension = videoSourceSplit[videoSourceSplit.length - 1];
    if (extension == "m3u8") {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSource); //sumber dari tag video src
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
          //looping resolusi yag tersedia
          const availableQualities = hls.levels.map((l) => l.height);
          console.log(availableQualities); //array resolusi [720, 480, 360]
          setQuality(availableQualities); //simpan resolusi ke state
          // video.play();
        });
        // window.hls.currentLevel = 0;
        window.hls = hls;
        setCurrentLevel(window.hls.currentLevel); //resolusi yg terpakai
        console.log(window.hls.currentLevel);
      }
    }
  }, [document]);

  function toggleMute() {
    videoRef.current.muted = !videoRef.current.muted;
  }

  function toggleTheater() {
    document.fullscreenElement && document.exitFullscreen();
    videoContainerRef.current.classList.toggle("theater");
  }
  function toggleFullscren() {
    if (document.fullscreenElement == null) {
      videoContainerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    videoContainerRef.current.classList.toggle("fullscreen");
  }

  function togglePlay() {
    videoRef.current.paused
      ? videoRef.current.play()
      : videoRef.current.pause();
  }

  function skip(duration) {
    videoRef.current.currentTime += duration;
  }

  function showResolusiMenu() {
    mainMenuRef.current.classList.add("tw-hidden");
    resolusiMenuRef.current.classList.remove("tw-hidden");
  }
  function showKecepatanMenu() {
    mainMenuRef.current.classList.add("tw-hidden");
    kecepatanMenuRef.current.classList.remove("tw-hidden");
  }

  function backToMainMenu() {
    mainMenuRef.current.classList.remove("tw-hidden");
    resolusiMenuRef.current.classList.add("tw-hidden");
    kecepatanMenuRef.current.classList.add("tw-hidden");
  }

  function setLevel(level) {
    setCurrentLevel(level);
    window.hls.currentLevel = level;
  }

  function changeSpeed(speed) {
    videoRef.current.playbackRate = speed;
    setSpeed(speed);
  }

  function toggleSetting() {
    settingMenuRef.current.classList.toggle("tw-hidden");
  }

  return (
    <div
      className="video-container paused"
      data-volume-level="high"
      ref={videoContainerRef}
    >
      <div className="video-controls-container tw-text-white">
        <div className="timeline-container"></div>
        <div className="controls">
          <button className="play-pause-btn" onClick={togglePlay}>
            <svg className="play-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
            </svg>
            <svg className="pause-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
            </svg>
          </button>
          <button className="fast-backward-btn" onClick={() => skip(-10)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              strokeWidth={1.5}
              className="tw-w-6 tw-h-6"
              viewBox="0 0 384.688 438.25"
            >
              <path
                id="Color_Fill_2"
                data-name="Color Fill 2"
                d="M260,37c15.83-.3,17.779,6.265,25,14,1.065,19-9.628,28.041-22,36v1h2c3.606,2.2,9.232.827,14,2,8.739,2.151,18.092,3.1,27,6,32.668,10.622,73.7,30.712,92,55,17.156,22.769,32.189,46.507,42,77l7,35v15c3.877,18.272-2.579,42.537-7,57-16.34,53.459-46.8,87.746-90,114-14.746,8.961-34.372,14.8-52,20-27,7.96-65.079,5.437-90-2-67.722-20.21-99.532-49.7-128-109-15.162-31.585-20.9-85.774-9-125,2.2-7.249,2.2-14.411,6-20,2.513-3.7,7.777-4.969,11-8,15.32-1.072,33.068,5.313,28,26-7.143,29.159-14.9,61.262-4,95,16.306,50.476,49.695,82.131,99,100,23.829,8.636,60.883,10.473,87,2,47.857-15.526,80.689-47.892,99-93,12.013-29.592,9.359-77.865-2-105-22.051-52.679-63.869-97.122-138-97v1c11.765,7.748,20.382,19.964,30,30,1.349,15.812-8.895,35.864-29,27-7.894-3.48-14.11-13.109-20-19-11.81-11.812-24.073-23.32-36-35-7.94-7.775-16.084-10.76-16-27,3.1-3.292,3.321-8.131,6-12,3.805-5.5,12.179-10.179,17-15,9.167-9.167,18.833-17.833,28-27l12-13C252.34,40.526,256.748,39.608,260,37Zm-80,3c15.434-.375,26.048,7.931,26,23-2.46,3.451-2.571,8.627-5,12-3.872,5.376-11.652,9.96-17,14l-8,9c-6.288,4.751-17.18,11.184-20,19l45,44c3.072,4.373,5.375,13.977,2,19-2.153,8.126-7.837,9.161-13,14H177c-7.983-2.585-13.537-11.537-19-17q-20-20-40-40c-5.946-5.948-18.283-15.621-12-30,3.362-7.694,14.44-15.046,21-20l12-13c10.238-7.72,18.229-18.658,28-26C171.08,44.935,175.924,43.226,180,40ZM289,215c18.408,3.2,32.731,7.1,40,21,12.9,24.665,9.794,72.5-5,92-4.592,6.053-15.63,10.96-24,13-53.64,13.073-67.538-61-51-100,4.058-9.569,13.384-19.047,23-23C276.614,216.1,284.687,217.57,289,215Zm-114,3h47V341H192V245H175V218Zm107,25c-0.86.649-3.144,1.338-4,2-15.561,5.221-13.416,49.728-5,62,1.784,2.6,5.7,3.848,8,6,7.094,0.344,10.33-.131,17-1a109.557,109.557,0,0,1,9-11c0.4-20.888-3.775-38.432-8-54C293.907,244.591,290.052,243.027,282,243Z"
                transform="translate(-64.625 -37)"
              />
            </svg>
          </button>
          <button className="fast-forward-btn" onClick={() => skip(10)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              strokeWidth={1.5}
              className="tw-w-6 tw-h-6"
              viewBox="0 0 384.688 438.25"
            >
              <path
                id="Color_Fill_1"
                data-name="Color Fill 1"
                d="M242,28c20.151-.314,91.357,65.1,83,85-3.512,8.366-64.742,67.578-73,70-6.428,1.885-15.719-.79-19-3-28.184-18.984,13.16-44.888,22-56-93.778-1.29-173.426,92.5-142,195,14.976,48.848,52.938,85.12,102,100,92.194,27.961,165.8-39.632,185-103,6.071-20.039,7.469-53.132,2-75l-7-23c-0.88-14.75,16.365-29.632,32-21,23.255,12.839,24.884,91.469,16,124-22.862,83.717-81.092,129.223-174,144-32.287,5.135-62.095-6.735-83-15C107.348,418.9,37.042,329.9,73,215,96.736,139.156,157.951,87.257,249,79l-4-5C222.659,64.457,222.112,40.092,242,28Zm81,3c18.04-.153,88.712,62.456,84,81-2.434,9.579-66.089,72.574-76,74-14.819,2.132-28.485-14.076-23-29,4.234-11.519,37.528-42.373,48-50l-5-6L331,83C311.458,67.2,290.837,50.768,323,31ZM289,215c15.059,2.4,28.569,5.211,36,15,25.042,32.99,13.238,103.137-25,111-51.056,10.5-66.057-48.485-54-91C253.05,225.141,265.124,223.72,289,215Zm-114,3h47V341H192V245H175V218Zm107,25c-25.707,13.66-21.332,82.537,19,67,7.309-12.114,8.977-55.649-5-64C292.5,243.533,288.3,242.933,282,243Z"
                transform="translate(-63.313 -28)"
              />
            </svg>
          </button>

          <div className="volume-container">
            <button className="mute-btn" onClick={toggleMute}>
              <svg className="volume-high-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"
                />
              </svg>
              <svg className="volume-low-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"
                />
              </svg>
              <svg className="volume-muted-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"
                />
              </svg>
            </button>
            <input
              className="volume-slider range accent-white"
              type="range"
              min="0"
              max="1"
              step="any"
              ref={volumeSliderRef}
            />
          </div>
          <div className="setting-container tw-flex">
            <div
              className="setting-menu tw-bg-white tw-p-2 tw-text-gray-500 tw-flex tw-flex-col"
              ref={settingMenuRef}
            >
              <div className="main-menu" ref={mainMenuRef}>
                <button onClick={showResolusiMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
                    />
                  </svg>
                  <span className="tw-text-left tw-flex-grow">Resolusi</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
                <button onClick={showKecepatanMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                  <span className="tw-text-left tw-flex-grow">Kecepatan</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
              <div className="resolusi-menu tw-hidden" ref={resolusiMenuRef}>
                <button onClick={backToMainMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>

                  <span className="text-left flex-grow">Resolusi</span>
                </button>
                <button
                  className={currentLevel === -1 ? "tw-font-bold" : ""}
                  onClick={() => setLevel(-1)}
                >
                  Auto
                </button>
                {quality.map((q, i) => (
                  <button
                    key={i}
                    className={currentLevel === i ? "tw-font-bold" : ""}
                    onClick={() => setLevel(i)}
                  >
                    {q}p
                  </button>
                ))}
              </div>
              <div className="kecepatan-menu tw-hidden" ref={kecepatanMenuRef}>
                <button onClick={backToMainMenu}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="tw-w-5 tw-h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>

                  <span className="tw-text-left tw-flex-grow">Kecepatan</span>
                </button>
                <button
                  className={speed == 0.5 ? "tw-font-bold" : ""}
                  onClick={() => changeSpeed(0.5)}
                >
                  0,5x
                </button>
                <button
                  className={speed == 1 ? "tw-font-bold" : ""}
                  onClick={() => changeSpeed(1)}
                >
                  Normal
                </button>
                <button
                  className={speed == 1.5 ? "tw-font-bold" : ""}
                  onClick={() => changeSpeed(1.5)}
                >
                  1.5x
                </button>
                <button
                  className={speed == 2 ? "tw-font-bold" : ""}
                  onClick={() => changeSpeed(2)}
                >
                  2x
                </button>
              </div>
            </div>
            <button className="setting-btn" onClick={toggleSetting}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="tw-w-6 tw-h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <button className="theater-btn" onClick={toggleTheater}>
            <svg className="tall" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
              />
            </svg>
            <svg className="wide" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
              />
            </svg>
          </button>
          <button className="fullscren-btn" onClick={toggleFullscren}>
            <svg className="open" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
              />
            </svg>
            <svg className="close" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <video ref={videoRef} src={`http://147.139.162.58:5002${props.source}`} />
    </div>
  );
};

export default Player;
