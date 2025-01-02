import React from 'react';

import { useCallback } from "react";
import Particles from "react-tsparticles";

import { loadSlim } from "tsparticles-slim";

const BannerParticles = () => {
  const particlesInit = useCallback(async engine => {
   
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
   
}, []);
  return (
    <Particles
    id="particles-js"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{
        fullScreen: {
            enable: false,
          },
        
        fpsLimit: 120,
        
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: false,
                    mode: "repulse",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
            
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            links: {  
                enable: false,
            },
            move: {
                direction: "top",
                enable: true,
                random: false,
                speed: 4,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 15,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 10 },
            },
        },
        detectRetina: true,
    }}
/>
  )
}

export default BannerParticles
