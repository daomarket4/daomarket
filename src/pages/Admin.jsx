import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Web3 from "web3";
import adminLab from "../images/adminLab.png";

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

const Admin = () => {
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
        account !== "0x928d3d4EE68CF51cf41B574e345975E922cF39da"
      ) {
        navigate("/AdminWarning");
      }
    });
  }, []);
  // 관리자 권한

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font text-5xl dark:text-white">
          관리자페이지
          <div className="container px-5 py-24 mx-auto">
            <Link to="/AdminAllProposal">
              <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="sm:w-32 sm:h-36 h-24 w-24 sm:mr-10 inline-flex items-center justify-center rounded-full flex-shrink-0">
                  {/* <img src={invest} alt="invest" className="mb-8 mr-2" /> */}
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-gray-900 text-xl title-font font-medium mb-2">
                    전체 안건 보기
                  </h2>
                  <p className="leading-relaxed text-base">
                    유저들이 작성한 모든 안건을 확인할 수 있습니다.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/">
              <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full flex-shrink-0">
                  {/* <img src={document} alt="document" className="mb-8 mr-2" /> */}
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-gray-900 text-xl title-font font-medium mb-2">
                    NFT 발행 및 관리
                  </h2>
                  <p className="leading-relaxed text-base">
                    NFT 발행 및 관리를 할 수 있습니다.
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/AdminLab">
              <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
                <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full flex-shrink-0">
                  <img src={adminLab} alt="adminLab" className="my-8 mr-2" />
                </div>
                <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
                  <h2 className="text-gray-900 text-xl title-font font-medium mb-2">
                    실험실
                  </h2>
                  <p className="leading-relaxed text-base">
                    실험적인 기능을 사용할 수 있습니다.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Admin;
