// projectData.js
const projectData = {
  project1: {
    imgUrl: "../imgs/chatbot.png",
    title: {
      en: "Chatbot Website",
      ko: "챗봇 웹사이트",
    },
    frontendSkills: "TypeScript, Recoil, React, Styled-Components",
    backendSkills: "Node.js, Express, MongoDB",
    explanation: {
      en: `
        Chatbot Website with Various Features: Multiple chatbot characters, Text-to-speech (TTS) for chatbot replies, Speech-to-text (STT) for user input, User registration with username/password and Kakao login, Chat messages stored in MongoDB Atlas server
      `,
      ko: `
        다양한 기능을 갖춘 챗봇 웹사이트: 다중 챗봇 캐릭터, 챗봇 응답을 위한 텍스트 음성 변환 (TTS), 사용자 입력을 위한 음성 텍스트 변환 (STT), 사용자 등록 및 카카오 로그인, MongoDB Atlas 서버에 저장된 채팅 메시지
      `,
    },
    projectURL: {
      live: "https://open-ai-vercel.vercel.app/openAI/chat",
      github: "https://github.com/DeanYoon/openAI",
    },
  },
  project2: {
    imgUrl: "../imgs/sololife.png",
    title: {
      en: "Social Network for Solo Living",
      ko: "자취 생활 소셜 네트워크",
    },
    frontendSkills: "TypeScript, Recoil, React, Styled-Components",
    backendSkills: "Node.js, Express, MySQL",
    explanation: {
      en: `
        Social Network for Solo Living: A platform for individuals living alone to connect and share experiences. Features include user authentication with Kakao and Google login, CRUD operations for posts and comments, like functionality, and categorization of posts.
      `,
      ko: `
        자취 생활 소셜 네트워크: 혼자 사는 사람들을 위한 연결 및 경험 공유 플랫폼. 카카오 및 구글 로그인을 통한 사용자 인증, 게시물 및 댓글에 대한 CRUD 작업, 좋아요 기능 및 게시물 카테고리화 기능을 포함합니다.
      `,
    },
    projectURL: {
      live: "https://www.sololife.net/",
      github: "https://github.com/DeanYoon/sololife",
    },
  },
};

export default projectData;
