document.addEventListener('DOMContentLoaded', function () {
  const loginButton = document.getElementById('login-button');
  const levelDisplay = document.getElementById('level-display');
  const nicknameDisplay = document.getElementById('nickname-display');
  const nicknameModal = document.getElementById('nickname-modal');
  const nicknameInput = document.getElementById('nickname-input');
  const nicknameConfirm = document.getElementById('nickname-confirm');
  const warningModal = document.getElementById('warning-modal');
  const warningMessage = document.getElementById('warning-message');
  const warningCancel = document.getElementById('warning-cancel');
  const warningConfirm = document.getElementById('warning-confirm');

  let nickname = '';

  if (loginButton) {
    loginButton.addEventListener('click', function (event) {
      if (loginButton.textContent === '로그인') {
        window.location.href = '/login/discord';
      } else {
        if (confirm('로그아웃 하시겠어요?')) {
          console.log('로그아웃 처리');
          loginButton.textContent = '로그인';
          nicknameDisplay.classList.add('hidden');
          levelDisplay.classList.add('hidden');
        }
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

    levelDisplay.textContent = `Lv.${level}`;
    levelDisplay.classList.remove('hidden');
    nicknameDisplay.textContent = nickname || '닉네임 비설정';
    nicknameDisplay.classList.remove('hidden');

    console.log(`${nickname || 'Anonymous'} has joined!`);
  }

  const showNicknameModal = () => {
    nicknameModal.classList.remove('hidden');
  };

  nicknameConfirm.addEventListener('click', function () {
    const inputValue = nicknameInput.value.trim();

    if (inputValue.length === 0 || inputValue.length > 10) {
      alert('닉네임은 1~10자 사이여야 합니다.');
      return;
    }

    warningMessage.textContent = `정말 "${inputValue}"으로 설정하실 건가요?`;
    nicknameModal.classList.add('hidden'); // 닉네임 모달 닫기
    warningModal.classList.remove('hidden');
    nickname = inputValue;
  });

  warningCancel.addEventListener('click', function () {
    warningModal.classList.add('hidden');
    nicknameModal.classList.remove('hidden');
  });

  warningConfirm.addEventListener('click', function () {
    warningModal.classList.add('hidden');
    loginButton.textContent = nickname;
    updateUI();
  });

  const startGameButton = document.getElementById('start-game-button');
  const specButton = document.getElementById('spec-button');
  const clientButton = document.getElementById('client-button');

  if (startGameButton) {
    startGameButton.addEventListener('click', function () {
      alert('공사 중입니다!');
    });
  }

  if (specButton) {
    specButton.addEventListener('click', function () {
      alert('공사 중입니다!');
    });
  }

  if (clientButton) {
    clientButton.addEventListener('click', function () {
      alert('공사 중입니다!');
    });
  }

  setTimeout(showNicknameModal, 1000);
  updateUI();
});