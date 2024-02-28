import Layout from "../components/Layout";

const Vote = () => {
  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
              DAOM과 함께해 주셔서 감사합니다!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
              하단에서 그간 작성하신 안건을 확인하실 수 있습니다.
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

export default Vote;
