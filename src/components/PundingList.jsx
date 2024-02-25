// PundingList.jsx

import React, { useState, useEffect } from "react";
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
          const {
            id,
            title,
            imageLink,
            amountRaised,
            fundingGoal,
            endTime,
            fundingCancelled, // 추가된 부분: 펀딩 취소 상태
          } = proposal;
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
                  {/* 수정된 부분: CountdownTimer 컴포넌트에 펀딩 취소 상태 전달 */}
                  <CountdownTimer
                    endTime={endTime}
                    percentage={percentage}
                    fundingCancelled={fundingCancelled}
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
