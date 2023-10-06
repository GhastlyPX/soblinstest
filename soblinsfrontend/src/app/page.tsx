import Link from "next/link";
import map from "./assets/map.gif";
import Navigation from "@/components/navigation";
import Recent from "@/components/recent";
import Icon from "@/components/icon";
import GetRecentPlays from "@/utils/getRecentPlays";

export const revalidate = 30;

export default async function Home() {
  const recentPlays = await GetRecentPlays();

  return (
    <div
      className="w-[100vw] min-h-[100vh] bg-center bg-no-repeat bg-cover relative flex items-center justify-center p-4 lg:p-8"
      style={{ backgroundImage: "url(" + map.src + ")" }}
    >
      <Icon />

      <Navigation />
      <Recent recent={recentPlays as any} />
      <div className="flex z-10 flex-col gap-3 lg:gap-6 items-center text-center lg:text-start lg:items-start mb-[80px] md:mb-[0px] justify-center">
        {/* <p className="text-secondaryText-100 text-[40px] md:text-[56px] lg:text-[72px] xl:text-[80px] 2xl:text-[104px] font-bold">
          SOBLINS
        </p>
        <p className="text-secondaryText-50 text-[16px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[28px] font-medium">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p> */}
        <Link href="/raid">
          <button className="bg-primary-100 hover:bg-primary-50 transition-all py-1 lg:py-2 px-3 lg:px-6 border-[2px] min-w-[150px] min-h-[50px] relative sm:w-[250px] sm:h-[70px] max-h-[70px] flex justify-center items-center cursor-pointer text-[16px] lg:text-[20px]">
            PLAY NOW
          </button>
        </Link>
      </div>
      <div className="w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur"></div>
      <div className="w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]"></div>
    </div>
  );
}
