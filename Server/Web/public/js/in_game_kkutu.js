document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    alert('모바일은 아직 게임 진입이 불가해요!');
    window.location.href = '/';
    return;
  }

  const loadingScreen = document.createElement('div');
  loadingScreen.className = 'loading-container';
  loadingScreen.innerHTML = `
    <p>로딩중...</p>
    <div class="loading-bar">
      <div class="progress"></div>
    </div>`;
  body.appendChild(loadingScreen);

  const progress = document.querySelector('.progress');
  let progressPercentage = 0;

  const loadingInterval = setInterval(() => {
    progressPercentage += 5;
    progress.style.width = `${progressPercentage}%`;

    if (progressPercentage >= 100) {
      clearInterval(loadingInterval);
      loadingScreen.remove();

      const welcomeScreen = document.createElement('div');
      welcomeScreen.className = 'welcome-screen';
      welcomeScreen.textContent = '환영해요!';
      body.appendChild(welcomeScreen);

      setTimeout(() => {
        welcomeScreen.remove();
        initializeGame();
      }, 2000);
    }
  }, 300);

  function initializeGame() {
    body.innerHTML = `
      <header>
        <div class="user-info">
          <span>코인: 100</span> | <span>레벨: Lv.1</span> | <span>닉네임: 사용자</span>
        </div>
        <button class="menu-button">☰</button>
      </header>
      <main class="game-container">
        <section class="members">
          <h2>멤버 - 0명</h2>
          <ul class="members-list"></ul>
          <div class="user-profile">
            <p>닉네임: 사용자</p>
            <p>코인: 100</p>
          </div>
        </section>
        <section class="chat">
          <div class="chat-messages">
            <div class="system-message">시스템 - 베타 테스트 버전중! 오류가 드글드글 합니다.</div>
          </div>
          <input type="text" class="chat-input" placeholder="채팅 입력 후 Enter 키를 누르세요." />
        </section>
      </main>
      <div class="sidebar hidden">
        <button class="close-sidebar">&gt;</button>
        <button class="logout">로그아웃</button>
        <button class="darkmode-toggle">다크모드</button>
        <button class="whitemode-toggle">화이트모드</button>
        <button class="help-button">도움말</button>
      </div>
      <div class="tooltip hidden">도움말 텍스트가 여기에 표시됩니다.</div>`;

    attachGameEvents();
    attachSidebarEvents();
    attachModeToggleEvents();
    setupTooltip();
  }

  function attachGameEvents() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    const membersList = document.querySelector('.members-list');
    const member = document.createElement('li');
    member.textContent = 'Lv.1 - 사용자';
    membersList.appendChild(member);

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && chatInput.value.trim() !== '') {
        const message = chatInput.value.trim();
        const newMessage = document.createElement('div');
        newMessage.className = 'chat-message';
        newMessage.innerHTML = `<strong>사용자:</strong> ${message}`;
        chatMessages.appendChild(newMessage);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatInput.value = '';
      }
    });
  }

  function attachSidebarEvents() {
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const logoutButton = document.querySelector('.logout');
    const helpButton = document.querySelector('.help-button');
    const tooltip = document.querySelector('.tooltip');

    menuButton.addEventListener('click', () => {
      sidebar.classList.remove('hidden');
    });

    closeSidebar.addEventListener('click', () => {
      sidebar.classList.add('hidden');
    });

    logoutButton.addEventListener('click', () => {
      alert('로그아웃됩니다.');
      window.location.href = '/';
    });

    helpButton.addEventListener('click', () => {
      tooltip.classList.toggle('hidden');
    });
  }

  function attachModeToggleEvents() {
    const darkmodeButton = document.querySelector('.darkmode-toggle');
    const whitemodeButton = document.querySelector('.whitemode-toggle');
    
    darkmodeButton.addEventListener('click', () => {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    });

    whitemodeButton.addEventListener('click', () => {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    });
  }

  function setupTooltip() {
    const tooltip = document.querySelector('.tooltip');
    tooltip.innerHTML = '게임 사용법에 대한 간단한 안내문이 여기에 표시됩니다.';
  }

  const style = document.createElement('style');
  style.textContent = `
    body.dark-mode { background-color: #121212; color: #ffffff; }
    body.light-mode { background-color: #ffffff; color: #000000; }
    .hidden { display: none; }
    .loading-container { text-align: center; font-size: 20px; }
    .loading-bar { width: 80%; height: 10px; background-color: #e0e0e0; margin: 20px auto; }
    .progress { height: 100%; width: 0; background-color: #76c7c0; }
    .welcome-screen { text-align: center; font-size: 30px; color: green; }
    .game-container { display: flex; justify-content: space-between; }
    .members, .chat { width: 48%; }
    .chat-messages { max-height: 200px; overflow-y: auto; background-color: #f4f4f4; padding: 10px; }
    .chat-message { margin: 5px 0; }
    .system-message { font-size: 14px; color: #888; }
    .user-info { font-size: 18px; }
    .menu-button { font-size: 30px; cursor: pointer; }
    .sidebar { position: fixed; top: 0; right: 0; width: 200px; height: 100%; background-color: rgba(0, 0, 0, 0.7); color: white; display: flex; flex-direction: column; padding: 10px; }
    .sidebar button { margin: 10px 0; padding: 10px; background-color: #444; border: none; color: white; cursor: pointer; }
    .sidebar button:hover { background-color: #555; }
    .tooltip { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); color: white; padding: 20px; border-radius: 5px; max-width: 300px; }
  `;
  document.head.appendChild(style);
});
