export interface VideoPlayerProps {
    src: string;
    videoIsLandscape: boolean;
    poster: string;
    isMobile: boolean;
    controlBarShowTime: number;
    onReady: (HTMLVideoElement: any) => void;
    onEnd: () => void;
    onPlay: () => void;
    onPause: () => void;
    onSeeked: () => void;
    onRateChange: () => void;
    onFullscreen: () => void;
    onExitFullscreen: () => void;
    onControlBarShow: () => void;
    onControlBarHide: () => void;
}
