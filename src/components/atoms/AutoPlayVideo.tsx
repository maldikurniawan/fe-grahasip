/* eslint-disable @next/next/no-img-element */
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
        // Function to handle IntersectionObserver logic
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && videoRef.current) {
                    // Play the video when it enters the viewport
                    videoRef.current.play();
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5, // Trigger when 50% of the video is visible
        });

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
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
