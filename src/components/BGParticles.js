import Particles from "react-tsparticles";

const BGParticles = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        particles: {
          color: {
            value: "#9a9a9a",
          },
          links: {
            color: "#9a9a9a",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            outMode: "bounce",
            speed: 2,
          },
          number: {
            value: 65,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
        },
      }}
    />
  );
};

export default BGParticles;