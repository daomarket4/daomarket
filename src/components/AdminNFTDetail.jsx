import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI.json";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";
import Layout from "./Layout";
import { MINTNFT_CONTRACT } from "../abis/nftcontract";
import mintNFT_ABI from "../abis/mintNFT_ABI.json";

const AdminNFTDetail = () => {
  const { proposalId } = useParams();
  const navigate = useNavigate();
  const [proposalDetail, setProposalDetail] = useState(null);
  const [contributors, setContributors] = useState([]);
  const web3 = new Web3(window.ethereum || "http://localhost:8545");
  const proposalContract = new web3.eth.Contract(
    proposal_ABI,
    PROPOSAL_CONTRACT
  );
  const nftContract = new web3.eth.Contract(mintNFT_ABI, MINTNFT_CONTRACT);
  const [nftIssued, setNftIssued] = useState(false);
  const [nftImageUrl, setNftImageUrl] = useState("");
  const [nftCountsByContributor, setNftCountsByContributor] = useState({});
  const [nftIssueTimestamps, setNftIssueTimestamps] = useState({});

  useEffect(() => {
    const getAccount = async () => {
      try {
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        return accounts[0].toLowerCase();
      } catch (error) {
        console.error("Access denied or not an admin");
        navigate("/");
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
      const detail = await proposalContract.methods
        .getProposal(proposalId)
        .call();
      setProposalDetail(detail);

      const contributorAddresses = await proposalContract.methods
        .getContributors(proposalId)
        .call();

      const contributions = await Promise.all(
        contributorAddresses.map(async (address) => {
          const contribution = await proposalContract.methods
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

    if (proposalId && proposalContract) {
      fetchProposalDetail();
    }
  }, [proposalId, proposalContract, web3]);

  useEffect(() => {
    const fetchNftData = async () => {
      try {
        // 펀딩에 발행된 NFT가 있는지 확인
        const issued = await nftContract.methods.isNftIssued(proposalId).call();
        setNftIssued(issued);

        if (issued) {
          // 발행된 NFT의 이미지 URI 가져오기
          const tokenId = await nftContract.methods
            .getTokenId(proposalId)
            .call();
          const imageUrl = await nftContract.methods.tokenURI(tokenId).call();
          setNftImageUrl(imageUrl);

          // 펀딩 참여자별 NFT 발행 개수 및 발행 시간 정보 가져오기
          const contributorAddresses = await proposalContract.methods
            .getContributors(proposalId)
            .call();
          const nftCounts = {};
          const timestamps = {};
          for (const address of contributorAddresses) {
            const count = await nftContract.methods
              .getNftCountForContributor(proposalId, address)
              .call();
            const timestamp = await nftContract.methods
              .getNftIssueTimestamp(proposalId, address)
              .call();
            nftCounts[address] = count;
            timestamps[address] = timestamp;
          }
          setNftCountsByContributor(nftCounts);
          setNftIssueTimestamps(timestamps);
        }
      } catch (error) {
        console.error("Error fetching NFT data:", error);
      }
    };

    const fetchProposalDetail = async () => {
      const detail = await proposalContract.methods
        .getProposal(proposalId)
        .call();
      setProposalDetail(detail);

      const contributorAddresses = await proposalContract.methods
        .getContributors(proposalId)
        .call();

      const contributions = await Promise.all(
        contributorAddresses.map(async (address) => {
          const contribution = await proposalContract.methods
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

    if (proposalId && proposalContract && nftContract) {
      fetchProposalDetail();
      fetchNftData();
    }
  }, [proposalId, proposalContract, nftContract]);

  if (!proposalDetail) {
    return <div>Loading...</div>;
  }

  const issueNFT = async () => {
    try {
      // 스마트 컨트랙트와 상호 작용을 위해 관리자 계정 얻기
      const accounts = await web3.eth.getAccounts();
      const adminAccount = accounts[0];

      // 스마트 컨트랙트의 mintNFT 함수 호출하여 NFT 발행
      await nftContract.methods
        .mintNFT(proposalId)
        .send({ from: adminAccount });

      // 발행된 NFT의 tokenId 가져오기
      const tokenId = await nftContract.methods.getTokenId(proposalId).call();

      // 발행된 NFT의 URI 정보 설정
      await nftContract.methods
        .setTokenURI(
          tokenId,
          "https://violet-immediate-lizard-852.mypinata.cloud/ipfs/QmaHTj3CRU5DLcFUTC2KuXBDTtsE8LD92d6WhxMXdZ9L7p"
        )
        .send({ from: adminAccount });

      // 발행 성공 후 상태 업데이트
      setNftIssued(true);
      console.log("NFT 발행 및 URI 설정 완료");
    } catch (error) {
      console.error("NFT 발행 오류:", error);
    }
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
                  <div>
                    <img src={nftImageUrl} alt="NFT" className="mb-4" />
                    <h3>펀딩 참여자별 NFT 발행 정보:</h3>
                    <ul>
                      {Object.entries(nftCountsByContributor).map(
                        ([address, count]) => (
                          <li key={address}>
                            {address} - 발행 개수: {count} - 발행 시간:{" "}
                            {new Date(
                              nftIssueTimestamps[address] * 1000
                            ).toLocaleString()}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
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
