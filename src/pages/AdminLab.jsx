import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
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
        account !== ""
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
          실험실
        </section>
      </Layout>
    </div>
  );
};

export default AdminLab;
