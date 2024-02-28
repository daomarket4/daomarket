import Layout from "../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useEffect } from "react";

//관리자 권한
async function getAccount() {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    } catch (error) {
      console.error("YOU ARE NOT ADMIN!");
    }
  } else if (window.web3) {
    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  } else {
    console.log("USE CHROME! USE METAMASK!");
  }
}

const AdminLab = () => {
  const navigate = useNavigate();

  // 보안 기능입니다. 관리자 계정이 아니여도 주소창에 /admin을 입력하면 들어갈 수 있기 때문에 아래 주소가 아니면 바로 홈으로 보냅니다. 아래까지 입력해야 관리자 페이지에 접속이 가능합니다.
  // 프로젝트 제출 전 .env 처리 예정
  useEffect(() => {
    getAccount().then((account) => {
      if (
        account !== "0xe3cd9fC292B724095874522026Fb68932329296C" &&
        account !== "0xeFfC9eAf0CB26B4CA0614Ea99aCa0908Ca468FB3" &&
        account !== "0x32C1B6C8261F665Ac41a2b176C488d16ccD4109C" &&
        account !== "0x11D539b3339A89633e4067E6036Ea2729E225467" &&
        account !== "0x3f3Bf2769726264CFeAA1E87865af438F10190D7"
      ) {
        navigate("/AdminWarning");
      }
    });
  }, []);
  // 관리자 권한

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
                실험실
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
                실험적인 기능을 바로갈 수 있도록 만들어 놓은 페이지입니다.
              </p>
            </div>
            <div className="flex flex-wrap">
              {/* 멀티시그니처 */}
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-xl sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  Multi Signiture
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  멀티 시그니처 기능을 테스트 하였습니다. 기능은 미완성이나 멀티
                  시그니처를 이런 식으로 적용하면 될 것 같습니다.
                </p>
                <Link to="/MultiSig">
                  <a className="text-indigo-500 inline-flex items-center">
                    페이지 바로가기
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              </div>
              {/* 멀티시그니처 */}
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-xl sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  Vote
                </h2>
                <p className="leading-relaxed text-base mb-4">
                  투표 기능입니다. 선택지 중 한 개만 선택이 가능하도록 하였고,
                  투표를 하기 전에는 제출하기 버튼을 못 누르게 하였습니다.
                </p>
                <Link to="/Vote">
                  <a className="text-indigo-500 inline-flex items-center">
                    페이지 바로가기
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </Link>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-xl sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  TEST
                </h2>
                <p className="leading-relaxed text-base mb-4">TESTING</p>
                <a className="text-indigo-500 inline-flex items-center">
                  페이지 바로가기
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
              <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
                <h2 className="text-xl sm:text-2xl text-gray-900 font-medium title-font mb-2">
                  TEST
                </h2>
                <p className="leading-relaxed text-base mb-4">TESTING</p>
                <a className="text-indigo-500 inline-flex items-center">
                  페이지 바로가기
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    className="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default AdminLab;
