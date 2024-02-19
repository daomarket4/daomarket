import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import Layout from "../components/Layout";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress.js";
import { IoIosArrowBack } from "react-icons/io";
import ProposalParticipation from "../components/ProposalParticipation";
import ProgressbarDetail from "../components/ProgressbarDetail.jsx";
import CountdownTimer from "../components/CountdownTimer";

const ProposalDetail = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposal, setProposal] = useState({});

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      } else {
        console.error("MetaMask가 설치되어 있지 않습니다.");
      }
    };
    loadWeb3();
  }, []);

  useEffect(() => {
    if (web3) {
      const contractInstance = new web3.eth.Contract(
        proposal_ABI,
        PROPOSAL_CONTRACT
      );
      setContract(contractInstance);
    }
  }, [web3]);

  useEffect(() => {
    const fetchProposal = async () => {
      try {
        const parsedProposalId = parseInt(proposalId);
        const fetchedProposal = await contract.methods
          .getProposal(parsedProposalId)
          .call();
        setProposal(fetchedProposal);
      } catch (error) {
        console.error("안건 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProposal();
  }, [contract, proposalId]);

  // ether 단위로 변환 usestate로
  const amountRaisedInEther =
    proposal && web3
      ? web3.utils.fromWei(proposal.amountRaised || "0", "ether")
      : "0";
  const fundingGoalInEther =
    proposal && web3
      ? web3.utils.fromWei(proposal.fundingGoal || "0", "ether")
      : "0";

  // 진행율 계산
  const percentage =
    (Number(amountRaisedInEther) / Number(fundingGoalInEther)) * 100;

  // 펀딩 성공 팝업 닫기
  const handleClosePopup = () => {
    // 팝업 닫을 때 페이지 새로고침
    window.location.reload();
  };

  if (!proposal.title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <button
              className="absolute top-48 left-24 hover:text-gray-500"
              onClick={() => navigate(-1)}
            >
              <IoIosArrowBack className="text-4xl" />
            </button>
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                src={proposal.imageLink}
                alt="NFT 이미지"
                style={{ width: "530px", height: "530px" }}
              />
              <div className="lg:w-1/2 w-full pl-12  mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-4xl title-font font-medium mb-5">
                  {proposal.title}
                </h1>
                <p className="leading-relaxed mb-4 text-2xl h-52 break-words line-clamp-4">
                  {proposal.description}
                </p>
                <span className="title-font font-medium text-2xl text-gray-900 dark:text-white flex mb-4 mt-16">
                  목표 금액: &nbsp;
                  {web3.utils.fromWei(proposal.fundingGoal, "ether")}
                  ETH
                </span>
                <div className="text-xl">
                  <p className="mb-2">
                    펀딩 시작 시간 :&nbsp;
                    {new Date(
                      Number(proposal.startTime) * 1000
                    ).toLocaleString()}
                  </p>
                  <p>
                    펀딩 종료 시간 :&nbsp;
                    {new Date(Number(proposal.endTime) * 1000).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <CountdownTimer endTime={proposal.endTime} />
                  </p>
                </div>
                <div className="flex items-center mt-4">
                  <span className="w-40 mr-3 mt-6 text-lg">
                    진행율 : &nbsp;
                  </span>
                  <ProgressbarDetail percentage={percentage.toFixed(2)} />
                  {/* 진행율 바에 진행율 전달 */}
                </div>
              </div>
            </div>
            <div className="w-64 mx-auto mt-12">
              <ProposalParticipation
                proposalId={proposalId}
                onClosePopup={handleClosePopup}
              />
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default ProposalDetail;
