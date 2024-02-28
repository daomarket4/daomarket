import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import consultationCall from "../images/consultationCall.png";
import consultationChat from "../images/consultationChat.png";
import consultationOnline from "../images/consultationOnline.png";

const Contact = () => {
  const [msg, setMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // 텔레그램 관련 api인데 원래 .env 처리해야하지만 그냥 놔뒀습니다. 마지막에 프로젝트 제출 전 .env 처리 예정
  const sendMsg = async () => {
    try {
      await axios({
        method: "post",
        url: "https://api.telegram.org/bot6327170721:AAHe1OAIuyXTY-8dmNKRFnPrmrb2Tk0xKDg/sendMessage",
        data: {
          chat_id: "-1002138511749",
          text: msg,
        },
      });
      setShowPopup(true);
    } catch (error) {
      console.error("Send Again :", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        {/* 텔레그램 api */}
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font relative mt-12">
          <div className="flex pt-24">
            <div className="box border border-gray-300 p-4 py-8 rounded-md mx-16 w-3/12 h-6/12 flex flex-col items-center justify-center text-center">
              <img
                src={consultationCall}
                alt="consultationCall"
                style={{ width: "100px" }}
                className="mx-28 mt-2"
              />
              <div className="text-xl font-semibold mt-8">전화 상담</div>
              <br />
              평일 오전 9시 ~ 오후 6시
              <br /> 코로나19로 인해 전화 상담이 불가능합니다.
            </div>
            <div className="box border border-gray-300 p-4 py-8 rounded-md mx-16 w-3/12 h-6/12 flex flex-col items-center justify-center text-center">
              <img
                src={consultationOnline}
                alt="consultationOnline"
                style={{ width: "100px" }}
                className="mx-28 mt-2"
              />
              <div className="text-xl font-semibold mt-8">온라인 상담</div>
              <br />
              365일 24시간
              <br /> 아래 양식을 작성해 주세요.
            </div>
            <div className="box border border-gray-300 p-4 py-8 rounded-md mx-16 w-3/12 h-6/12 flex flex-col items-center justify-center text-center">
              <img
                src={consultationChat}
                alt="consultationChat"
                style={{ width: "100px" }}
                className="mx-28 mt-2"
              />
              <div className="text-xl font-semibold mt-8">
                텔레그램 채팅상담
              </div>
              <br />
              평일 오전 10시 ~ 오후 5시
              <a
                href="https://t.me/+T4xzw0_Cblc5MDA1"
                className="text-blue-500"
              >
                채팅상담 바로가기
              </a>
            </div>
          </div>
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <div className="text-5xl font-medium title-font mb-4 text-gray-900 dark:text-white">
                Contact Us
              </div>
              <div className="lg:w-2/3 mx-auto leading-relaxed text-xl font-semi-bold">
                사용 중에 어려움을 겪고 계시거나 문의사항이 있으신가요?
                <br />
                아래의 양식을 작성해 주시면 이메일로 빠르게 답변드리겠습니다.
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-10 text-lg text-gray-600"
                >
                  문의하실 내용을 아래 양식에 맞춰 작성해 주세요.
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="성함 : &#13;&#10;이메일 :  &#13;&#10;메타마스크 주소 :  &#13;&#10;문의내용 :"
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-40 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={sendMsg}
                className="flex mx-auto text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
              >
                제출
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
              <a href="mailto:WeAreSorry@ItsFake.com" className="text-blue-500">
                teamdaom@daom.com
              </a>
              <div className="leading-normal my-5">
                서울시 중구 세종대로 110
                <br />
                101호, DAOM
              </div>
              <span className="inline-flex">
                <div className="text-gray-500"></div>
              </span>
            </div>
            {/* 온라인 상담 성공 팝업 */}
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
                            제출 완료
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              문의 주셔서 감사드립니다. 빠른 시일 내에 답변
                              드리겠습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={closePopup}
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* 온라인 상담 성공 팝업 */}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Contact;
