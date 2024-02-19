import { useState } from "react";
import Layout from "../components/Layout";
import PundingList from "../components/PundingList";
import SuccessPunding from "../components/SuccessPunding";

const PundingPlaceList = () => {
  const [isPunding, setIsPunding] = useState(true);

  const onClickSuccess = () => {
    setIsPunding(false);
  };
  const onClickProceeding = () => {
    setIsPunding(true);
  };
  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="flex flex-col text-center w-full mb-24">
            <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
              펀딩하고 싶은 아이템을 찾아보세요!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
              펀딩하고 싶으신 아이템이 없으신가요?
              <br />
              <a href="/Agenda" className="text-blue-500">
                [이곳]
              </a>
              을 클릭하여 직접 안건을 제출해 보세요!
            </p>
          </div>
          <div className="">
            <div className="border-b-2 border-gray-400 pb-4">
              <button
                onClick={onClickProceeding}
                className={`mr-8 ${
                  isPunding && "font-bold text-xl text-gray-400"
                }`}
              >
                진행중인 펀딩
              </button>
              <button
                onClick={onClickSuccess}
                className={`mr-8 ${
                  !isPunding && "font-bold text-xl text-gray-400"
                }`}
              >
                완료된 펀딩
              </button>
            </div>
            <div>
              {isPunding ? (
                <div>
                  <PundingList />
                </div>
              ) : (
                <SuccessPunding />
              )}
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default PundingPlaceList;
