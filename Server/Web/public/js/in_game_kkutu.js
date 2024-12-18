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
        <button class="create-room-button">방 생성</button>
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
      <div class="tooltip hidden">도움말 텍스트가 여기에 표시됩니다.</div>
      <div class="room-modal hidden">
        <div class="modal-content">
          <h2>방 생성</h2>
          <label>방 이름:</label>
          <input type="text" id="room-name" />
          <label>라운드 수:</label>
          <input type="number" id="rounds" min="1" />
          <button class="confirm-room-button">확인</button>
          <button class="close-room-modal">닫기</button>
        </div>
      </div>`;

    attachGameEvents();
    attachSidebarEvents();
    attachModeToggleEvents();
    setupRoomModal();
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

  function setupRoomModal() {
    const createRoomButton = document.querySelector('.create-room-button');
    const roomModal = document.querySelector('.room-modal');
    const closeRoomModal = document.querySelector('.close-room-modal');
    const confirmRoomButton = document.querySelector('.confirm-room-button');

    createRoomButton.addEventListener('click', () => {
      roomModal.classList.remove('hidden');
    });

    closeRoomModal.addEventListener('click', () => {
      roomModal.classList.add('hidden');
    });

    confirmRoomButton.addEventListener('click', () => {
      const roomName = document.getElementById('room-name').value.trim();
      const rounds = parseInt(document.getElementById('rounds').value);

      if (!roomName || isNaN(rounds) || rounds <= 0) {
        alert('올바른 정보를 입력하세요.');
        return;
      }

      alert(`방이 생성되었습니다: ${roomName} (${rounds} 라운드)`);
      roomModal.classList.add('hidden');
    });
  }
});