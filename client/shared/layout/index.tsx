import React from "react";
import {connect} from "shared/utils/metamask";
import Particles, {IParticlesProps} from "react-tsparticles";
import {useRouter} from "next/router";
import {loadFull} from "tsparticles";
import {FaArrowLeft} from "react-icons/fa";

const P = Particles as any;

const particles: IParticlesProps["options"] = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
    color: {
      value: "#ffffff",
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000",
      },
      polygon: {
        nb_sides: 10,
      },
      image: {
        src: "img/github.svg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 4,
      random: true,
      anim: {
        enable: false,
        speed: 80,
        size_min: 0.1,
        sync: false,
      },
    },
    line_linked: {
      enable: true,
      distance: 300,
      color: "#ffffff",
      opacity: 0.4,
      width: 2,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: true,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 800,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 800,
        size: 80,
        duration: 2,
        opacity: 0.8,
        speed: 3,
      },
      repulse: {
        distance: 400,
        duration: 0.4,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
};

const Layout: React.FunctionComponent<{}> = ({children}) => {
  const router = useRouter();
  const home = router.asPath === "/";

  const handleGoBack = () => {
    router.back();
  };

  const particlesInit = async (main: any) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <div
      id="particles-js"
      className={`bg-black w-full text-white relative`}
      style={{height: "100%"}}
    >
      {!home && (
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-white font-bold py-2 px-4 rounded cursor-pointer"
          style={{zIndex: 200}}
        >
          <FaArrowLeft />
        </button>
      )}

      <P init={particlesInit} options={particles} />
      <div className="flex font-montserrat flex relative" style={{zIndex: 100}}>
        <div className={`w-full md:px-20 sm:px-40 pt-8`}>{children}</div>
      </div>
      {/* Footer */}
    </div>
  );
};

export default Layout;
