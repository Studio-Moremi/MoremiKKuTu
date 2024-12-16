document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-button');
  const levelDisplay = document.getElementById('level-display');
  const nicknameDisplay = document.getElementById('nickname-display');

  if (loginButton) {
    loginButton.addEventListener('click', function(event) {
      if (loginButton.textContent === '닉네임') {
        window.location.href = '/login/discord';
      } else {
        window.location.href = '/login/discord';
      }
    });
  }

  async function fetchUserLevel() {
    try {
      const response = await fetch('/api/user/level');
      if (response.ok) {
        const { level } = await response.json();
        return level;
      }
      return 1;
    } catch (error) {
      console.error('Error fetching user level:', error);
      return 1;
    }
  }

  async function updateUI() {
    const level = await fetchUserLevel();

    loginButton.textContent = '닉네임';
    loginButton.href = '#';
    loginButton.classList.add('nickname-button');

    levelDisplay.textContent = `Lv.${level}`;
    levelDisplay.classList.remove('hidden');

    nicknameDisplay.textContent = loginButton.textContent;
    nicknameDisplay.classList.remove('hidden');
  }

  const startGameButton = document.getElementById('start-game-button');
  if (startGameButton) {
    startGameButton.addEventListener('click', function() {
      alert('공사 중입니다!');
    });
  }

  const specButton = document.getElementById('spec-button');
  if (specButton) {
    specButton.addEventListener('click', function() {
      alert('공사 중입니다!');
    });
  }

  const clientButton = document.getElementById('client-button');
  if (clientButton) {
    clientButton.addEventListener('click', function() {
      alert('공사 중입니다!');
    });
  }

  const nicknameModal = document.getElementById('nickname-modal');
  const nicknameForm = document.getElementById('nickname-form');

  if (nicknameForm) {
    nicknameForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nicknameInput = nicknameForm.querySelector('input[name="nickname"]');
      const nickname = nicknameInput.value.trim();

      if (nickname.length === 0 || nickname.length > 10) {
        alert('닉네임은 1~10자 사이여야 합니다.');
        return;
      }

      loginButton.textContent = nickname;
      alert('닉네임이 설정되었습니다!');
      nicknameModal.classList.add('hidden');
      updateUI();
    });
  }

  if (loginButton && loginButton.textContent === '로그인') {
    loginButton.addEventListener('click', function() {
      alert('로그아웃 하시겠어요?');
      loginButton.textContent = '로그인';
      updateUI();
    });
  }

  const showNicknameModal = () => {
    nicknameModal.classList.remove('hidden');
  }

  setTimeout(showNicknameModal, 1000);

  updateUI();
});
