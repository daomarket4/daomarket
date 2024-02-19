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

  return (
    <>
      <ProposalDataFetcher onDataFetched={handleDataFetched} />
      <div className="container px-5 py-14 mx-auto grid grid-cols-3 gap-4">
        {proposals.map((proposal, index) => {
          // 각 제안에 대한 진행율 계산
          const amountRaisedInEther =
            proposal && web3
              ? web3.utils.fromWei(proposal.amountRaised, "ether")
              : "0";
          const fundingGoalInEther =
            proposal && web3
              ? web3.utils.fromWei(proposal.fundingGoal, "ether")
              : "0";
          const percentage =
            (Number(amountRaisedInEther) / Number(fundingGoalInEther)) * 100;

          return (
            <div
              key={index}
              className="max-w-sm rounded-xl overflow-hidden shadow-lg mb-16"
            >
              <Link to={`/proposal/${index}`}>
                <img
                  src={proposal.imageLink}
                  alt="proposal"
                  className="w-full"
                />
              </Link>
              <div className="px-6 py-4">
                <div className="font-semibold text-3xl text-center mb-2">
                  {proposal.title}
                </div>
                <ProgressbarList
                  percentage={isNaN(percentage) ? 0 : percentage.toFixed(2)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PundingList;
