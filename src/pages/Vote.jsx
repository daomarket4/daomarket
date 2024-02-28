import Layout from "../components/Layout";
import React, { useState } from "react";
import Monkey from "../images/Monkey.png";

const Vote = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // 찬성 또는 반대를 눌렀을 때만 투표하기 버튼을 활성화
  const handleVote = () => {
    if (selectedOption === null) {
      alert("찬성 또는 반대를 선택 후에 제출해 주세요.");
      return;
    }
    setShowPopup(true);
  };

  // 투표 완료했을 때 뜨는 팝업
  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // 찬성 또는 반대를 눌렀을 때 선택된 옵션을 표시, 다시 누르면 선택 취소
  const handleOptionClick = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="flex flex-col text-center w-full">
            <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
              하단의 아이템에 대한 매각 투표가 진행 중입니다.
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
              선택지 중 하나를 선택하신 후 투표하기 버튼을 눌러주세요. <br />
              투표는 한 번만 가능하며, 투표가 완료되면 변경이 불가능합니다.
            </p>
          </div>
          <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <img src={Monkey} alt="Monkey" className="mb-8 w-64 rounded-xl" />
            <div class="text-center lg:w-2/3 w-full">
              <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                고뇌하는 원숭이
              </h1>
              <p class="mb-8 leading-relaxed">
                고뇌하는 원숭이 입니다. 예술적인 면에서 매우 뛰어나지만, 그의
                작품은 누구에게도 인정받지 못하고 있습니다.
                <br />이 작품은 잠재적으로 가치가 분명히 있는 아이템입니다. 함께
                공동구매를 통해 이 작품에 대한 가치를 올려주세요.
              </p>
              <div class="flex justify-center">
                <button class="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                  승인하기
                </button>
                <button class="ml-4 inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                  거절하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Vote;
