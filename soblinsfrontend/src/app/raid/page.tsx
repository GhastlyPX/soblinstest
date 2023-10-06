"use client";

import Image from "next/image";
import Navigation from "@/components/navigation";
import Bet from "@/components/bet";
import Warning from "@/components/warning";
import Result from "@/components/result";
import User from "@/components/user";
import { useEffect, useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import BackgroundMusic from "@/components/backgroundMusic";
import map from "../assets/map.gif";
import hut1Raiding from "../assets/hut1Raiding.gif";
import hut2Raiding from "../assets/hut2Raiding.gif";
import hut3Raiding from "../assets/hut3Raiding.gif";
import hut4Raiding from "../assets/hut4Raiding.gif";
import hut5Raiding from "../assets/hut5Raiding.gif";
import hut1Losing from "../assets/hut1Losing.gif";
import hut2Losing from "../assets/hut2Losing.gif";
import hut3Losing from "../assets/hut3Losing.gif";
import hut4Losing from "../assets/hut4Losing.gif";
import hut5Losing from "../assets/hut5Losing.gif";
import hut1Winning from "../assets/hut1Winning.gif";
import hut2Winning from "../assets/hut2Winning.gif";
import hut3Winning from "../assets/hut3Winning.gif";
import hut4Winning from "../assets/hut4Winning.gif";
import hut5Winning from "../assets/hut5Winning.gif";
import { ErrorType, handleError } from "@/errors/error-cases";
import "react-toastify/dist/ReactToastify.css";
import Raid from "../../../public/sounds/raid.mp3";
import Win from "../../../public/sounds/win.mp3";
import Lose from "../../../public/sounds/lose.mp3";
import Background from "../../../public/sounds/background.mp3";
//@ts-ignore
import useSound from "use-sound";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import {
  API_URL,
  BET_URL,
  FEE_RATE,
  HOUSE_WALLET,
  RPC_URL,
} from "@/constants/constants";
import { AnchorProvider } from "@project-serum/anchor";
import { base64 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { ToastContainer, toast } from "react-toastify";
import { useAtomValue } from "jotai";
import { muteAtom } from "../../../atoms/atoms";

export default function Home() {
  const { publicKey, sendTransaction } = useWallet();
  const anchorWallet = useAnchorWallet();
  const connection = new Connection(RPC_URL);
  const provider = new AnchorProvider(
    connection,
    anchorWallet as any,
    AnchorProvider.defaultOptions()
  );

  function getTranslateXValue(translateString: any) {
    var n = translateString.indexOf("(");
    var n1 = translateString.indexOf(",");
    var res = parseInt(translateString.slice(n + 1, n1 - 2));
    return res;
  }

  function getTranslateYValue(translateString: any) {
    var n = translateString.indexOf(",");
    var n1 = translateString.indexOf(")");
    var res = parseInt(translateString.slice(n + 1, n1 - 1));
    return res;
  }

  useEffect(() => {
    const mapDrag: any = document.getElementById("map");
    mapDrag.style.transform = `translate(0px, 0px)`;
    let isDragging = false;

    window.addEventListener("resize", () => {
      mapDrag.style.transform = `translate(0px, 0px)`;
    });

    //desktop
    mapDrag?.addEventListener("mousedown", () => {
      isDragging = true;
    });
    mapDrag?.addEventListener("mouseup", () => {
      isDragging = false;
    });
    mapDrag?.addEventListener("mousemove", (e: any) => {
      if (isDragging) {
        let currentTransform = mapDrag.style.transform;
        let currentTransformX = getTranslateXValue(currentTransform);
        let currentTransformY = getTranslateYValue(currentTransform);
        let newX: any = 0;
        let newY: any = 0;
        if (mapDrag.getBoundingClientRect().left + e.movementX > 0) {
          newX = 0;
        } else if (
          mapDrag.getBoundingClientRect().left <
          (mapDrag.getBoundingClientRect().height * 1.78 + e.movementX) * -1 +
            window.innerWidth
        ) {
          newX =
            mapDrag.getBoundingClientRect().height * 1.78 * -1 +
            window.innerWidth;
        } else {
          newX = currentTransformX + e.movementX;
        }
        if (mapDrag.getBoundingClientRect().top + e.movementY > 0) {
          newY = 0;
        } else if (
          mapDrag.getBoundingClientRect().top <
          (mapDrag.getBoundingClientRect().height / 5 + e.movementY) * -1
        ) {
          newY = (mapDrag.getBoundingClientRect().height / 5) * -1;
        } else {
          newY = currentTransformY + e.movementY;
        }
        newX = newX.toFixed(1);
        newX = Math.floor(parseInt(newX));
        newY = newY.toFixed(1);
        newY = Math.floor(parseInt(newY));
        mapDrag.style.transform = `translate(${newX.toFixed(0)}px, ${newY}px)`;
      }
    });

    //mobile
    let touchStartX = 0;
    let touchStartY = 0;
    mapDrag?.addEventListener("touchstart", (e: any) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
    });
    mapDrag?.addEventListener("touchend", (e: any) => {
      isDragging = false;
    });
    mapDrag?.addEventListener("touchmove", (e: any) => {
      e.preventDefault();
      if (isDragging) {
        let touchDistanceX = e.touches[0].clientX - touchStartX;
        let touchDistanceY = e.touches[0].clientY - touchStartY;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        let currentTransform = mapDrag?.style.transform;
        let currentTransformX = getTranslateXValue(currentTransform);
        let currentTransformY = getTranslateYValue(currentTransform);
        let newX: any = 0;
        let newY: any = 0;
        if (mapDrag.getBoundingClientRect().left + touchDistanceX * 1.5 > 0) {
          newX = 0;
        } else if (
          mapDrag.getBoundingClientRect().left <
          (mapDrag.getBoundingClientRect().height * 1.78 +
            touchDistanceX * 1.5) *
            -1 +
            window.innerWidth
        ) {
          newX =
            mapDrag.getBoundingClientRect().height * 1.78 * -1 +
            window.innerWidth;
        } else {
          newX = currentTransformX + touchDistanceX * 1.5;
        }
        if (mapDrag.getBoundingClientRect().top + touchDistanceY * 1.5 > 0) {
          newY = 0;
        } else if (
          mapDrag.getBoundingClientRect().top <
          (mapDrag.getBoundingClientRect().height / 5 + touchDistanceY * 1.5) *
            -1
        ) {
          newY = (mapDrag.getBoundingClientRect().height / 5) * -1;
        } else {
          newY = currentTransformY + touchDistanceY * 1.5;
        }
        newX = newX.toFixed(1);
        newX = Math.floor(parseInt(newX));
        newY = newY.toFixed(1);
        newY = Math.floor(parseInt(newY));
        mapDrag.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    });
  }, []);

  const raidLocations = [
    {
      id: "hut1",
      raidingGif: hut1Raiding,
      losingGif: hut1Losing,
      winningGif: hut1Winning,
      name: "Fort Soblin",
      successRate: 25,
      offset: 80,
      location: {
        x: 0.468,
        y: 0.285,
      },
    },
    {
      id: "hut2",
      raidingGif: hut2Raiding,
      losingGif: hut2Losing,
      winningGif: hut2Winning,
      name: "Temple",
      successRate: 5,
      offset: 0,
      location: {
        x: 0.728,
        y: 0.385,
      },
    },
    {
      id: "hut3",
      raidingGif: hut3Raiding,
      losingGif: hut3Losing,
      winningGif: hut3Winning,
      name: "Mineshaft",
      successRate: 10,
      offset: 0,
      location: {
        x: 0.458,
        y: 0.525,
      },
    },
    {
      id: "hut4",
      raidingGif: hut4Raiding,
      losingGif: hut4Losing,
      winningGif: hut4Winning,
      name: "Blacksmith",
      successRate: 50,
      offset: 0,
      location: {
        x: 0.327,
        y: 0.76,
      },
    },
    {
      id: "hut5",
      raidingGif: hut5Raiding,
      losingGif: hut5Losing,
      winningGif: hut5Winning,
      name: "Barnyard",
      successRate: 75,
      offset: 0,
      location: {
        x: 0.793,
        y: 0.785,
      },
    },
  ];

  useEffect(() => {
    const mapDrag: any = document.getElementById("map");
    for (let i = 0; i < raidLocations.length; i++) {
      if (!isRaidActive) {
        const mapLocation: any = document.getElementById(raidLocations[i].id);
        const x = mapDrag.getBoundingClientRect().width;
        const newX = x * raidLocations[i].location.x;
        const y = mapDrag.getBoundingClientRect().height;
        const newY = y * raidLocations[i].location.y;
        mapLocation.style.transform = `translate(${newX}px, ${newY}px)`;
        mapLocation.style.display = "block";
      }
    }
    window.addEventListener("resize", () => {
      const mapDrag: any = document.getElementById("map");
      for (let i = 0; i < raidLocations.length; i++) {
        if (!isRaidActive) {
          const mapLocation: any = document.getElementById(raidLocations[i].id);
          const x = mapDrag?.getBoundingClientRect()?.width;
          const newX = x * raidLocations[i].location.x;
          const y = mapDrag?.getBoundingClientRect()?.height;
          const newY = y * raidLocations[i].location.y;
          if (mapLocation) {
            mapLocation.style.transform = `translate(${newX}px, ${newY}px)`;
          }
        }
      }
    });
  }, []);

  const [isWarningActive, setIsWarningActive] = useState(false);
  const [isResultActive, setIsResultActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [currentResult, setCurrentResult] = useState();
  const [currentHut, setCurrentHut] = useState({});
  const [currentBackground, setCurrentBackground] = useState(map.src);
  const [isRaidActive, setIsRaidActive] = useState(false);
  const [currentRaiding, setCurrentRaiding] = useState("");
  const [endAnimation, setEndAnimation] = useState("");
  const mute = useAtomValue(muteAtom);
  const [raidSound, { stop }] = useSound(Raid, {
    volume: 1,
  });
  const [winSound] = useSound(Win, {
    volume: 1,
  });
  const [loseSound] = useSound(Lose, {
    volume: 1,
  });
  const [background] = useSound(Lose, {
    volume: 1,
  });

  function openDropdown(index: any) {
    setIsDropdownActive(true);
    let currentHut = raidLocations[index];
    setCurrentHut(currentHut);
  }

  useEffect(() => {
    if (window.innerWidth / window.innerHeight > 2.225) {
      setIsWarningActive(true);
    } else {
      setIsWarningActive(false);
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth / window.innerHeight > 2.225) {
        setIsWarningActive(true);
      } else {
        setIsWarningActive(false);
      }
    });
  });

  async function exampleRaid(raidLocation: any, bet: number) {
    const raidToast = toast.loading(`Beginning raid...`, {
      position: "top-center",
      progress: undefined,
      theme: "dark",
    });
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey!,
          toPubkey: new PublicKey(HOUSE_WALLET),
          lamports: bet + FEE_RATE,
        })
      );
      transaction.feePayer = publicKey!;
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey!;
      const signedTx = await provider.wallet.signTransaction(transaction);
      const serializedTx = base64.encode(signedTx.serialize());
      const res = await fetch(API_URL, {
        method: "post",
        body: JSON.stringify({
          location: raidLocation.name,
          serializedTx: serializedTx,
        }),
      });
      const body = await res.json();
      if (res.ok) {
        toast.dismiss(raidToast);
        switch (raidLocation.name) {
          case "Fort Soblin":
            setCurrentRaiding("hut1");
            break;
          case "Temple":
            setCurrentRaiding("hut2");
            break;
          case "Mineshaft":
            setCurrentRaiding("hut3");
            break;
          case "Blacksmith":
            setCurrentRaiding("hut4");
            break;
          case "Barnyard":
            setCurrentRaiding("hut5");
            break;
          default:
        }
        setIsRaidActive(true);
        if (mute === "false") {
          raidSound();
        }
        //call the api await result
        setTimeout(() => {
          if (mute === "false") {
            stop();
          }
          //receive result and set background to either winningGif or losingGif
          setCurrentRaiding("");
          setCurrentBackground(raidLocation.winningGif.src);
          if (body.message.includes("won")) {
            if (mute === "false") {
              winSound();
            }
            switch (raidLocation.name) {
              case "Fort Soblin":
                setEndAnimation("hut1Winning");
                break;
              case "Temple":
                setEndAnimation("hut2Winning");
                break;
              case "Mineshaft":
                setEndAnimation("hut3Winning");
                break;
              case "Blacksmith":
                setEndAnimation("hut4Winning");
                break;
              case "Barnyard":
                setEndAnimation("hut5Winning");
                break;
              default:
            }
          } else {
            if (mute === "false") {
              loseSound();
            }
            switch (raidLocation.name) {
              case "Fort Soblin":
                setEndAnimation("hut1Losing");
                break;
              case "Temple":
                setEndAnimation("hut2Losing");
                break;
              case "Mineshaft":
                setEndAnimation("hut3Losing");
                break;
              case "Blacksmith":
                setEndAnimation("hut4Losing");
                break;
              case "Barnyard":
                setEndAnimation("hut5Losing");
                break;
              default:
            }
          }
          setTimeout(() => {
            setEndAnimation("");
            setCurrentBackground(map.src);
            setIsRaidActive(false);
            setCurrentResult(body.message);
            setIsResultActive(true);
            setTimeout(() => {
              const mapDrag: any = document.getElementById("map");
              for (let i = 0; i < raidLocations.length; i++) {
                if (!isRaidActive) {
                  const mapLocation: any = document.getElementById(
                    raidLocations[i].id
                  );
                  const x = mapDrag.getBoundingClientRect().width;
                  const newX = x * raidLocations[i].location.x;
                  const y = mapDrag.getBoundingClientRect().height;
                  const newY = y * raidLocations[i].location.y;
                  mapLocation.style.transform = `translate(${newX}px, ${newY}px)`;
                  mapLocation.style.display = "block";
                }
              }
            }, 250);
          }, 1300);
        }, 3000);
      } else {
        if (mute === "false") {
          stop();
        }
        const errorType = body?.name as ErrorType;
        if (errorType) {
          const error = handleError(errorType);
          console.log(error);
          toast.update(raidToast, {
            render: `${error.name} : ${error.error}`,
            type: "error",
            isLoading: false,
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          console.log("Unhandled error:", body?.message);
        }
      }
    } catch (error) {
      if (mute === "false") {
        stop();
      }
      toast.update(raidToast, {
        render: `An unknown error occured`,
        type: "error",
        isLoading: false,
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return (
    <div className="overflow-hidden w-[100vw] min-h-[100vh] relative bg-[#312E2F]">
      <BackgroundMusic />
      <div
        id="map"
        className="absolute min-w-[222.5vh] min-h-[125vh] bg-center bg-no-repeat bg-cover flex items-center cursor-move"
        style={{ backgroundImage: "url(" + currentBackground + ")" }}
      >
        <div className="min-w-[222.5vh] min-h-[125vh] w-full h-full relative">
          <Image
            src={hut1Raiding}
            alt={"losing"}
            fill={true}
            className={`${
              currentRaiding === "hut1" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut1Losing}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut1Losing" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut1Winning}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut1Winning" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut2Losing}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut2Losing" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut2Winning}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut2Winning" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut2Raiding}
            alt={"losing"}
            fill={true}
            className={`${
              currentRaiding === "hut2" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut3Winning}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut3Winning" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut3Raiding}
            alt={"losing"}
            fill={true}
            className={`${
              currentRaiding === "hut3" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut3Losing}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut3Losing" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut4Losing}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut4Losing" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut4Raiding}
            alt={"losing"}
            fill={true}
            className={`${
              currentRaiding === "hut4" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut4Winning}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut4Winning" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut5Losing}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut5Losing" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut5Raiding}
            alt={"losing"}
            fill={true}
            className={`${
              currentRaiding === "hut5" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
          <Image
            src={hut5Winning}
            alt={"losing"}
            fill={true}
            className={`${
              endAnimation === "hut5Winning" ? "visible" : "invisible"
            } z-[99]`}
            draggable="false"
          />
        </div>
        {!isRaidActive &&
          raidLocations.map((location, index) => (
            <div
              id={location.id}
              key={index}
              className={`hidden absolute h-[110px] w-[8px] bg-[#F5F7FB] top-0 left-0 border-[3px] border-[#312E2F] border-b-0 border-t-0 z-10`}
            >
              <div className="absolute top-[0px] left-[-6px] border-[3px] border-[#312E2F] bg-[#F5F7FB] w-[15px] h-[15px] after:absolute after:bg-[#312E2F] after:w-[5px] after:h-[5px] after:top-[calc(50%-2.5px)] after:left-[calc(50%-2.5px)] z-0"></div>
              <div
                className="absolute top-[50px] lg:top-[100px] left-[-90px] lg:left-[-120px] border-[3px] border-[#312E2F] bg-[#F5F7FB] hover:bg-[#BFC4CA] w-[180px] lg:w-[240px] h-[80px] flex flex-col justify-between z-0 cursor-pointer transition-all"
                onClick={() => openDropdown(index)}
              >
                <div className="h-full flex flex-col gap-1 justify-center items-center overflow-hidden">
                  <p className="text-[#312E2F] text-[18px] lg:text-[24px] leading-[18px] lg:leading-[24px] font-bold uppercase relative before:absolute before:bg-[#312E2F] before:w-full before:h-[3px] before:top-[calc(50%-1.5px)] before:right-[110%] after:absolute after:bg-[#312E2F] after:w-full after:h-[3px] after:top-[calc(50%-1.5px)] after:left-[110%]">
                    {location.name}
                  </p>
                  <p className="text-[#5E5557] text-[10px] lg:text-[12px] leading-[10px] lg:leading-[12px] font-normal">
                    Success Rate: {location.successRate}%
                  </p>
                </div>
                <div className="h-[8px] w-full bg-[#BFC4CA]"></div>
              </div>
            </div>
          ))}
      </div>
      {/* <User /> */}
      <Navigation />
      {isDropdownActive && (
        <Bet
          currentHut={currentHut}
          setIsDropdownActive={setIsDropdownActive}
          exampleRaid={exampleRaid}
        />
      )}
      {isWarningActive && <Warning />}
      {isResultActive && (
        <Result
          currentHut={currentHut}
          currentResult={currentResult}
          setIsResultActive={setIsResultActive}
        />
      )}
      <ToastContainer />
    </div>
  );
}
