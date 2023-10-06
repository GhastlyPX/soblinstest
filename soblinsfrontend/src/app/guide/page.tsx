import Image from "next/image";
import map from "../assets/map.gif";
import guide from "../assets/guide.png";
import Navigation from "@/components/navigation";
import Icon from "@/components/icon";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="w-[100vw] min-h-[100vh] bg-center bg-no-repeat bg-cover relative flex items-center p-4 lg:p-8"
      style={{ backgroundImage: "url(" + map.src + ")" }}
    >
      <Icon />
      <Navigation />
      <div className="my-[50px] z-10 w-full flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="max-w-[850px] flex flex-col gap-6 items-center lg:items-start text-center lg:text-start">
          <p className="text-secondaryText-100 text-[40px] md:text-[56px] lg:text-[72px] xl:text-[80px] 2xl:text-[104px] font-bold">
            HOW TO PLAY
          </p>
          <p className="text-secondaryText-50 text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-medium">
            The goal of Hut Havoc is to explore the map, choose a hut, and
            engage in a raid which acts as a coinflip battle with different
            chances of succeeding with each and every different hut.
          </p>
          <p className="text-secondaryText-50 text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-medium">
            Use your mouse to click and drag to navigate around the map, select
            a hut from the map, select how much Solana you want to bet, view
            your potential reward, and click raid. Upon a successful raid, an
            animation will play with the hut you raided being destroyed. Upon a
            failing raid, an animation will play, but the hut will remain
            unphased.
          </p>
          <Link href="/raid">
            <button className="bg-primary-100 hover:bg-primary-50 transition-all py-1 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[155px] flex justify-center items-center cursor-pointer text-[16px] lg:text-[20px]">
              PLAY NOW
            </button>
          </Link>
        </div>
        <div className="flex w-full lg:w-auto items-center justify-center">
          <Image
            src={guide}
            width={750}
            alt={"Guide Image"}
            className="w-full max-w-[400px] sm:w-[400px] xl:w-[600px] xl:max-w-[600px] 2xl:w-[750px] 2xl:max-w-[750px] 2xl:mr-[150px]"
          />
        </div>
      </div>
      <div className="w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur"></div>
      <div className="w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]"></div>
    </div>
  );
}
