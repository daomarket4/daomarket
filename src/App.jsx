import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Join from "./pages/Join";
import Agenda from "./pages/Agenda";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import IntroduceDaoMarket from "./pages/IntroduceDaoMarket";
import Vote from "./pages/Vote";
import PundingPlaceDetail from "./pages/PundingPlaceDetail";
import PundingPlaceList from "./pages/PundingPlaceList";
import MyPage from "./pages/MyPage";
import MyInvest from "./pages/MyInvest";
import MyAgenda from "./pages/MyAgenda";
import MyProfile from "./pages/MyProfile";
import FAQ from "./pages/FAQ";
import MyContact from "./pages/MyContact";
import SaleNFT from "./pages/SaleNFT";
import defaultProfileImage from "./images/img.png";
import SuccessAgenda from "./pages/SuccessAgenda";
import Admin from "./pages/Admin";
import AdminWarning from "./pages/AdminWarning";
import AdminLab from "./pages/AdminLab";
import AdminAllProposals from "./pages/AdminAllProposals";
import AdminProposalDetail from "./components/AdminProposalDetail";
import PriceQuotes from "./pages/PriceQuotes";

//account 여기로 옮김 useeffect 만들어서 localstorage.getitem? 가져오기 - 강사님 피드백

const App = () => {
  const [profileImage, setProfileImage] = useState(
    localStorage.getItem("profileImage") || defaultProfileImage
  );

  const [nickname, setNickname] = useState(
    localStorage.getItem("nickname") || "DAOM"
  );

  // 이미지 변경 핸들러
  const handleImageChange = (imageURL) => {
    setProfileImage(imageURL);
    localStorage.setItem("profileImage", imageURL); // 이미지 URL을 로컬 스토리지에 저장
  };

  const handleDeleteImage = (imageURL) => {
    setProfileImage(imageURL);
    localStorage.setItem("profileImage", imageURL); // 이미지 URL을 로컬 스토리지에 저장
  };

  useEffect(() => {
    // 페이지 로드시 로컬 스토리지에서 이미지 가져오기
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  useEffect(() => {
    // 닉네임 상태가 변경될 때마다 로컬 스토리지에 저장
    localStorage.setItem("nickname", nickname);
  }, [nickname]);

  return (
    <ThemeProvider attribute="class">
      <Router>
        <Header profileImage={profileImage} nickname={nickname} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Join" element={<Join />} />
          <Route path="/Agenda" element={<Agenda />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/IntroduceDaoMarket" element={<IntroduceDaoMarket />} />
          <Route path="/Vote" element={<Vote />} />
          <Route
            path="/proposal/:proposalId"
            element={<PundingPlaceDetail />}
          />
          <Route path="/PundingPlaceList" element={<PundingPlaceList />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/MyInvest" element={<MyInvest />} />
          <Route path="/MyAgenda" element={<MyAgenda />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/MyContact" element={<MyContact />} />
          <Route path="/SuccessAgenda" element={<SuccessAgenda />} />
          <Route path="/SaleNFT" element={<SaleNFT />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/AdminWarning" element={<AdminWarning />} />
          <Route path="/AdminLab" element={<AdminLab />} />
          <Route path="/AdminAllProposal" element={<AdminAllProposals />} />
          <Route path="/PriceQuotes" element={<PriceQuotes />} />
          <Route
            path="/admin/proposal-detail/:proposalId"
            element={<AdminProposalDetail />}
          />
          <Route
            path="/MyProfile"
            element={
              <MyProfile
                onImageChange={handleImageChange}
                onDeleteImage={handleDeleteImage}
                setNickname={setNickname}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

// 대략 진행 방향은 페이지(Home, About Us, Contact Us 등등)마다 작동되게 하는 Layout(페이지가 이동되고 Header와 Footer가 고정되는)을 만들고 페이지들 안에 components들을 넣어서 구성하면 될 거 같습니다.

// warning이 여러개 뜬다면 최상위 위치에 .env 생성 후 아래 코드 주석 풀고 입력하기
// GENERATE_SOURCEMAP=false

// 제출 전에 .env 처리해야할 것들
// 1. Contact.jsx 텔레그램 API
// 2. Header.jsx 관리자 계정 주소
// 3. Admin.jsx 관리자 계정 주소
