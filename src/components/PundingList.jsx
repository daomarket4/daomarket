import proposal_ABI from "../abis/proposal_ABI";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ProposalDataFetcher from "./ProposalDataFetcher";
import { Link, useParams } from "react-router-dom";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import ProgressbarList from "./ProgressbarList";

const PundingList = () => {
  const [proposals, setProposals] = useState([]);

  const handleDataFetched = (fetchedProposals) => {
    setProposals(fetchedProposals);
  };

  const { proposalId } = useParams();
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

  return (
    <>
      <ProposalDataFetcher onDataFetched={handleDataFetched} />
      <div className="container px-5 py-14 mx-auto grid grid-cols-3">
        {proposals.map((proposal, index) => (
          <div className="flex flex-wrap justify-center -m-4" key={index}>
            <div className="lg:w-1/3 md:w-1/2 p-4 w-full">
              <div className="block relative h-fit rounded overflow-hidden text-center">
                <Link to={`/proposal/${index}`}>
                  <img
                    src={proposal.imageLink}
                    alt="proposal.imageLink"
                    className="mb-8 mr-2"
                  />
                </Link>
              </div>
              <div className="mt-4">
                <h2 className="text-gray-900 title-font text-3xl font-medium text-center -mt-8">
                  {proposal.title}
                </h2>
                <p className="mt-2 mb-8">
                  {/* 진행상황 */}
                  <ProgressbarList percentage={percentage.toFixed(2)} />맵 함수
                  써야하나요..?
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PundingList;
