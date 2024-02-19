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
  const [refundSuccess, setRefundSuccess] = useState(false); // 펀딩 환불 성공 상태 추가
  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);

  // 관리자 주소
  const YOUR_ADMIN_ADDRESS = "0x32C1B6C8261F665Ac41a2b176C488d16ccD4109C"; // 관리자 주소로 설정해야 합니다.

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

      // 펀딩 환불 성공 상태 확인
      const isFundingGoalReached = await contract.methods
        .isFundingGoalReached(proposalId)
        .call();
      if (isFundingGoalReached) {
        setRefundSuccess(true);
      }
    };
    fetchProposalDetail();
  }, [proposalId]);

  const finalizeAndRefund = async () => {
    try {
      // 관리자 여부 확인
      const proposalDetail = await contract.methods
        .getProposal(proposalId)
        .call();
      const isAdmin =
        proposalDetail.proposer.toLowerCase() ===
        YOUR_ADMIN_ADDRESS.toLowerCase();
      if (!isAdmin) {
        console.log("관리자만 펀딩을 종료할 수 있습니다.");
        return;
      }

      // finalizeAndRefund 함수 호출
      await contract.methods
        .finalizeAndRefund(proposalId)
        .send({ from: YOUR_ADMIN_ADDRESS });
      console.log("펀딩 종료 및 환불이 성공적으로 이루어졌습니다.");
      setRefundSuccess(true); // 펀딩 환불 성공 상태 업데이트
    } catch (error) {
      console.error("펀딩 종료 및 환불 과정에서 오류가 발생했습니다:", error);
    }
  };

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
                  <strong>펀딩 희망 NFT URL:</strong>{" "}
                  <a
                    href={proposalDetail.nftLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {proposalDetail.nftLink}
                  </a>
                </p>
                <p>
                  <strong>제안자 지갑 주소:</strong> {proposalDetail.proposer}
                </p>
                <p>
                  <strong>펀딩 목표 금액:</strong>{" "}
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
                {refundSuccess ? (
                  <p>펀딩 환불 완료</p>
                ) : (
                  <button
                    onClick={finalizeAndRefund}
                    disabled={refundSuccess} // refundSuccess가 true이면 버튼 비활성화
                    className={`py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline ${
                      refundSuccess ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    만료된 펀딩 환불
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AdminProposalDetail;
