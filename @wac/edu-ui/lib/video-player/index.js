"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.map.js");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _hls = _interopRequireDefault(require("hls.js"));

require("./index.less");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _util = require("./util");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

/**
 * 视频播放器
 */
_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faPlay);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faPause);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faVolumeUp);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faVolumeOff);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faExpand);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faCompress);

_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faCirclePlay);

function VideoPlayer(_ref) {
  var src = _ref.src,
      videoIsLandscape = _ref.videoIsLandscape,
      poster = _ref.poster,
      isMobile = _ref.isMobile,
      _ref$controlBarShowTi = _ref.controlBarShowTime,
      controlBarShowTime = _ref$controlBarShowTi === void 0 ? 4 : _ref$controlBarShowTi,
      onReady = _ref.onReady,
      onEnd = _ref.onEnd,
      onPlay = _ref.onPlay,
      onPause = _ref.onPause,
      onSeeked = _ref.onSeeked,
      onRateChange = _ref.onRateChange,
      onFullscreen = _ref.onFullscreen,
      onExitFullscreen = _ref.onExitFullscreen,
      onControlBarShow = _ref.onControlBarShow,
      onControlBarHide = _ref.onControlBarHide;

  var videoRef = _react.default.useRef(null);

  var controlBarRef = _react.default.useRef(null);

  var progressBarRef = _react.default.useRef(null); // 拖动条


  var playBarRef = _react.default.useRef(null); // 已播条


  var playRef = _react.default.useRef(null); // 播放按钮


  var playbackRateRef = _react.default.useRef(null);

  var playbackRatePanelContainerRef = _react.default.useRef(null);

  var fullscreenRef = _react.default.useRef(null);

  var timerRef = _react.default.useRef(null);

  var timerControlBarRef = _react.default.useRef(null);

  var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      paused = _useState2[0],
      setPaused = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      expanded = _useState4[0],
      setExpanded = _useState4[1];

  var _useState5 = (0, _react.useState)(1),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      rate = _useState6[0],
      setRate = _useState6[1];

  var _useState7 = (0, _react.useState)(0),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      currentTime = _useState8[0],
      setCurrentTime = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      allTime = _useState10[0],
      setAllTime = _useState10[1];

  var _useState11 = (0, _react.useState)(true),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      showPoster = _useState12[0],
      setShowPoster = _useState12[1];

  (0, _react.useEffect)(function () {
    var isM3U8 = src.substring(src.length - 5).toLowerCase() === '.m3u8';

    if (isM3U8 && _hls.default.isSupported()) {
      var hls = new _hls.default();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
    } else {
      videoRef.current.src = src;
    } // video


    videoRef.current.addEventListener('durationchange', onVideoDurationChange);
    videoRef.current.addEventListener('ended', onVideoEnd); // 进度条

    !isMobile && progressBarRef.current.addEventListener('mousedown', onMouseDown);
    isMobile && progressBarRef.current.addEventListener('touchstart', onTouchStart); // 播放/暂停按钮

    playRef.current.addEventListener('click', onPlayBtnClick); // 倍速按钮

    playbackRateRef.current.addEventListener('click', onPlaybackRateBtnClick); // 全屏按钮

    fullscreenRef.current.addEventListener('click', onFullscreenBtnClick);
    onReady && onReady(videoRef.current);
  }, []);
  (0, _react.useEffect)(function () {
    document.addEventListener('click', function () {
      showVideoControlBar();
    });
    return function () {
      clearInterval(timerRef.current);
    };
  }, []);

  function onVideoDurationChange() {
    setAllTime(videoRef.current.duration);
  }

  function onVideoEnd() {
    videoRef.current.pause();
    onPause && onPause();
    setPaused(true);
  }

  function onMouseDown(e) {
    onMouseMove(e);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseUp() {
    removeMouseEvents();
    onSeeked && onSeeked();
  }

  function onMouseMove(e) {
    onProgressBarMove(e.clientX);
  }

  function removeMouseEvents() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function onTouchStart(e) {
    onTouchMove(e);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
  }

  function onTouchEnd() {
    removeTouchEvents();
    onSeeked && onSeeked();
  }

  function onTouchMove(e) {
    onProgressBarMove(e.touches[0].clientX);
  }

  function removeTouchEvents() {
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  }

  function onProgressBarMove(clientX) {
    if (!isFinite(videoRef.current.duration)) return; // 鼠标点击位置的横坐标位置 - progressBar到浏览器左边的距离

    var playBarWidth = clientX - progressBarRef.current.offsetLeft;
    var progressBarWidth = parseInt((0, _util.getStyle)(progressBarRef.current, 'width'));
    if (playBarWidth < 0 || playBarWidth > progressBarWidth) return;
    var rate = playBarWidth / progressBarWidth;
    playBarRef.current.style.width = rate * 100 + '%';
    videoRef.current.currentTime = videoRef.current.duration * rate;
    setCurrentTime(videoRef.current.currentTime);
    checkVideoEnd();
  }

  function onPlayBtnClick() {
    if (videoRef.current.paused) {
      videoRef.current.play();
      timerRef.current = setInterval(function () {
        playBarRef.current.style.width = videoRef.current.currentTime / videoRef.current.duration * 100 + '%';
        setCurrentTime(videoRef.current.currentTime);
        checkVideoEnd();
      }, 1000);
      onPlay && onPlay();
      setPaused(false);
    } else {
      videoRef.current.pause();
      clearInterval(timerRef.current);
      onPause && onPause();
      setPaused(true);
    }
  }

  function onPlaybackRateBtnClick() {
    playbackRatePanelContainerRef.current.style.display = 'flex';
  }

  function onPlaybackRatePanelContainerClick() {
    playbackRatePanelContainerRef.current.style.display = 'none';
  }

  function changePlaybackRate(playbackRate) {
    videoRef.current.playbackRate = playbackRate;
    setRate(playbackRate);
    playbackRatePanelContainerRef.current.style.display = 'none';
    onRateChange && onRateChange();
  }

  function onFullscreenBtnClick() {
    if (videoRef.current.expanded) {
      onExitFullscreen && onExitFullscreen();
      videoRef.current.expanded = false;
      setExpanded(false);
    } else {
      onFullscreen && onFullscreen();
      videoRef.current.expanded = true;
      setExpanded(true);
    }
  }

  function showVideoControlBar() {
    controlBarRef.current.style.visibility = 'visible';
    onControlBarShow && onControlBarShow();

    if (timerControlBarRef.current) {
      clearTimeout(timerControlBarRef.current);
    }

    timerControlBarRef.current = setTimeout(function () {
      controlBarRef.current.style.visibility = 'hidden';
      onControlBarHide && onControlBarHide();
      timerControlBarRef.current = null;
    }, controlBarShowTime * 1000);
  }

  function checkVideoEnd() {
    if (videoRef.current.currentTime === videoRef.current.duration) {
      onEnd && onEnd();
      clearInterval(timerRef.current);
    }
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "video-player"
  }, showPoster && /*#__PURE__*/_react.default.createElement("div", {
    className: "v-video-poster"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "poster-background"
  }), /*#__PURE__*/_react.default.createElement("img", {
    className: "poster",
    src: poster
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    className: "big-play-btn",
    icon: "circle-play",
    onClick: function onClick() {
      setShowPoster(false);
      onPlayBtnClick();
    }
  })), /*#__PURE__*/_react.default.createElement("video", {
    ref: videoRef,
    className: "v-video",
    playsInline: true,
    "webkit-playsinline": "true",
    autoPlay: false
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: controlBarRef,
    className: "v-control-bar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: progressBarRef,
    className: "v-progress-bar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "v-progress-background"
  }, /*#__PURE__*/_react.default.createElement("div", {
    ref: playBarRef,
    className: "v-play-bar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "v-play-bar-dot"
  })))), /*#__PURE__*/_react.default.createElement("div", {
    className: "v-current-time"
  }, (0, _util.formatSeconds)(currentTime)), /*#__PURE__*/_react.default.createElement("div", {
    className: "v-total-time"
  }, (0, _util.formatSeconds)(allTime)), /*#__PURE__*/_react.default.createElement("div", {
    className: "v-buttons"
  }, /*#__PURE__*/_react.default.createElement("button", {
    ref: playRef,
    className: "v-play"
  }, paused ? /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "play"
  }) : /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "pause"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "rate-and-fullscreen"
  }, /*#__PURE__*/_react.default.createElement("button", {
    ref: playbackRateRef,
    className: "v-playback-rate"
  }, rate === 1 ? '倍速' : rate + '倍'), /*#__PURE__*/_react.default.createElement("button", {
    ref: fullscreenRef,
    className: "v-fullscreen"
  }, expanded ? /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "compress"
  }) : /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: "expand"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "playback-rate-panel-container",
    ref: playbackRatePanelContainerRef,
    onClick: onPlaybackRatePanelContainerClick
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'v-playback-rate-panel ' + (videoIsLandscape ? 'landscape-panel' : '')
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "option-title"
  }, "\u500D\u901F\u9009\u62E9"), [2, 1.5, 1.25, 1, 0.75].map(function (item) {
    return /*#__PURE__*/_react.default.createElement("div", {
      key: item,
      className: 'v-playback-rate-option ' + (rate === item ? 'selected-option' : ''),
      onClick: function onClick() {
        changePlaybackRate(item);
      }
    }, item, "\u500D");
  }))));
}

var _default = VideoPlayer;
exports.default = _default;