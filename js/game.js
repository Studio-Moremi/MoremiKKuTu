/**
* Rule the words! KKuTu Online
* Copyright (C) 2024~ Studio Moremi(op@kkutu.store)
**/

const modal = document.getElementById('create-room-modal');
const form = document.getElementById('room-form');
const cancelBtn = document.getElementById('cancel');

document.getElementById('btn-create-room').addEventListener('click', () => {
  modal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const roomName = document.getElementById('room-name').value;
  const roundCount = parseInt(document.getElementById('round-count').value, 10);
  const password = document.getElementById('room-password').value;
  const mannerMode = document.getElementById('manner-mode').checked;
  const missionMode = document.getElementById('mission-mode').checked;

  console.log('방 생성:', { roomName, roundCount, password, mannerMode, missionMode });

  // TODO: 서버로 방 생성 요청
  modal.classList.add('hidden');
});

function showUserInfo(userId) {
  console.log('유저 정보 조회:', userId);
  // TODO: 서버에서 유저 정보 가져와서 보여주기
}

document.getElementById('close-game').addEventListener('click', () => {
  window.close();
});
