// 외부 라이브러리 로드
import axios from 'axios';
import Swal from 'sweetalert2';
import anime from 'animejs';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('login-button');
  const nicknameDisplay = document.getElementById('nickname-display');
  const nicknameModal = document.getElementById('nickname-modal');
  const nicknameForm = document.getElementById('nickname-form');
  const startGameButton = document.getElementById('start-game-button');
  const specButton = document.getElementById('spec-button');
  const clientButton = document.getElementById('client-button');

  let userLevel = 1;
  let nickname = '';

  const fetchUserLevel = async () => {
    try {
      const response = await axios.get('/api/user/level');
      userLevel = response.data.level || 1;
    } catch (error) {
      console.error('레벨 불러오기 실패:', error);
      userLevel = 1;
    }
  };

  const animateModal = (modal) => {
    anime({
      targets: modal,
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 500,
      easing: 'easeOutElastic(1, 0.75)',
    });
  };

  const showNicknameModal = () => {
    Swal.fire({
      title: '<span style="color: green; font-weight: bold;">닉네임 설정하기</span>',
      html: `
        <p>처음 로그인한 이용자는 닉네임을 설정해야 합니다.<br><br>욕설 및 특수문자는 사용할 수 없습니다.</p>
        <input id="nickname-input" type="text" placeholder="닉네임 입력" class="swal2-input" maxlength="10" />
      `,
      showCancelButton: false,
      confirmButtonText: '확인',
      customClass: {
        popup: 'rounded-lg',
        confirmButton: 'bg-green-500 hover:bg-green-600 text-white',
      },
      allowOutsideClick: false,
      preConfirm: () => {
        const input = document.getElementById('nickname-input').value.trim();
        if (!input || input.length > 10) {
          Swal.showValidationMessage('닉네임은 1~10자 사이여야 합니다.');
        }
        return input;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        confirmNickname(result.value);
      }
    });
  };

  const confirmNickname = (inputNickname) => {
    Swal.fire({
      title: '경고',
      text: `정말 "${inputNickname}"로 설정하시겠습니까?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        nickname = inputNickname;
        loginButton.textContent = nickname;
        nicknameDisplay.textContent = nickname;
        console.log(`${nickname} has joined!`);
        Swal.fire('닉네임 설정 완료!', '', 'success');
      } else {
        showNicknameModal();
      }
    });
  };

  const setupButtonHandlers = () => {
    if (startGameButton) {
      startGameButton.addEventListener('click', () => {
        Swal.fire('공사 중입니다!', '', 'info');
      });
    }

    if (specButton) {
      specButton.addEventListener('click', () => {
        Swal.fire('공사 중입니다!', '', 'info');
      });
    }

    if (clientButton) {
      clientButton.addEventListener('click', () => {
        Swal.fire('공사 중입니다!', '', 'info');
      });
    }

    if (loginButton) {
      loginButton.addEventListener('click', () => {
        window.location.href = '/login/discord';
      });
    }
  };

  const initializePage = async () => {
    await fetchUserLevel();
    if (!nickname) {
      showNicknameModal();
    } else {
      nicknameDisplay.textContent = nickname;
    }
    setupButtonHandlers();
  };

  initializePage();
});