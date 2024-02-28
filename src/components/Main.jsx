import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress.js";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProgressbarMain from "./ProgressbarMain.jsx";
import CountdownTimerMain from "./CountdownTimerMain.jsx";

const Main = () => {
  // 스마트 컨트랙트에서 데이터를 가져오는 부분
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const contractInstance = new web3Instance.eth.Contract(
            proposal_ABI,
            PROPOSAL_CONTRACT
          );
          const proposalsCount = await contractInstance.methods
            .getProposalsCount()
            .call();
          const fetchedProposals = [];

          for (let i = 0; i < proposalsCount; i++) {
            const proposal = await contractInstance.methods
              .getProposal(i)
              .call();
            fetchedProposals.push(proposal);
          }

          setProposals(fetchedProposals);
        } catch (error) {
          console.error("사용자 계정 권한 요청 실패:", error);
        }
      } else {
        console.error("MetaMask가 설치되어 있지 않습니다.");
      }
    };

    loadWeb3();
  }, []);
  // 스마트 컨트랙트에서 데이터를 가져오는 부분

  // 메인 페이지에서 4단계로 나눠서 보여주기 위한 애니메이션
  const [showTitle, setShowTitle] = useState(false);
  const [showP, setShowP] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showNFT, setShowNFT] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(true);
    }, 800);
    setTimeout(() => {
      setShowP(true);
    }, 1600);
    setTimeout(() => {
      setShowButton(true);
    }, 2400);
    setTimeout(() => {
      setShowNFT(true);
    }, 3000);
  }, []);

  const titleStyles = {
    opacity: showTitle ? 1 : 0,
    transform: `translateY(${showTitle ? 0 : "20px"})`,
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  };
  const pStyles = {
    opacity: showP ? 1 : 0,
    transform: `translateY(${showP ? 0 : "20px"})`,
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  };
  const buttonStyles = {
    opacity: showButton ? 1 : 0,
    transform: `translateY(${showButton ? 0 : "20px"})`,
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  };
  const nftStyles = {
    opacity: showNFT ? 1 : 0,
    transform: `translateY(${showNFT ? 0 : "20px"})`,
    transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
  };
  // 메인 페이지에서 4단계로 나눠서 보여주기 위한 애니메이션

  // slick 애니메이션
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  // slick 애니메이션

  return (
    <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font mt-32">
      <div className="container mx-auto flex mt-24 px-5 md:flex-row flex-col items-center">
        <div className="lg:flex-grow lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1
            style={titleStyles}
            className="title-font sm:text-5xl text-3xl mt-36 mb-4 font-thin text-gray-900"
          >
            <div className="text-7xl text-blue-500 flex">
              <b>DAOM</b>
              <div className="text-black dark:text-white">&nbsp;arket</div>
            </div>
            <div style={{ ...pStyles, whiteSpace: "nowrap" }}>
              <br className="hidden lg:inline-block" />
              <b>NFT</b>와 <b>DAO</b>의 조화로운 만남
              <br className="hidden lg:inline-block" />
              디지털 자산의 <b>새로운 패러다임</b> 입니다.
            </div>
          </h1>
          <div className="text-xl text-gray-500">
            <p className="mb-8 leading-relaxed" style={buttonStyles}>
              누구든 쉽게 구매하고 싶은 물건에 대한 제안서를 제출하여
              <br className="hidden lg:inline-block" />
              물건을 구매하는 혁신적인 시장입니다.
            </p>
          </div>
          <div className="flex justify-center">
            <Link to="/IntroduceDaoMarket">
              <button
                className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
                style={buttonStyles}
              >
                시작하기
              </button>
            </Link>
          </div>
          {/* 애니메이션 */}
          <div
            className="slider-container lg:flex-grow my-56 ml-20 mt-56"
            style={nftStyles}
          >
            <Slider {...settings} className="w-[1300px]">
              {proposals.map((proposal, index) => {
                const web3 = new Web3(window.ethereum);
                const amountRaisedInEther = web3.utils.fromWei(
                  proposal.amountRaised,
                  "ether"
                );
                const fundingGoalInEther = web3.utils.fromWei(
                  proposal.fundingGoal,
                  "ether"
                );
                const percentage =
                  (Number(amountRaisedInEther) / Number(fundingGoalInEther)) *
                  100;

                return (
                  <div key={index} className="relative">
                    <Link to={`/proposal/${index}`}>
                      <img
                        src={proposal.imageLink}
                        alt="proposal"
                        className="w-96 object-cover rounded-2xl h-96 mx-auto"
                      />
                    </Link>
                    <div
                      key={index}
                      className="absolute bottom-1 left-8 w-[370px] h-[85px] bg-white opacity-45 font-bold rounded-2xl text-black p-2"
                    >
                      <ProgressbarMain
                        className="px-4"
                        percentage={
                          isNaN(percentage) ? 0 : percentage.toFixed(2)
                        }
                      />
                      <div className="font-semibold text-1xl text-center mb-2">
                        <CountdownTimerMain
                          endTime={proposal.endTime}
                          percentage={
                            isNaN(percentage) ? 0 : percentage.toFixed(2)
                          }
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          {/* 애니메이션 */}
        </div>
      </div>
    </section>
  );
};

export default Main;
