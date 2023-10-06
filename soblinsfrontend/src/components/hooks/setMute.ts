import { useAtomValue, useSetAtom } from "jotai";
import { useState, useEffect } from "react";
import { muteAtom } from "../../../atoms/atoms";

const useMute = () => {
  const mute = useAtomValue(muteAtom);
  const setMute = useSetAtom(muteAtom);

  useEffect(() => {
    // Get the trading mode from local storage
    const storedMute = localStorage.getItem("mute");
    if (storedMute) {
      setMute(storedMute);
    } else if (!storedMute) {
      updateMode("false");
    }
  }, [mute]);

  const updateMode = (mode: string) => {
    // Set the trading mode in local storage
    localStorage.setItem("mute", mode);
    setMute(mode);
  };

  return { updateMode };
};

export default useMute;
