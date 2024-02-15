import suggestion from "../images/suggestion.png";
import safe from "../images/safe.png";
import trade from "../images/trade.png";
import multiSig from "../images/multiSig.png";

const WhyChooseDaoMarket = () => {
  return (
    <>
      <div className="container px-5 py-24 mx-auto">
        <div className="text-center mb-20">
          <h1 className="sm:text-5xl text-3xl font-medium title-font text-gray-900 mb-4">
            왜 DAOM을 선택해야 하나요?
          </h1>
          <p className="text-2xl leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
            당신이 차별화된 DAOM을 선택해야 하는 이유 4가지 요소입니다.
          </p>
          <div className="flex mt-6 justify-center">
            <div className="w-16 h-1 rounded-full bg-gray-500 inline-flex"></div>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {/* 누구나 참여 가능한 시스템 */}
          <div className="p-4 md:w-1/4 flex flex-col text-center items-center">
            <img
              src={suggestion}
              alt="suggestion"
              className="w-24 mr-2 mb-12"
            />
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                누구나 참여 가능한 시스템
              </h2>
              <p className="leading-relaxed text-lg">
                DAOM에서는 함께하시는 모든 분들이 Dao를 구성하도록 제안서를 직접
                작성하고, 투표를 통해 결정할 수 있습니다.
              </p>
            </div>
          </div>
          {/* 누구나 참여 가능한 시스템 */}
          {/* 지분의 NFT화 */}
          <div className="p-4 md:w-1/4 flex flex-col text-center items-center">
            <img src={safe} alt="safe" className="w-24 mr-2 mb-14" />
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                지분의 NFT화
              </h2>
              <p className="leading-relaxed text-lg">
                본인이 참여 신청한 Dao에 대한 지분을 NFT로 발행하여 소유권을
                안전하게 증명할 수 있습니다.
              </p>
            </div>
          </div>
          {/* 지분의 NFT화 */}
          {/* MultiSig */}
          <div className="p-4 md:w-1/4 flex flex-col text-center items-center">
            <img src={multiSig} alt="multiSig" className="w-28 mr-2 mb-10" />
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                MultiSig
              </h2>
              <p className="leading-relaxed text-lg">
                DAOM에서는 다중 서명(MultiSig) 기능을 통해 안전한 거래를
                보장합니다.
              </p>
            </div>
          </div>
          {/* MultiSig */}
          {/* Marketplace */}
          <div className="p-4 md:w-1/4 flex flex-col text-center items-center">
            <img src={trade} alt="trade" className="w-28 mr-2 mb-10" />
            <div className="flex-grow">
              <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                Dao NFT Marketplace
              </h2>
              <p className="leading-relaxed text-lg">
                참여하여 받은 Dao NFT를 DAOM에서 거래할 수 있습니다.
              </p>
            </div>
          </div>
          {/* Marketplace */}
        </div>
      </div>
    </>
  );
};

export default WhyChooseDaoMarket;
