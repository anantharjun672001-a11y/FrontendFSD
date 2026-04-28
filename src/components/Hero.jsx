import heroVideo from "../assets/videos/sesha_ramya.mp4";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      />

      {/* overlay gradient  */}
      <div className="absolute w-full h-full bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>

    </div>
  );
};

export default Hero;