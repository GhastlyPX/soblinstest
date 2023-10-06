import React, { useEffect } from "react";
//@ts-ignore
import { Howl } from "howler";
import Background from "../../public/sounds/background.mp3";
import { useAtomValue } from "jotai";
import { muteAtom } from "../../atoms/atoms";

const BackgroundMusic: React.FC = () => {
  const mute = useAtomValue(muteAtom);
  useEffect(() => {
    if (mute === "false") {
      const sound = new Howl({
        src: [Background],
        loop: true,
        autoplay: true,
        volume: 0.3,
      });

      sound.play();

      return () => {
        sound.unload();
      };
    } else {
      return;
    }
  }, [mute]);

  return null; // This component doesn't render anything
};

export default BackgroundMusic;
