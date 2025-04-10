"use client";

import React, { useEffect, useRef } from "react";

type AutoPlayVideoProps = {
    id: string;
    src: string;
    poster: string;
};

const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ id, src, poster }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        // Save the ref to avoid issues if it changes during cleanup
        const currentVideo = videoRef.current;

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && currentVideo) {
                    currentVideo.play();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        if (currentVideo) {
            observer.observe(currentVideo);
        }

        return () => {
            if (currentVideo) {
                observer.unobserve(currentVideo);
            }
        };
    }, []);

    return (
        <div>
            <video
                id={id}
                className="w-full"
                ref={videoRef}
                width="100%"
                poster={poster}
                preload="none"
                muted
                loop // Added loop attribute to make the video loop
            >
                <source src={src} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default AutoPlayVideo;
