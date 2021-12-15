import React from "react"
import "../../node_modules/video.js/dist/video.min"
import "../../node_modules/video.js/dist/video-js.min.css"
import "./videoplayer.scss"

const VideoPlayer = ({ videoSrcURL, videoTitle, ...props }) => {
    
    return (
        <div className="videoContainer">
            <video
                id="my-video"
                className="video-js"
                controls
                preload="auto"
                data-setup='{"controls": true, "autoplay": false, "preload": "auto"}'
            >
                <source src={videoSrcURL} type="video/mp4" />
                
            </video>
        </div>
    )
}

export default VideoPlayer