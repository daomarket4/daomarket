import React, { useEffect, useState } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress.js";

const ProposalDataFetcher = ({
  onOngoingDataFetched,
  onCompletedDataFetched,
}) => {
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
          const fetchedOngoingProposals = [];
          const fetchedCompletedProposals = [];

          for (let i = 0; i < proposalsCount; i++) {
            const proposal = await contractInstance.methods
              .getProposal(i)
              .call();

            const isFundingGoalReached = await contractInstance.methods
              .isFundingGoalReached(i)
              .call();

            if (isFundingGoalReached) {
              fetchedCompletedProposals.push(proposal);
            } else {
              fetchedOngoingProposals.push(proposal);
            }
          }

          onOngoingDataFetched(fetchedOngoingProposals, accounts);
          onCompletedDataFetched(fetchedCompletedProposals, accounts);
        } catch (error) {
          console.error("사용자 계정 권한 요청 실패:", error);
        }
      } else {
        console.error("MetaMask가 설치되어 있지 않습니다.");
      }
    };

    loadWeb3();
  }, [onOngoingDataFetched, onCompletedDataFetched]);

  return null;
};

export default ProposalDataFetcher;
