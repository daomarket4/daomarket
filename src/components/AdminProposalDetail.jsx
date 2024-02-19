import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import Layout from "./Layout";

const AdminProposalDetail = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [proposalDetail, setProposalDetail] = useState(null);
  const [contributors, setContributors] = useState([]);
  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      const detail = await contract.methods.getProposal(proposalId).call();
      setProposalDetail(detail);

      // 펀딩 참여자 정보 설정
      const contributorAddresses = await contract.methods
        .getProposalContributors(proposalId)
        .call();
      const contributions = await Promise.all(
        contributorAddresses.map(async (address) => {
          const amount = await contract.methods
            .getContributionAmount(proposalId, address)
            .call();
          return { address, amount: web3.utils.fromWei(amount, "ether") };
        })
      );

      setContributors(contributions);
    };
    fetchProposalDetail();
  }, [proposalId]);

  if (!proposalDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container mx-auto p-4 -mt-48">
            <h2 className="text-2xl font-bold mb-4">{proposalDetail.title}</h2>
            <div className="flex">
              <img
                src={proposalDetail.imageLink}
                alt="NFT"
                className="mb-4 w-[500px] h-[500px]"
              />
              <div className="ml-8">
                <p>
                  <strong>NFT URL:</strong>{" "}
                  <a
                    href={proposalDetail.nftLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {proposalDetail.nftLink}
                  </a>
                </p>
                <p>
                  <strong>Proposer Address:</strong> {proposalDetail.proposer}
                </p>
                <p>
                  <strong>Funding Goal:</strong>{" "}
                  {web3.utils.fromWei(proposalDetail.fundingGoal, "ether")} ETH
                </p>
                <p>
                  <strong>펀딩 시작 시간:</strong>{" "}
                  {new Date(
                    parseInt(proposalDetail.startTime) * 1000
                  ).toLocaleString()}
                </p>
                <p>
                  <strong>펀딩 종료 시간:</strong>{" "}
                  {new Date(
                    parseInt(proposalDetail.endTime) * 1000
                  ).toLocaleString()}
                </p>
                <p>
                  <strong>컨트랙트 주소:</strong> {PROPOSAL_CONTRACT}
                </p>
                <h3>펀딩 참여자:</h3>
                <ul>
                  {contributors.map((contributor, index) => (
                    <li key={index}>
                      {contributor.address} - {contributor.amount} ETH
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AdminProposalDetail;
