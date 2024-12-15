document.addEventListener('DOMContentLoaded', function() {
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', function(event) {
      window.location.href = '/login/discord';
    });
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
  const loginButtonText = document.getElementById('login-button');

  if (nicknameForm) {
    nicknameForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const nicknameInput = nicknameForm.querySelector('input[name="nickname"]');
      const nickname = nicknameInput.value.trim();

      if (nickname.length === 0 || nickname.length > 10) {
        alert('닉네임은 1~10자 사이여야 합니다.');
        return;
      }


      if (loginButtonText) {
        loginButtonText.textContent = nickname;
        alert('닉네임이 설정되었습니다!');
        nicknameModal.classList.add('hidden'); // 모달 숨기기
      }
    });
  }

  if (loginButtonText && loginButtonText.textContent === '로그인') {
    loginButtonText.addEventListener('click', function() {
      alert('로그아웃 하시겠어요?');
      loginButtonText.textContent = '로그인';
    });
  }

  const showNicknameModal = () => {
    nicknameModal.classList.remove('hidden');
  }

  setTimeout(showNicknameModal, 1000);
});
