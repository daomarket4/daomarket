import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ProgressbarList from "./ProgressbarList";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";

import ProposalDataFetcher from "./ProposalDataFetcher";

const SuccessPunding = () => {
  const [proposals, setProposals] = useState([]);

  const handleAllDataFetched = (fetchedProposals) => {
    const filteredProposals = fetchedProposals.filter((proposal) => {
      const amountRaisedInEther = Web3.utils.fromWei(
        proposal.amountRaised,
        "ether"
      );
      const fundingGoalInEther = Web3.utils.fromWei(
        proposal.fundingGoal,
        "ether"
      );
      return Number(amountRaisedInEther) >= Number(fundingGoalInEther);
    });
    setProposals(filteredProposals);
  };

  return (
    <>
      <ProposalDataFetcher onDataFetched={handleAllDataFetched} />
      <div className="container px-5 py-14 mx-auto grid grid-cols-3 gap-16">
        {proposals.map((proposal) => {
          const { id, title, imageLink, amountRaised, fundingGoal, endTime } =
            proposal;
          const amountRaisedInEther = Web3.utils.fromWei(amountRaised, "ether");
          const fundingGoalInEther = Web3.utils.fromWei(fundingGoal, "ether");
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
                <div className="pt-4 text-gray-500">
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

export default SuccessPunding;
