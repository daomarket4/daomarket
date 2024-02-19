import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";

const AdminAllProposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    };

    const loadProposals = async () => {
      const web3 = window.web3;
      const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);
      const proposalsCount = await contract.methods.getProposalsCount().call();

      const loadedProposals = [];
      for (let i = 0; i < proposalsCount; i++) {
        const proposal = await contract.methods.getProposal(i).call();
        loadedProposals.push(proposal);
      }

      setProposals(loadedProposals);
    };

    loadWeb3();
    loadProposals();
  }, []);

  return (
    <div>
      <h2>전체 안건 보기</h2>
      <div>
        {proposals.map((proposal, index) => (
          <div key={index}>
            <h3>{proposal.title}</h3>
            <p>제안자 주소: {proposal.proposer}</p>
            <p>
              펀딩 목표: {Web3.utils.fromWei(proposal.fundingGoal, "ether")} ETH
            </p>
            <p>
              현재 모금액: {Web3.utils.fromWei(proposal.amountRaised, "ether")}{" "}
              ETH
            </p>
            <Link to={`/proposal/${index}`}>상세 보기</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllProposals;
