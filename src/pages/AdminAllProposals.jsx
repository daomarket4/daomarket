import React, { useEffect, useState } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import { Link } from "react-router-dom";

const AdminAllProposalsComponent = () => {
  const [proposals, setProposals] = useState([]);
  const web3 = new Web3(window.ethereum || "http://localhost:8545");

  useEffect(() => {
    const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);
    const fetchProposals = async () => {
      const proposalsCount = await contract.methods.getProposalsCount().call();
      const proposalsData = [];
      for (let i = 0; i < proposalsCount; i++) {
        const proposal = await contract.methods.getProposal(i).call();
        proposalsData.push(proposal);
      }
      setProposals(proposalsData);
    };
    fetchProposals();
  }, []);

  return (
    <div className="container">
      <h1>전체 안건 보기</h1>
      <div className="grid grid-cols-3 gap-4">
        {proposals.map((proposal, index) => (
          <Link
            to={`/admin/proposal-detail/${index}`}
            key={index}
            className="border rounded-lg p-4 hover:shadow-lg"
          >
            <img
              src={proposal.imageLink}
              alt="Proposal"
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{proposal.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminAllProposalsComponent;
