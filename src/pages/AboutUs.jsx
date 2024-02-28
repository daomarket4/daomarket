import Layout from "../components/Layout";
import { BsGithub } from "react-icons/bs";
import DAOMLOGO from "../images/DAOMLOGO.png";
import junhyunpark from "../images/junhyunpark.png";
import kihyunkim from "../images/kihyunkim.png";
import junhyukjung from "../images/junhyukjung.png";
import juyoungjung from "../images/juyoungjung.png";
import jungbinkim from "../images/jungbinkim.png";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font mt-32">
          <Link to="https://github.com/daomarket4/daomarket">
            <img src={DAOMLOGO} alt="DAOMLOGO" className="mb-8 w-72 mr-2" />
          </Link>
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <Link to="https://github.com/daomarket4/daomarket">
                <h1 className="text-4xl font-medium title-font mb-4 text-gray-900">
                  블록체인스쿨 4기 - Team DAOM
                </h1>
              </Link>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-xl">
                안녕하세요. 프로젝트 DAOM을 진행한 팀 다옴입니다. <br />
                저희는 블록체인 스쿨 4기에 참여하여 DAOM이라는 프로젝트를
                진행하였습니다.
                <br /> DAOM은 DAO를 활용한 공동구매 플랫폼으로, 공동구매를
                희망하는 사용자들이
                <br />
                보다 쉽게 DAO를 통해 상품을 구매하는 것을 목표로 하고
                제작하였습니다.
                <br /> 감사합니다.
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 lg:w-1/5 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    src={junhyunpark}
                    alt="junhyunpark"
                    className="mb-8 w-42 mr-2 rounded-full border border-black"
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      박준현
                    </h2>
                    <h3 className="text-gray-500 mb-3 font-semibold">
                      프로젝트 팀장
                    </h3>
                    <p className="mb-4">
                      프로젝트 팀장으로서 프로젝트 전체적인 관리 및 솔루션을
                      제시하였고, MultiSig 관련 코드 개발을 담당하였습니다.
                    </p>
                    <span className="inline-flex text-gray-500">
                      <a
                        href="https://github.com/parkliam"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BsGithub className="text-xl text-black" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/5 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    src={junhyukjung}
                    alt="junhyukjung"
                    className="mb-8 w-42 mr-2 rounded-full border border-black"
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      정준혁
                    </h2>
                    <h3 className="text-gray-500 mb-3 font-semibold">
                      웹페이지 UI / UX
                    </h3>
                    <p className="mb-4">
                      프론트엔드를 담당하여 프로젝트 웹페이지의 디자인과 기능
                      구현을 개발하였으며, UI / UX 개선을 하였습니다.
                    </p>
                    <span className="inline-flex">
                      <div className="text-gray-500">
                        <div>
                          <a
                            href="http://github.com/JUNHYUKJUNG"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsGithub className="text-xl text-black" />
                          </a>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/5 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    src={kihyunkim}
                    alt="kihyunkim"
                    className="mb-8 w-42 mr-2 rounded-full border border-black"
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      김기현
                    </h2>
                    <h3 className="text-gray-500 mb-3 font-semibold">
                      스마트 컨트랙트 & 웹페이지 연동
                    </h3>
                    <p className="mb-4">
                      웹페이지에서 스마트 컨트랙트가 원활히 구현될 수 있도록
                      기능을 구현하였으며, 웹페이지 개발에도 보조로
                      참여하였습니다.
                    </p>
                    <span className="inline-flex">
                      <div className="text-gray-500">
                        <div>
                          <a
                            href="https://github.com/rootel123"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsGithub className="text-xl text-black" />
                          </a>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/5 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    src={jungbinkim}
                    alt="jungbinkim"
                    className="mb-8 w-42 mr-2 rounded-full border border-black"
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      김정빈
                    </h2>
                    <h3 className="text-gray-500 mb-3 font-semibold">
                      스마트 컨트랙트 개발
                    </h3>
                    <p className="mb-4">
                      프로젝트 스마트 컨트랙트의 전체적인 부분을 개발하였으며,
                      웹페이지에서 스마트 컨트랙트와 연동될 수 있도록
                      보조하였습니다.
                    </p>
                    <span className="inline-flex">
                      <div className="text-gray-500">
                        <div>
                          <a
                            href="https://github.com/nanamingg"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsGithub className="text-xl text-black" />
                          </a>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/5 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img
                    src={juyoungjung}
                    alt="juyoungjung"
                    className="mb-8 w-42 mr-2 rounded-full border border-black"
                  />
                  <div className="w-full">
                    <h2 className="title-font font-medium text-lg text-gray-900">
                      정주영
                    </h2>
                    <h3 className="text-gray-500 mb-3 font-semibold">
                      Dao 개발
                    </h3>
                    <p className="mb-4">
                      스마트 컨트랙트 개발에 보조로 참여했으며, dao와 관련하여
                      코드 개발을 담당하였습니다.
                    </p>
                    <span className="inline-flex">
                      <div className="text-gray-500">
                        <div>
                          <a
                            href="https://github.com/wndud5814"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <BsGithub className="text-xl text-black" />
                          </a>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AboutUs;
