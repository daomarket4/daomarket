import React, { useEffect, useState } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

//관리자 권한
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

const AdminAllProposalsComponent = () => {
  const navigate = useNavigate();

  // 보안 기능입니다. 관리자 계정이 아니여도 주소창에 /admin을 입력하면 들어갈 수 있기 때문에 아래 주소가 아니면 바로 홈으로 보냅니다. 아래까지 입력해야 관리자 페이지에 접속이 가능합니다.
  // 프로젝트 제출 전 .env 처리 예정
  useEffect(() => {
    getAccount().then((account) => {
      if (
        account !== "0xe3cd9fC292B724095874522026Fb68932329296C" &&
        account !== "0xeFfC9eAf0CB26B4CA0614Ea99aCa0908Ca468FB3" &&
        account !== "0x32C1B6C8261F665Ac41a2b176C488d16ccD4109C" &&
        account !== "0x11D539b3339A89633e4067E6036Ea2729E225467" &&
        account !== ""
      ) {
        navigate("/AdminWarning");
      }
    });
  }, []);
  // 관리자 권한

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
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container p-8">
            <h1 className="mb-8 text-3xl font-bold">전체 안건 보기</h1>
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

export default AdminAllProposalsComponent;
