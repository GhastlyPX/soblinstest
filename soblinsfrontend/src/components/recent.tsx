import Image from "next/image";
import barnyard from "../app/assets/barnyard.png";
import mainhut from "../app/assets/mainhut.png";
import temple from "../app/assets/temple.png";
import blacksmith from "../app/assets/blacksmith.png";
import cave from "../app/assets/cave.png";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Recent({ recent }: { recent: RecentPlays[] }) {
  return (
    <div className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 flex flex-col gap-2 items-end z-10 w-full">
      <p className="text-[18px] lg:text-[42px] font-bold">RECENT RAIDS</p>
      <div className="flex justify-end w-full h-full overflow-auto">
        <div className="flex w-full gap-8 sm:justify-end">
          {recent.map((play: RecentPlays, index) => (
            <div
              key={index}
              className="bg-primary-100 py-1 lg:py-2 px-3 lg:px-6 border-[2px] relative min-w-[200px] lg:min-w-[260px] flex justify-start items-center gap-3"
            >
              {play.hut === "Barnyard" ? (
                <Image width={84} height={84} src={barnyard} alt={"Hut"} />
              ) : play.hut === "Temple" ? (
                <Image width={84} height={84} src={temple} alt={"Hut"} />
              ) : play.hut === "Fort Soblin" ? (
                <Image width={84} height={84} src={mainhut} alt={"Hut"} />
              ) : play.hut === "Blacksmith" ? (
                <Image width={84} height={84} src={blacksmith} alt={"Hut"} />
              ) : (
                play.hut === "Mineshaft" && (
                  <Image width={84} height={84} src={cave} alt={"Hut"} />
                )
              )}
              <div className="flex flex-col gap-1">
                {play.outcome === true ? (
                  <>
                    <p className="text-[14px] lg:text-[18px] font-bold">
                      WON{" "}
                      {(Number(play?.winAmount) / LAMPORTS_PER_SOL).toFixed(2)}{" "}
                      Solana
                    </p>
                    <p className="text-[10px] lg:text-[14px] font-bold">
                      {play.hut} -{" "}
                      {play.hut === "Barnyard"
                        ? "1.3"
                        : play.hut === "Temple"
                        ? "20"
                        : play.hut === "Fort Soblin"
                        ? "4"
                        : play.hut === "Mineshaft"
                        ? "10"
                        : "2"}
                      x
                    </p>
                  </>
                ) : (
                  play.outcome === false && (
                    <>
                      <p className="text-[14px] lg:text-[18px] font-bold">
                        LOST{" "}
                        {(Number(play?.initialBet) / LAMPORTS_PER_SOL).toFixed(
                          2
                        )}{" "}
                        Solana
                      </p>
                      <p className="text-[10px] lg:text-[14px] font-bold">
                        {play.hut} -{" "}
                        {play.hut === "Barnyard"
                          ? "1.3"
                          : play.hut === "Temple"
                          ? "20"
                          : play.hut === "Fort Soblin"
                          ? "4"
                          : play.hut === "Mineshaft"
                          ? "10"
                          : "2"}
                        x
                      </p>
                    </>
                  )
                )}
              </div>
              <div className="bg-primary-50 h-[4px] w-full absolute bottom-0 left-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
