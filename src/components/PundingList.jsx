import proposal_ABI from "../abis/proposal_ABI";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ProposalDataFetcher from "./ProposalDataFetcher";
import { Link, useParams } from "react-router-dom";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";

const PundingList = () => {
  const [proposals, setProposals] = useState([]);

  const handleDataFetched = (fetchedProposals) => {
    setProposals(fetchedProposals);
  };

  const { proposalId } = useParams();
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

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
      } catch (error) {
        console.error("안건 정보를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProposal();
  }, [contract, proposalId]);

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
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {proposal.title}
                </h2>
                <p className="mt-1 mb-8">펀딩 진행 상황</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PundingList;
