import React, { useState, useEffect } from "react";
import Web3 from "web3";
import proposal_ABI from "../abis/proposal_ABI";
import { PROPOSAL_CONTRACT } from "../abis/contractsaddress";

const ProposalParticipation = ({ proposalId, onClosePopup }) => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [fundAmount, setFundAmount] = useState("");
  const [isFundingGoalReached, setIsFundingGoalReached] = useState(false);
  const [isFundingExpired, setIsFundingExpired] = useState(false);
  const [isFundingClosed, setIsFundingClosed] = useState(false); // 추가

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accs = await web3Instance.eth.getAccounts();
        setAccounts(accs);
        const contractInstance = new web3Instance.eth.Contract(
          proposal_ABI,
          PROPOSAL_CONTRACT
        );
        setContract(contractInstance);
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const checkFundingStatus = async () => {
      if (contract) {
        try {
          const result = await contract.methods
            .isFundingGoalReached(proposalId)
            .call();
          setIsFundingGoalReached(result);
        } catch (error) {
          console.error("펀딩 상태 확인 중 오류 발생:", error);
        }
      }
    };

    checkFundingStatus();

    const checkFundingExpiration = async () => {
      if (contract) {
        try {
          await contract.methods.finalizeAndRefund(proposalId).send(); // finalizeAndRefund 함수 호출
          setIsFundingExpired(true); // 펀딩 기간 만료 상태 업데이트
        } catch (error) {
          setIsFundingExpired(false); // 에러 발생 시 펀딩 기간 만료 상태 false로 유지
          console.error("펀딩 종료 확인 중 오류 발생:", error);
        }
      }
    };

    checkFundingExpiration(); // 컴포넌트가 마운트될 때 펀딩 기간 종료 확인

    const interval = setInterval(() => {
      checkFundingExpiration(); // 10초마다 펀딩 기간 종료 확인
    }, 10000);

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 해제
  }, [contract, proposalId]);

  useEffect(() => {
    const fetchFundingClosedStatus = async () => {
      if (contract) {
        try {
          const proposalDetail = await contract.methods
            .getProposal(proposalId)
            .call();
          setIsFundingClosed(proposalDetail.fundingClosed); // fundingClosed 상태 업데이트
        } catch (error) {
          console.error("펀딩 종료 상태 확인 중 오류 발생:", error);
        }
      }
    };

    fetchFundingClosedStatus(); // 컴포넌트가 마운트될 때 펀딩 종료 상태 확인
  }, [contract, proposalId]);

  // 펀딩 참여 함수
  const handleParticipate = async () => {
    if (!contract || !fundAmount) {
      alert("펀딩 금액을 입력해주세요.");
      return;
    }

    try {
      const amountInWei = Web3.utils.toWei(fundAmount, "ether");
      await contract.methods.fundProposal(proposalId).send({
        from: accounts[0],
        value: amountInWei,
      });
      alert("펀딩에 성공적으로 참여했습니다.");
      onClosePopup(); // 펀딩 성공 시 팝업 닫기
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("펀딩 참여 중 에러 발생", error);
      alert("펀딩 참여에 실패했습니다.");
    }
  };

  return (
    <div className="mt-4">
      {isFundingExpired ? (
        <p className="text-center text-red-500 text-2xl">
          펀딩 기간이 만료되었습니다.
          <br /> 다음에 참여해 주세요.
        </p>
      ) : isFundingGoalReached ? (
        <p className="text-center text-red-500 text-2xl">
          펀딩 목표가 달성되었습니다.
          <br /> 다음에 참여해 주세요.
        </p>
      ) : isFundingClosed ? ( // fundingClosed 상태에 따라 버튼 비활성화
        <p className="text-center text-red-500 text-2xl">
          펀딩이 종료되었습니다.
          <br /> 다음에 참여해 주세요.
        </p>
      ) : (
        <>
          <label
            className="block text-gray-700 text-md font-bold mb-2"
            htmlFor="funding-amount"
          >
            펀딩할 ETH 금액을 입력하세요.
          </label>
          <input
            type="text"
            id="funding-amount"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            placeholder="숫자만 입력해 주세요."
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <div className="flex justify-center mt-4">
            <button
              className={`py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline ${
                isFundingClosed ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleParticipate}
              disabled={isFundingClosed} // fundingClosed 상태에 따라 버튼 비활성화
            >
              펀딩 참여
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProposalParticipation;
