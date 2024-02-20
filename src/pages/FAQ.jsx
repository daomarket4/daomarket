import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useState } from "react";

const FAQ = () => {
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const toggleAnswer = (index) => {
    setSelectedFAQ(index === selectedFAQ ? null : index);
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font overflow-hidden">
          <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900 mt-16">
            안녕하세요! 궁금한 점이 있으신가요?
          </h1>
          <p className="mx-auto leading-relaxed text-3xl mb-16">
            아래 자주 묻는 질문을 참고해 주세요.
          </p>
          <div className="container px-5 py-24 mx-auto">
            <div className="-my-8 divide-y-2 divide-gray-100">
              {/* DAOM */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  DAOM
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(0)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    DAOM이 무엇인가요?
                  </h2>
                  {selectedFAQ === 0 && (
                    <div className="mt-4 ml-1">
                      참여하시는 모든 분들이 공평하고 자유롭게 공동구매를
                      희망하는 아이템에 안건을 제출하고, 투자하고, 투표하여
                      원하는 물건에 공동구매를 하는 것에 목적이 있습니다.
                    </div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(1)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    DAOM만의 차별점은 무엇이 있나요?
                  </h2>
                  {selectedFAQ === 1 && (
                    <div className="mt-4 ml-1">
                      누구나 참여 가능한 시스템과 본인이 참여한 지분을 NFT로
                      증명하여 안전성 강화, MultiSig를 통한 안전한 거래 보장
                      등이 있습니다. 궁금한 점은
                      <a href="/IntroduceDaoMarket" className="text-blue-600">
                        이곳
                      </a>
                      을 클릭하여 확인해 주세요.
                    </div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(2)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뜨리
                  </h2>
                  {selectedFAQ === 2 && (
                    <div className="mt-4 ml-1">답변 뜨리</div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(3)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뽀
                  </h2>
                  {selectedFAQ === 3 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* DAOM */}
              {/* 안건제안 */}
              <div className="py-8 flex md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  안건제안
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(4)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    어떻게 안건을 제안하고 펀딩을 시작할 수 있나요?
                  </h2>
                  {selectedFAQ === 4 && (
                    <div className="mt-4 ml-1">
                      안건-안건제출을 통해 공동구매를 원하시는 NFT의 정보와 목표
                      금액, 기간을 양식에 맞게 입력하시면 함께 공동구매에 참여할
                      유저들을 모집하게 됩니다.
                    </div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(5)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    안건을 제안하거나 펀딩을 하려면 어떤 조건이 필요한가요?
                  </h2>
                  {selectedFAQ === 5 && (
                    <div className="mt-4 ml-1">
                      DAOM을 이용하시는 모든 유저 분들은 안건을 제안하거나
                      펀딩을 참여하실 수 있습니다.
                    </div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(6)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    안건 제안에 필요한 정보는 무엇인가요?
                  </h2>
                  {selectedFAQ === 6 && (
                    <div className="mt-4 ml-1">
                      안건 제안에는 안건의 제목, 구매를 희망하시는 NFT와 이미지
                      각각의 URL, 희망하는 모금 금액과 펀딩기간, 안건 내용을
                      필수적으로 작성해 주셔야 진행됩니다.
                    </div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(7)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    펀딩 금액은 어떻게 결정되나요?
                  </h2>
                  {selectedFAQ === 7 && (
                    <div className="mt-4 ml-1">
                      최초 공동구매 신청자가 안건을 제출할 때 희망하는 모금
                      금액을 지정하여 금액이 결정됩니다.
                    </div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* 안건제안 */}
              {/* 펀딩 */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  펀딩
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(8)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    펀딩 과정은 어떻게 되나요?
                  </h2>
                  {selectedFAQ === 8 && (
                    <div className="mt-4 ml-1">
                      마켓-펀딩플레이스를 통해 구매하고 싶은 아이템을 고른 후,
                      원하시는 펀딩 금액을 입력하여 펀딩하고 펀딩 종료 시간 내
                      목표 금액에 도달하게 될 시 공동 구매가 이루어 지게 됩니다.
                    </div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(9)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    펀딩이 성공하면 어떻게 처리되나요?
                  </h2>
                  {selectedFAQ === 9 && (
                    <div className="mt-4 ml-1">답변 뚜</div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(10)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    펀딩이 실패하면 어떻게 환불되나요?
                  </h2>
                  {selectedFAQ === 10 && (
                    <div className="mt-4 ml-1">
                      기간 내에 목표 모금액이 모이지 않았을 때, 펀딩이 종료되면
                      참여하신 메타마스크 주소로 자동으로 환불될 예정입니다.
                    </div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(11)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    다른 네트워크로 펀딩에 참여할 수 있나요?
                  </h2>
                  {selectedFAQ === 11 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* 펀딩 */}
              {/* 자산 */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  자산
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(12)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    모금된 자산은 어떻게 보관되나요?
                  </h2>
                  {selectedFAQ === 12 && (
                    <div className="mt-4 ml-1">답변 완</div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(13)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뚜
                  </h2>
                  {selectedFAQ === 13 && (
                    <div className="mt-4 ml-1">답변 뚜</div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(14)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뜨리
                  </h2>
                  {selectedFAQ === 14 && (
                    <div className="mt-4 ml-1">답변 뜨리</div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(15)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뽀
                  </h2>
                  {selectedFAQ === 15 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* 자산 */}
              {/* 목록4 */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  매각 및 투표
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(16)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    NFT 매각을 위한 투표 시스템은 어떻게 구현되나요?
                  </h2>
                  {selectedFAQ === 16 && (
                    <div className="mt-4 ml-1">답변 완</div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(17)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    매각된 수익은 어떻게 분배되나요?
                  </h2>
                  {selectedFAQ === 17 && (
                    <div className="mt-4 ml-1">답변 뚜</div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(18)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    지분을 거래할 때 수수료가 발생하나요?
                  </h2>
                  {selectedFAQ === 18 && (
                    <div className="mt-4 ml-1">답변 뜨리</div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(19)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    투표 기간은 어떻게 설정되나요?
                  </h2>
                  {selectedFAQ === 19 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                  {/* 4 */}
                  <h2
                    onClick={() => toggleAnswer(20)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    멀티시그니처가 무엇인가요?
                  </h2>
                  {selectedFAQ === 20 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 4 */}
                </div>
              </div>
              {/* 목록4 */}
              {/* 목록4 */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  지분 거래
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(16)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    지분 거래는 어떻게 이루어지나요?
                  </h2>
                  {selectedFAQ === 16 && (
                    <div className="mt-4 ml-1">답변 완</div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(17)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뚜
                  </h2>
                  {selectedFAQ === 17 && (
                    <div className="mt-4 ml-1">답변 뚜</div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(18)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뜨리
                  </h2>
                  {selectedFAQ === 18 && (
                    <div className="mt-4 ml-1">답변 뜨리</div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(19)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뽀
                  </h2>
                  {selectedFAQ === 19 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* 목록4 */}
              {/* 목록4 */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  로그인
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(20)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    메타마스크가 무엇인가요?
                  </h2>
                  {selectedFAQ === 20 && (
                    <div className="mt-4 ml-1">
                      메타마스크는 이더리움 개인 키를 관리할 수 있는 웹 브라우저
                      확장 프로그램과 모바일 앱입니다. 메타마스크는 이더리움 및
                      기타 토큰의 지갑 역할을 합니다. 자세한 정보는{" "}
                      <a
                        href="https://support.metamask.io/hc/ko/articles/360015489531-MetaMask-시작하기"
                        className="text-blue-600"
                      >
                        이곳
                      </a>
                      을 클릭하여 확인해 주세요.
                    </div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(21)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    메타마스크 회원가입은 어디서 하나요?
                  </h2>
                  {selectedFAQ === 21 && (
                    <div className="mt-4 ml-1">
                      <a
                        href="https://metamask.io/download/"
                        className="text-blue-600"
                      >
                        이곳
                      </a>
                      에서 메타마스크를 설치하신 후 회원가입을 진행해 주세요.
                      원활한 메타마스크 사용을 위해 크롬 브라우저를 권장
                      드립니다.
                    </div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(22)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    메타마스크와 연동을 어떻게 하나요?
                  </h2>
                  {selectedFAQ === 22 && (
                    <div className="mt-4 ml-1">
                      DAOM 웹페이지 우측 상단에서 Sign in을 통해 로그인 하시면
                      DAOM과 연동되어 모든 시스템을 이용하실 수 있습니다.
                    </div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(23)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뽀
                  </h2>
                  {selectedFAQ === 23 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* 목록4 */}
              {/* 목록4 */}
              <div className="py-8 flex flex-wrap md:flex-nowrap">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col text-2xl">
                  목록
                </div>
                <div className="md:flex-grow">
                  {/* 0 */}
                  <h2
                    onClick={() => toggleAnswer(24)}
                    className="text-xl font-medium text-gray-900 title-font mb-2 cursor-pointer"
                  >
                    모금된 자산은 어떻게 보관되나요?
                  </h2>
                  {selectedFAQ === 24 && (
                    <div className="mt-4 ml-1">답변 완</div>
                  )}
                  {/* 0 */}
                  {/* 1 */}
                  <h2
                    onClick={() => toggleAnswer(25)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뚜
                  </h2>
                  {selectedFAQ === 25 && (
                    <div className="mt-4 ml-1">답변 뚜</div>
                  )}
                  {/* 1 */}
                  {/* 2 */}
                  <h2
                    onClick={() => toggleAnswer(26)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뜨리
                  </h2>
                  {selectedFAQ === 26 && (
                    <div className="mt-4 ml-1">답변 뜨리</div>
                  )}
                  {/* 2 */}
                  {/* 3 */}
                  <h2
                    onClick={() => toggleAnswer(27)}
                    className="text-xl font-medium text-gray-900 title-font mt-4 cursor-pointer"
                  >
                    질문 뽀
                  </h2>
                  {selectedFAQ === 27 && (
                    <div className="mt-4 ml-1">답변 뽀</div>
                  )}
                  {/* 3 */}
                </div>
              </div>
              {/* 목록4 */}
              {/* 1:1 문의 유도 */}
              <div className="py-8 text-center text-3xl text-gray-900">
                아직 궁금증이 해결되지 않으셨나요?
                <div className="text-2xl text-gray-500 mt-2">
                  아래 버튼을 통해 1:1 문의를 남겨주세요!
                </div>
                <Link to="/Contact">
                  <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded mt-8 text-lg">
                    1:1 문의하기
                  </button>
                </Link>
              </div>
              {/* 1:1 문의 유도 */}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default FAQ;
