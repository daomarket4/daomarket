import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ProposalDataFetcher from "./ProposalDataFetcher";
import ProgressbarList from "./ProgressbarList";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";

const PundingList = () => {
  const [proposals, setProposals] = useState([]);

  const handleDataFetched = (fetchedProposals) => {
    setProposals(fetchedProposals);
  };

  return (
    <>
      <ProposalDataFetcher onDataFetched={handleDataFetched} />
      <div className="container px-5 py-14 mx-auto grid grid-cols-3 gap-16">
        {proposals.map((proposal) => {
          const { id, title, imageLink, amountRaised, fundingGoal, endTime } =
            proposal;
          const web3 = new Web3(window.ethereum);
          const amountRaisedInEther = web3.utils.fromWei(amountRaised, "ether");
          const fundingGoalInEther = web3.utils.fromWei(fundingGoal, "ether");
          const percentage =
            (Number(amountRaisedInEther) / Number(fundingGoalInEther)) * 100;

          return (
            <div
              key={id}
              className="max-w-sm rounded-xl overflow-hidden shadow-lg mb-16"
            >
              <Link to={`/proposal/${id}`}>
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
