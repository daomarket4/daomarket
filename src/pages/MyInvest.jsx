import React, { useEffect, useState } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress.js";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const MyInvest = () => {
  const [myInvestments, setMyInvestments] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [proposalContributors, setProposalContributors] = useState([]);

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const fetchedAccounts = await web3Instance.eth.getAccounts();
          setAccounts(fetchedAccounts);

          const contractInstance = new web3Instance.eth.Contract(
            proposal_ABI,
            PROPOSAL_CONTRACT
          );

          const proposalsCount = await contractInstance.methods
            .getProposalsCount()
            .call();
          const fetchedProposals = [];
          const fetchedProposalContributors = {};

          for (let i = 0; i < proposalsCount; i++) {
            const proposal = await contractInstance.methods
              .getProposal(i)
              .call();
            const contributors = await contractInstance.methods
              .getContributors(i)
              .call();
            fetchedProposals.push({
              id: i,
              title: proposal.title,
              imageLink: proposal.imageLink,
              amount: web3Instance.utils.fromWei(
                proposal.amountRaised,
                "ether"
              ),
              contributors: contributors,
            });

            fetchedProposalContributors[i] = contributors;
          }

          // 사용자가 투자한 안건만 필터링합니다.
          const myInvestments = fetchedProposals.filter((investment) => {
            return investment.contributors.includes(fetchedAccounts[0]);
          });
          setMyInvestments(myInvestments);
          setProposalContributors(fetchedProposalContributors);
        } catch (error) {
          console.error("사용자 계정 권한 요청 실패:", error);
        }
      } else {
        console.error("MetaMask가 설치되어 있지 않습니다.");
      }
    };

    loadWeb3();
  }, []);

  useEffect(() => {
    console.log("My Investments:", myInvestments);
  }, [myInvestments]);

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <h1 className="text-3xl font-semibold mb-4">내 투자 내역</h1>
          <div className="grid grid-cols-3 gap-16">
            {myInvestments.map((investment, index) => (
              <div
                key={index}
                className="max-w-xs rounded-xl overflow-hidden shadow-lg m-4"
              >
                <Link to={`/proposal/${investment.id}`}>
                  <img
                    className="w-full"
                    src={investment.imageLink}
                    alt="proposal"
                  />
                </Link>
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    {investment.title}
                  </div>
                  <p className="text-gray-700 text-base">
                    펀딩한 가격: {investment.amount} ETH
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default MyInvest;
