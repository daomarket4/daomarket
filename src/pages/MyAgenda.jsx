import React, { useState } from "react";
import ProposalDataFetcher from "../components/ProposalDataFetcher";
import { Link } from "react-router-dom";
import Web3 from "web3";
import CountdownTimer from "../components/CountdownTimer";

const MyAgenda = () => {
  const [proposals, setProposals] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const web3 = new Web3(window.ethereum);

  const handleOngoingDataFetched = (
    fetchedOngoingProposals,
    fetchedAccounts
  ) => {
    const filteredProposals = fetchedOngoingProposals.filter((proposal) => {
      return (
        proposal.proposer.toLowerCase() === fetchedAccounts[0]?.toLowerCase()
      );
    });
    setProposals(filteredProposals);
    setAccounts(fetchedAccounts);
  };

  return (
    <>
      <ProposalDataFetcher onOngoingDataFetched={handleOngoingDataFetched} />
      <div className="bg-darkMode">
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <h1 className="text-3xl mb-4">나의 안건 페이지</h1>
          <div className="container px-5 py-14 mx-auto grid grid-cols-3 gap-4 place-items-center">
            {proposals.map((proposal, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded w-[250px] h-fit"
              >
                <Link to={`/proposal/${index}`}>
                  <img
                    src={proposal.imageLink}
                    alt={proposal.title}
                    className="mb-4 h-fit object-cover w-full rounded"
                  />
                </Link>
                <h2 className="text-2xl font-medium mb-2">{proposal.title}</h2>
                <p className="text-xl text-gray-500 mb-2">
                  {proposal.description}
                </p>
                <div className="flex mb-4 items-center">
                  <span className="text-md font-medium text-gray-500">
                    목표:{" "}
                    {web3.utils.fromWei(
                      proposal.fundingGoal.toString(),
                      "ether"
                    )}{" "}
                    ETH
                  </span>
                </div>
                <div className="text-md">
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
                  <p className="mb-2">
                    <CountdownTimer endTime={proposal.endTime} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MyAgenda;
