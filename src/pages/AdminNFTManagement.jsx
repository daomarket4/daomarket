import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import { Link } from "react-router-dom";

// 관리자 권한 확인 함수
async function getAccount() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      console.error("YOU ARE NOT ADMIN!");
    }
  } else if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } else {
    console.log("USE CHROME! USE METAMASK!");
  }
}

const AdminNFTManagement = () => {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    // 관리자 권한 확인
    getAccount().then((account) => {
      if (
        account !== "0xe3cd9fC292B724095874522026Fb68932329296C" &&
        account !== "0xeFfC9eAf0CB26B4CA0614Ea99aCa0908Ca468FB3" &&
        account !== "0x32C1B6C8261F665Ac41a2b176C488d16ccD4109C" &&
        account !== "0x11D539b3339A89633e4067E6036Ea2729E225467" &&
        account !== "0x3f3Bf2769726264CFeAA1E87865af438F10190D7"
      ) {
        navigate("/AdminWarning");
      } else {
        loadFundedProposals();
      }
    });
  }, [navigate]);

  // 펀딩 목표를 달성한 제안들 불러오기
  const loadFundedProposals = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);
    const proposalsCount = await contract.methods.getProposalsCount().call();

    const loadedProposals = [];
    for (let i = 0; i < proposalsCount; i++) {
      const proposal = await contract.methods.getProposal(i).call();
      if (parseInt(proposal.amountRaised) >= parseInt(proposal.fundingGoal)) {
        loadedProposals.push({
          ...proposal,
          proposalId: i,
        });
      }
    }
    setProposals(loadedProposals);
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container p-8">
            <h1 className="mb-8 text-3xl font-bold">NFT 발행 및 관리 목록</h1>
            <div className="grid grid-cols-3 gap-4">
              {proposals.map((proposal, index) => (
                <Link
                  to={`/admin/nft-detail/${proposal.proposalId}`}
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-lg"
                >
                  <img
                    src={proposal.imageLink}
                    alt="Proposal"
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <h2 className="text-xl font-semibold mt-2">
                    {proposal.title}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AdminNFTManagement;
