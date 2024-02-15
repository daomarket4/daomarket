import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import Layout from "../components/Layout";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress.js";
import { IoIosArrowBack } from "react-icons/io";
import ProposalParticipation from "../components/ProposalParticipation";

const ProposalDetail = () => {
  const { proposalId } = useParams();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposal, setProposal] = useState(null);

  const navigate = useNavigate();

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
        if (!contract || isNaN(proposalId)) return;

        const parsedProposalId = parseInt(proposalId);
        const proposal = await contract.methods
          .getProposal(parsedProposalId)
          .call();
        setProposal(proposal);
      } catch (error) {
        console.error("안건 정보를 불러오는 중 오류 발생:", error);
      }
      console.log(proposalId);
    };

    fetchProposal();
  }, [contract, proposalId]);

  if (!proposal) {
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
                className=""
                style={{ width: "530px", height: "530px" }}
              />
              <div className="lg:w-1/2 w-full pl-12  mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-6xl title-font font-medium mb-5">
                  {proposal.title}
                </h1>
                <p className="leading-relaxed mb-4 text-3xl h-52 break-words line-clamp-4">
                  설명 : {proposal.description}
                </p>
                <span className="title-font font-medium text-2xl text-gray-900 dark:text-white flex mb-4">
                  목표 금액: &nbsp; {proposal.fundingGoal.toString()} ETH
                </span>
                <div className="text-xl">
                  <p className="mb-2">
                    펀딩 시작 시간:{" "}
                    {new Date(
                      Number(proposal.startTime) * 1000
                    ).toLocaleString()}
                  </p>
                  <p>
                    펀딩 종료 시간:{" "}
                    {new Date(Number(proposal.endTime) * 1000).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center mt-4">
                  <span className="w-40 mr-3 mt-6 text-lg">진행율: &nbsp;</span>
                  <div className="bg-gray-300 w-full rounded-full">
                    <div
                      className="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full"
                      style={{ width: "50%" }}
                    >
                      0%
                    </div>
                  </div>
                  <div className="bg-gray-300 w-full rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="w-64 mx-auto mt-12">
              <ProposalParticipation proposalId={proposalId} />
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default ProposalDetail;
