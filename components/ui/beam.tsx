"use client";

import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./beam.module.css";

const Beam = ({ className }: { className?: string }) => {
    const meteorRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const meteor = meteorRef.current;
        if (!meteor) return;

        const handleAnimationEnd = () => {
            meteor.style.visibility = "hidden";
            const animationDelay = Math.floor(Math.random() * (3 - 0) + 0);
            const animationDuration = Math.floor(Math.random() * (4 - 0) + 0);
            const meteorWidth = Math.floor(Math.random() * (100 - 20) + 20);
            meteor.style.setProperty("--meteor-delay", `${animationDelay}s`);
            meteor.style.setProperty("--meteor-duration", `${animationDuration}s`);
            meteor.style.setProperty("--meteor-width", `${meteorWidth}px`);

            restartAnimation();
        };

        const handleAnimationStart = () => {
            meteor.style.visibility = "visible";
        };

        meteor.addEventListener("animationend", handleAnimationEnd);
        meteor.addEventListener("animationstart", handleAnimationStart);

        return () => {
            if (meteor) {
                meteor.removeEventListener("animationend", handleAnimationEnd);
                meteor.removeEventListener("animationstart", handleAnimationStart);
            }
        };
    }, []);

    const restartAnimation = () => {
        const meteor = meteorRef.current;
        if (!meteor) return;
        meteor.style.animation = "none";
        void meteor.offsetWidth;
        meteor.style.animation = "";
    };

    return (
        <span
            ref={meteorRef}
            className={twMerge(
                "absolute z-[40] h-[0.1rem] w-[0.1rem] rounded-[9999px] bg-blue-700 shadow-[0_0_0_1px_#ffffff10] rotate-[180deg]",
                styles.meteor,
                className
            )}
        ></span>
    );
};

export default Beam;
