// 페이지 최상단에 광고나 공고를 홍보하기 위한 팝업
// LocalStorage를 이용하여 한번 닫은 후에는 다시 보이지 않도록 함

import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const TopPopup = () => {
  const [isClose, setIsClose] = useState(false);

  const onClickClose = () => {
    setIsClose(true);

    localStorage.setItem("topBannerClose1", "true");
  };

  // useEffect(() => {
  //   if (localStorage.getItem("topBannerClose1") === "true") {
  //     setIsClose(true);
  //   }
  // }, []);

  return (
    <div
      className={`dark:bg-slate-800 flex items-center justify-center ${
        isClose && "hidden"
      }`}
    >
      <div className="h-[35px] border-b border-gray-400 mx-36 w-full">
        <div className="flex justify-center items-center w-full">
          <Link to="/PundingPlaceList">
            <div className="flex mt-[6px] w-full text-center font-semibold">
              🙌 팝업을 클릭하여 DAOM에서 현재 진행 중인 펀딩을 지금 바로
              확인하세요!
            </div>
          </Link>
          <button
            className="w-5 absolute right-0 mr-[200px]"
            onClick={onClickClose}
          >
            <IoCloseSharp className="mt-1 hover:scale-125 duration-300 text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default TopPopup;
