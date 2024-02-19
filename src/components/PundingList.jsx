import React, { useEffect, useState } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import ProposalDataFetcher from "./ProposalDataFetcher";
import ProgressbarList from "./ProgressbarList";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";

const PundingList = () => {
  const [proposals, setProposals] = useState([]);

  const handleDataFetched = (fetchedProposals) => {
    setProposals(fetchedProposals);
  };

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

  return (
    <>
      <ProposalDataFetcher onDataFetched={handleDataFetched} />
      <div className="container px-5 py-14 mx-auto grid grid-cols-3 gap-16">
        {proposals.map((proposal, index) => {
          const { title, imageLink, amountRaised, fundingGoal, endTime } =
            proposal;
          const web3 = new Web3(window.ethereum);
          const amountRaisedInEther = web3.utils.fromWei(amountRaised, "ether");
          const fundingGoalInEther = web3.utils.fromWei(fundingGoal, "ether");
          const percentage =
            (Number(amountRaisedInEther) / Number(fundingGoalInEther)) * 100;

          return (
            <div
              key={index}
              className="max-w-sm rounded-xl overflow-hidden shadow-lg mb-16"
            >
              <Link to={`/proposal/${index}`}>
                <img src={imageLink} alt="proposal" className="w-full" />
              </Link>
              <div className="px-6 py-4">
                <div className="font-semibold text-3xl text-center mb-2">
                  {title}
                </div>
                <ProgressbarList
                  percentage={isNaN(percentage) ? 0 : percentage.toFixed(2)}
                />
                <div className="font-semibold text-1xl text-center mb-2">
                  <CountdownTimer
                    endTime={proposal.endTime}
                    percentage={percentage}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PundingList;
