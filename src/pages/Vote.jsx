import Layout from "../components/Layout";
import React, { useState } from "react";

const Vote = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
              선택지 중 하나를 선택하신 후 투표하기 버튼을 눌러주세요.
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-3xl">
              투표는 한 번만 가능하며, 투표가 완료되면 변경이 불가능합니다.
            </p>
          </div>
          <div className="box flex flex-col">
            <button
              onClick={() => handleOptionClick("agree")}
              className={`option ${
                selectedOption === "agree"
                  ? "bg-yellow-400 border-2 border-yellow-500"
                  : "bg-white border border-black hover:bg-gray-300 text-black"
              } font-bold py-4 px-36 text-left rounded m-2 text-xl`}
            >
              찬성하기
            </button>
            <button
              onClick={() => handleOptionClick("disagree")}
              className={`option ${
                selectedOption === "disagree"
                  ? "bg-yellow-400 border-2 border-yellow-500"
                  : "bg-white border border-black hover:bg-gray-300 text-black"
              } font-bold py-4 px-36 text-left rounded m-2 text-xl`}
            >
              반대하기
            </button>
          </div>
          <button
            className="vote-button bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 text-left rounded m-2"
            onClick={handleVote}
          >
            투표하기
          </button>
          {/* 투표 완료 팝업 */}
          {showPopup && (
            <div className="fixed z-10 inset-0 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                  className="fixed inset-0 transition-opacity"
                  aria-hidden="true"
                >
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          투표 완료
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            투표가 완료되었습니다. 참여해 주셔서 감사합니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handlePopupClose}
                    >
                      확인
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 투표 완료 팝업 */}
        </section>
      </Layout>
    </div>
  );
};

export default Vote;
