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
  const [refundSuccess, setRefundSuccess] = useState(false);
  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);

  useEffect(() => {
    const getAccount = async () => {
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        return accounts[0].toLowerCase(); // 계정 주소를 소문자로 변환
      } catch (error) {
        console.error("Access denied or not an admin");
      }
    };

    getAccount().then((account) => {
      const admins = [
        "0xe3cd9fC292B724095874522026Fb68932329296C".toLowerCase(),
        "0xeFfC9eAf0CB26B4CA0614Ea99aCa0908Ca468FB3".toLowerCase(),
        "0x32C1B6C8261F665Ac41a2b176C488d16ccD4109C".toLowerCase(),
        "0x11D539b3339A89633e4067E6036Ea2729E225467".toLowerCase(),
      ];
      if (!admins.includes(account)) {
        navigate("/AdminWarning"); // 관리자가 아니면 경고 페이지로 리다이렉션
      }
    });
  }, [navigate, web3.eth]);

  useEffect(() => {
    const fetchProposalDetail = async () => {
      const detail = await contract.methods.getProposal(proposalId).call();
      setProposalDetail(detail);

      const contributorAddresses = await contract.methods
        .getContributors(proposalId)
        .call();

      const contributions = await Promise.all(
        contributorAddresses.map(async (address) => {
          const { 0: amount, 1: timestamp } = await contract.methods
            .getContributionDetails(proposalId, address)
            .call();
          return {
            address,
            amount: web3.utils.fromWei(amount, "ether"),
            timestamp: new Date(Number(timestamp) * 1000).toLocaleString(),
          };
        })
      );

      setContributors(contributions);

      const currentFundingStatus = getFundingStatus(detail);

      const isFundingGoalReached = await contract.methods
        .isFundingGoalReached(proposalId)
        .call();
      setRefundSuccess(isFundingGoalReached);
    };

    fetchProposalDetail();
  }, [proposalId, contract, web3]);

  // getFundingStatus 함수 내에 null 체크 추가
  const getFundingStatus = (proposal) => {
    if (!proposal) return "정보를 불러오는 중...";

    const now = new Date().getTime();
    const startTime = parseInt(proposal.startTime) * 1000;
    const endTime = parseInt(proposal.endTime) * 1000;
    const isFundingActive = now >= startTime && now <= endTime;
    const isFundingGoalReached =
      web3.utils.fromWei(proposal.amountRaised, "ether") >=
      web3.utils.fromWei(proposal.fundingGoal, "ether");
    const isFundingCancelled = proposal.fundingClosed && !isFundingGoalReached;

    if (isFundingCancelled) return "펀딩 취소";
    if (isFundingGoalReached) return "펀딩 성공";
    if (isFundingActive) return "펀딩 진행 중";
    if (!isFundingActive && !isFundingGoalReached) return "펀딩 종료";

    return "상태 불명";
  };

  // 상태 확인 후 getFundingStatus 호출
  const fundingStatus = proposalDetail
    ? getFundingStatus(proposalDetail)
    : "정보를 불러오는 중...";

  const finalizeAndRefund = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const isAdmin =
        proposalDetail.proposer.toLowerCase() === accounts[0].toLowerCase();
      if (!isAdmin) {
        console.log("관리자만 펀딩을 종료할 수 있습니다.");
        return;
      }

      await contract.methods
        .finalizeAndRefund(proposalId)
        .send({ from: accounts[0] });
      console.log("펀딩 종료 및 환불이 성공적으로 이루어졌습니다.");
      setRefundSuccess(true);
    } catch (error) {
      console.error("펀딩 종료 및 환불 과정에서 오류가 발생했습니다:", error);
    }
  };

  const cancelFundingAndRefund = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods
        .cancelFundingAndRefund(proposalId)
        .send({ from: accounts[0] });
      console.log("펀딩이 성공적으로 취소되고 환불되었습니다.");
      // 상태 업데이트 또는 사용자에게 피드백 제공
    } catch (error) {
      console.error("펀딩 취소 및 환불 과정에서 오류가 발생했습니다:", error);
    }
  };

  if (!proposalDetail) {
    return <div>Loading...</div>;
  }

  return (
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
                <strong>펀딩 번호:</strong> {proposalId}
              </p>
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
                <strong>펀딩 목표 금액:</strong>{" "}
                {web3.utils.fromWei(proposalDetail.fundingGoal, "ether")} ETH
              </p>
              <p>
                <strong>현재까지 모금된 금액:</strong>{" "}
                {web3.utils.fromWei(proposalDetail.amountRaised, "ether")} ETH
              </p>

              <h3>펀딩 참여자:</h3>
              <ul>
                {contributors.map((contributor, index) => (
                  <li key={index}>
                    {contributor.address} - {contributor.amount} ETH - 참여
                    시간: {contributor.timestamp}
                  </li>
                ))}
              </ul>
              <p>
                <strong>펀딩 상태:</strong> {getFundingStatus(proposalDetail)}
              </p>
              {fundingStatus === "펀딩 진행 중" && (
                <button
                  onClick={cancelFundingAndRefund}
                  className="py-2 px-4 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                >
                  펀딩 취소
                </button>
              )}

              {fundingStatus === "펀딩 종료" && !refundSuccess && (
                <button
                  onClick={finalizeAndRefund}
                  className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                >
                  만료된 펀딩 환불
                </button>
              )}
              {fundingStatus === "펀딩 종료" && refundSuccess && (
                <button
                  disabled={true}
                  className="py-2 px-4 opacity-50 cursor-not-allowed bg-blue-500 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                >
                  펀딩 환불 완료
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AdminProposalDetail;
