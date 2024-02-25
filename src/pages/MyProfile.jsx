import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import defaultProfileImage from "../images/img.png";

const MyProfile = ({ onImageChange, onDeleteImage, setNickname }) => {
  const [address, setAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || defaultProfileImage
  );
  const [previewImage, setPreviewImage] = useState(profileImage);

  const handleChangeImage = (event) => {
    const selectedImage = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageURL = reader.result;
      // 이미지 변경 함수 호출
      onImageChange(imageURL);
      // 로컬 스토리지에 이미지 URL 저장
      localStorage.setItem("profileImage", imageURL);
    };

    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleImageDelete = () => {
    setProfileImage(defaultProfileImage);
    setPreviewImage(defaultProfileImage);
    // 로컬 스토리지에서 이미지 URL 제거
    localStorage.removeItem("profileImage");
    onDeleteImage(defaultProfileImage);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        }
      });
    }
  }, []);

  const handleHover = () => {
    setShowPopup(true);
  };

  const handleLeave = () => {
    setShowPopup(false);
  };

  // 닉네임 변경 기능
  const [tempNickname, setTempNickname] = useState(
    localStorage.getItem("nickname") || ""
  );

  const handleNicknameChange = (event) => {
    setTempNickname(event.target.value);
  };

  const handleNicknameSubmit = () => {
    setNickname(tempNickname);
    localStorage.setItem("nickname", tempNickname);
    window.location.reload();
  };

  return (
    <div className="bg-darkMode">
      <Layout>
        <section className="flex min-h-screen flex-col items-center justify-center text-gray-600 body-font">
          {/* 프로필 이미지 미리보기 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <div className="mb-4 md:w-2/5 flex justify-center">
              <img
                src={previewImage}
                alt="프로필 이미지 미리보기"
                className="w-32 h-32 rounded-full mb-2 object-cover"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
            {/* 파일 선택, 이미지 변경 및 이미지 삭제 버튼 */}
            <div className="flex items-center md:w-3/5">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  handleChangeImage(e);
                  setPreviewImage(URL.createObjectURL(e.target.files[0]));
                }}
                id="profileImageInput"
                style={{ display: "none" }}
              />
              <label
                htmlFor="profileImageInput"
                className="cursor-pointer bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                이미지 선택
              </label>
              <button
                onClick={handleImageDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                이미지 삭제
              </button>
            </div>
          </div>
          {/* 파일 선택, 이미지 변경 및 이미지 삭제 버튼 */}
          {/* 닉네임 지정 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5 text-center flex items-center justify-center">
              닉네임 변경
            </h2>
            <div className="md:w-3/5 md:pl-6 flex">
              <p className="leading-relaxed text-xl flex">
                <input
                  type="text"
                  onChange={handleNicknameChange}
                  className="bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="다섯 글자 이내로"
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleNicknameSubmit();
                    }
                  }}
                />
                <button
                  onClick={handleNicknameSubmit}
                  className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                >
                  확인
                </button>
                {/* 확인 버튼 추가 */}
              </p>
            </div>
          </div>
          {/* 닉네임 지정 */}
          {/* 메타마스크 주소 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5 text-center flex items-center justify-center">
              나의 MetaMask 주소
            </h2>
            <div className="md:w-3/5 md:pl-6 flex">
              <p className="leading-relaxed text-xl">
                현재 로그인된 주소는 {address.substring(0, 7)}...
                {address.substring(address.length - 5)} 입니다.
              </p>
              <div
                className="mt-1 ml-4 text-blue-500 relative cursor-pointer"
                onMouseEnter={handleHover}
                onMouseLeave={handleLeave}
              >
                주소 자세히 보기
                {showPopup && (
                  <div className="absolute bg-white p-2 text-sm text-gray-900 rounded shadow">
                    {address}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* 메타마스크 주소 */}
          {/* 목록 */}
          <div className="container px-5 py-8 mx-auto flex flex-wrap">
            <h2 className="sm:text-3xl text-2xl text-gray-900 font-medium title-font mb-2 md:w-2/5 text-center flex items-center justify-center">
              목록
            </h2>
            <div className="md:w-3/5 md:pl-6">
              <p className="leading-relaxed text-xl">목록</p>
            </div>
          </div>
          {/* 목록 */}
        </section>
      </Layout>
    </div>
  );
};

export default MyProfile;
