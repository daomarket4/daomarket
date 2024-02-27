import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import Layout from "./Layout";

const AdminNFTDetail = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [proposalDetail, setProposalDetail] = useState(null);
  const [contributors, setContributors] = useState([]);
  const [refundSuccess, setRefundSuccess] = useState(false);
  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const contract = new web3.eth.Contract(proposal_ABI, PROPOSAL_CONTRACT);
  const [nftIssued, setNftIssued] = useState(false);

  useEffect(() => {
    const getAccount = async () => {
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        return accounts[0].toLowerCase();
      } catch (error) {
        console.error("Access denied or not an admin");
        navigate("/"); // Access denied or not an admin page redirection
      }
    };

    getAccount().then((account) => {
      const admins = [
        "0xe3cd9fC292B724095874522026Fb68932329296C".toLowerCase(),
        "0xeFfC9eAf0CB26B4CA0614Ea99aCa0908Ca468FB3".toLowerCase(),
        "0x32C1B6C8261F665Ac41a2b176C488d16ccD4109C".toLowerCase(),
        "0x11D539b3339A89633e4067E6036Ea2729E225467".toLowerCase(),
        "0x3f3Bf2769726264CFeAA1E87865af438F10190D7".toLowerCase(),
      ];
      if (!admins.includes(account)) {
        navigate("/AdminWarning");
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
          const contribution = await contract.methods
            .getContributionDetails(proposalId, address)
            .call();
          return {
            address,
            amount: web3.utils.fromWei(contribution[0], "ether"),
            timestamp: new Date(
              Number(contribution[1]) * 1000
            ).toLocaleString(),
          };
        })
      );

      setContributors(contributions);
    };

    if (proposalId && contract) {
      fetchProposalDetail();
    }
  }, [proposalId, contract, web3]);

  if (!proposalDetail) {
    return <div>Loading...</div>;
  }

  const issueNFT = async () => {
    // NFT 발행 로직 구현
    console.log("NFT 발행 중...");
    // 발행 성공 후 상태 업데이트
    setNftIssued(true);
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container mx-auto p-4 -mt-48">
            <h2 className="text-2xl font-bold mb-4">{proposalDetail.title}</h2>
            <div className="flex">
              <img
                src={proposalDetail.imageLink} // 펀딩 이미지
                alt="NFT"
                className="mb-4 w-[500px] h-[500px]"
              />
              <div className="ml-8">
                <p>
                  <strong>펀딩 번호:</strong> {proposalId}
                </p>

                <p>
                  <strong>현재까지 모금된 금액:</strong>
                  {web3.utils.fromWei(proposalDetail.amountRaised, "ether")} ETH
                </p>
                <h3>펀딩 참여자:</h3>
                <ul>
                  {contributors.map(
                    (
                      contributor,
                      index // 펀딩 참여자 목록
                    ) => (
                      <li key={index}>
                        {contributor.address} - {contributor.amount} ETH - 참여
                        시간: {contributor.timestamp}
                      </li>
                    )
                  )}
                </ul>
                {nftIssued ? (
                  <p>NFT가 발행되었습니다.</p>
                ) : (
                  <button
                    onClick={issueNFT}
                    className="py-2 px-4 bg-yellow-300 hover:bg-yellow-500 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                  >
                    NFT 발행하기
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
export default AdminNFTDetail;
