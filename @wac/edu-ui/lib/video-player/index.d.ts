/// <reference types="react" />
import './index.less';
import { VideoPlayerProps } from './interface';
declare function VideoPlayer({ src, videoIsLandscape, poster, isMobile, controlBarShowTime, onReady, onEnd, onPlay, onPause, onSeeked, onRateChange, onFullscreen, onExitFullscreen, onControlBarShow, onControlBarHide, }: VideoPlayerProps): JSX.Element;
export default VideoPlayer;
