import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";

const AdminProposalDetail = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [proposalDetail, setProposalDetail] = useState(null);
  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      const detail = await contract.methods.getProposal(proposalId).call();
      setProposalDetail(detail);
    };
    fetchProposalDetail();
  }, [proposalId]);

  if (!proposalDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{proposalDetail.title}</h2>
      <img src={proposalDetail.imageLink} alt="NFT" className="mb-4" />
      <p>
        <strong>NFT URL:</strong>{" "}
        <a href={proposalDetail.nftLink} target="_blank" rel="noreferrer">
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
    </div>
  );
};

export default AdminProposalDetail;
