import Layout from "../components/Layout";
import DAOMNFT from "../images/DAOMNFT.png";

const SaleNFT = () => {
  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-5xl text-4xl font-medium title-font mb-4 text-gray-900">
              보유하고 계신 NFT를 판매하고 싶으신가요?
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-2xl">
              보유 중인 NFT 정보를 확인하시고 판매하고 싶은 가격과 갯수를 입력해
              주세요.
              <br /> 판매가 완료되면 해당 NFT는 구매자에게 이전되기 때문에
              판매를 취소하실 수 없습니다.
            </p>
          </div>
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
              <img
                src={DAOMNFT}
                alt="DAOMNFT"
                className="mb-8 w-104 rounded-xl"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                소유 중인 NFT 판매하기
              </h1>
              <p className="mb-8 leading-relaxed text-xl mt-4">
                현재 <b>0xe3c...9296C</b>님이 보유하고 계신 NFT는 총&nbsp;
                <b className="text-blue-400">23</b>개 입니다.
                <br /> 판매를 희망하신다면 판매하실 갯수와 희망하는 가격을 입력
                후 제출 버튼을 눌러주세요.
              </p>

              <div className="flex flex-col w-full md:justify-start justify-center items-start">
                <div className="relative w-full flex flex-col mb-4">
                  <label
                    htmlFor="price"
                    className="leading-7 text-sm text-gray-600"
                  >
                    판매하실 가격 &nbsp;
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="w-44 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="숫자만 입력해 주세요."
                  />
                </div>
                <div className="relative w-full flex flex-col">
                  <label
                    htmlFor="quantity"
                    className="leading-7 text-sm text-gray-600"
                  >
                    판매 희망 갯수 &nbsp;
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    name="quantity"
                    className="w-44 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    placeholder="숫자만 입력해 주세요."
                  />
                </div>
              </div>

              <div className="flex lg:flex-row md:flex-col mt-32 mb-10">
                <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  판매하기
                </button>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default SaleNFT;
