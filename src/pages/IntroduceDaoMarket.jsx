import Layout from "../components/Layout";
import WhatIsDaoMarket from "../components/WhatIsDaoMarket";
import WhyChooseDaoMarket from "../components/WhyChooseDaoMarket";
import HowCanIUseDaoMarket from "../components/HowCanIUseDaoMarket";
import { Link } from "react-router-dom";

const IntroduceDaoMarket = () => {
  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <WhatIsDaoMarket />
          <WhyChooseDaoMarket />
          <HowCanIUseDaoMarket />
          <div className="py-8 text-center text-3xl text-gray-900">
            더 궁금한 점이 있으신가요?
            <div className="text-2xl text-gray-500 mt-2">
              아래 버튼을 통해 1:1 문의를 남겨주세요!
            </div>
            <Link to="/Contact">
              <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded mt-8 text-lg mb-12">
                1:1 문의하기
              </button>
            </Link>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default IntroduceDaoMarket;
