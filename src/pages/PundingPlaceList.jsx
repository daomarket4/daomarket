import Layout from "../components/Layout";
import PundingList from "../components/PundingList";

const PundingPlaceList = () => {
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
          <PundingList />
        </section>
      </Layout>
    </div>
  );
};

export default PundingPlaceList;
