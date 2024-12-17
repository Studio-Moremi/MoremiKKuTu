document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  if (/Mobi|Android/i.test(navigator.userAgent)) {
    alert('모바일은 아직 게임 진입이 불가해요!');
    window.location.href = '/';
    return;
  }

  const loadingScreen = document.createElement('div');
  loadingScreen.innerHTML = `
    <div class="loading-container">
      <p>로딩중...</p>
      <div class="loading-bar">
        <div class="progress"></div>
      </div>
    </div>`;
  body.appendChild(loadingScreen);

  const progress = document.querySelector('.progress');
  let progressPercentage = 0;

  const loadingInterval = setInterval(() => {
    progressPercentage += 10;
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
      </div>`;
    attachGameEvents();
  }

  function attachGameEvents() {
    const chatInput = document.querySelector('.chat-input');
    const chatMessages = document.querySelector('.chat-messages');
    const membersList = document.querySelector('.members-list');
    const menuButton = document.querySelector('.menu-button');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.querySelector('.close-sidebar');
    const logoutButton = document.querySelector('.logout');

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

    const member = document.createElement('li');
    member.textContent = 'Lv.1 - 사용자';
    membersList.appendChild(member);

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
  }
});