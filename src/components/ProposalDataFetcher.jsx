// ProposalDataFetcher.jsx

import React, { useEffect } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress.js";

const ProposalDataFetcher = ({ onDataFetched }) => {
  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
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
            const proposalWithId = {
              ...proposal,
              id: i, // 고유한 id를 할당합니다.
            };
            fetchedProposals.push(proposalWithId);
          }

          onDataFetched(fetchedProposals, accounts);
        } catch (error) {
          console.error("사용자 계정 권한 요청 실패:", error);
        }
      } else {
        console.error("MetaMask가 설치되어 있지 않습니다.");
      }
    };

    loadWeb3();
  }, [onDataFetched]);

  return null;
};

export default ProposalDataFetcher;
