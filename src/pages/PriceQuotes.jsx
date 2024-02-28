import Layout from "../components/Layout";

const PriceQuotes = () => {
  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
              현재 NFT의 시세를 조회하시겠어요?
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
              하단의 시세를 확인하시고 원하시는 NFT를 구매하시거나 안건을 제출해
              보세요!
            </p>
            <div className="mt-8 text-3xl text-bold text-red-500">
              기능 미구현
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default PriceQuotes;
