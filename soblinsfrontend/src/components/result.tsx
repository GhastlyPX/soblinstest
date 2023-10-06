import Image from "next/image";
import map from "../app/assets/map.gif";

export default function Result(props: any) {
  console.log(props.currentHut.name);

  let multiplier = 0;

  switch (props.currentHut.name) {
    case "Fort Soblin":
      multiplier = 4;
      break;
    case "Mineshaft":
      multiplier = 10;
      break;
    case "Temple":
      multiplier = 20;
      break;
    case "Barnyard":
      multiplier = 1.3;
      break;
    case "Blacksmith":
      multiplier = 2;
      break;
    default:
  }

  return (
    <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-center bg-no-repeat bg-cover flex items-center z-20 p-2 lg:p-8 justify-center">
      <div
        className="w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur"
        onClick={(e) => {
          // @ts-ignore
          if (
            (e.target as Element).className ===
            "w-[100vw] min-h-[100vh] fixed top-0 left-0 backdrop-blur"
          ) {
            props.setIsResultActive(false);
          }
        }}
      ></div>
      <div
        className="w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]"
        onClick={(e) => {
          // @ts-ignore
          if (
            (e.target as Element).className ===
            "w-[100vw] min-h-[100vh] fixed top-0 left-0 bg-[#19211150]"
          ) {
            props.setIsResultActive(false);
          }
        }}
      ></div>
      <div className="z-30 p-2 lg:p-4 w-max border-[5px] border-[#312E2F] m-auto rounded-2xl bg-secondary-100 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <p className="text-[#48262D] text-[20px] font-bold text-center">
            {props.currentResult}
          </p>
          <p className="text-[#925F6B] text-[14px] font-light text-center">
            ({multiplier} x Multiplier)
          </p>
        </div>
      </div>
      <div
        onClick={() => props.setIsResultActive(false)}
        className="bg-primary-100 hover:bg-primary-50 transition-all z-10 absolute top-4 lg:top-8 right-4 lg:right-8 p-3 border-[2px] flex justify-center items-center cursor-pointer"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[16px] lg:w-[28px] h-[16px] lg:h-[28px]"
        >
          <path
            d="M2.63184 25.6001L14.1159 14.1161M14.1159 14.1161L25.5999 2.63208M14.1159 14.1161L2.63184 2.63208M14.1159 14.1161L25.5999 25.6001"
            stroke="#F5F7FB"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
