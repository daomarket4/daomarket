import { TbMessageCircle2Filled } from "react-icons/tb";
import { FaHome, FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaVoteYea } from "react-icons/fa";

const DropDown = () => {
  return (
    <ul className="flex">
      {/* 다옴 */}
      <li className="mainmenu">
        <Link
          to="/"
          className="mr-12 pl-6 hover:text-gray-900 flex items-center"
        >
          <FaHome className="mr-1" />
          &nbsp;다옴
        </Link>
        <ul className="text-center w-[120px] bg-white submenu speech-bubble p-4">
          <li>
            <Link to="/IntroduceDaoMarket">이용가이드</Link>
          </li>
          <li className="py-2">
            <Link to="/AboutUs">팀원소개</Link>
          </li>
        </ul>
      </li>
      {/* 다옴 */}
      {/* 참여 */}
      <li className="mainmenu">
        <Link
          to="/PundingPlaceList"
          className="mr-12 pl-6 hover:text-gray-900 flex items-center"
        >
          <FaStore className="mr-1" />
          &nbsp;마켓
        </Link>
        <ul className="text-center w-[130px] bg-white submenu speech-bubble p-4">
          <li>
            <Link to="/PundingPlaceList">펀딩플레이스</Link>
          </li>
          <li className="py-2">
            <Link to="/SaleNFT">NFT 판매</Link>
          </li>
          <li>
            <Link to="/PriceQuotes">시세조회</Link>
          </li>
        </ul>
      </li>
      {/* 참여 */}
      <li className="mainmenu">
        <Link
          to="/Agenda"
          className="mr-8 hover:text-gray-900 flex items-center pl-4"
        >
          <FaVoteYea className="mr-1" />
          &nbsp;안건
        </Link>
        <ul className="text-center w-[118px] bg-white submenu speech-bubble p-4">
          <li>
            <Link to="/Agenda">안건제출</Link>
          </li>
          <li className="py-2">
            <Link to="/SuccessAgenda">완료된 안건</Link>
          </li>
        </ul>
      </li>
      <li className=" mainmenu">
        <Link
          to="/Contact"
          className="mr-5 hover:text-gray-900 flex items-center pl-4"
        >
          <TbMessageCircle2Filled className="mr-1" />
          &nbsp;고객센터
        </Link>
        <ul className="text-center w-[140px] bg-white submenu speech-bubble p-4">
          <li>
            <Link to="/FAQ">자주 묻는 질문</Link>
          </li>
          <li className="py-2">
            <Link to="/Contact">1:1 문의</Link>
          </li>
          {/* 최종 프로젝트에서 문의내역 페이지 삭제 */}
          {/* <li>
            <Link to="/MyContact">문의 내역</Link>
          </li> */}
        </ul>
      </li>
    </ul>
  );
};

export default DropDown;
