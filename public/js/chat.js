document.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatBox = document.getElementById("chat-box");

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageContent = chatInput.value.trim();
    if (!messageContent) return;

    const userId = document.getElementById("user-id").dataset.userId;

    sendMessageToServer({
      userId,
      content: messageContent,
    });

    chatInput.value = "";
  });

  function addChatMessage({ userId, nickname, content }) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");

    const nicknameElement = document.createElement("span");
    nicknameElement.classList.add("chat-nickname");
    nicknameElement.textContent = `${nickname}:`;
    nicknameElement.dataset.id = userId;

    const contentElement = document.createElement("span");
    contentElement.classList.add("chat-content");
    contentElement.textContent = content;

    messageElement.appendChild(nicknameElement);
    messageElement.appendChild(contentElement);
    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  chatBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("chat-nickname")) {
      const userId = e.target.dataset.id;
      fetch(`/api/user/${userId}`)
        .then((res) => res.json())
        .then((userData) => {
          const userInfoWindow = window.open("", "_blank", "width=400,height=300");
          userInfoWindow.document.write(`
            <html>
              <head>
                <title>${userData.nickname}의 정보</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                  }
                  h1 {
                    text-align: center;
                  }
                  p {
                    margin: 10px 0;
                  }
                </style>
              </head>
              <body>
                <h1>${userData.nickname}</h1>
                <p>전적: ${userData.matches_played}전 ${userData.matches_won}승 ${userData.matches_lost}패</p>
                <p>마일리지: ${userData.mileage}</p>
                <button onclick="window.close()">닫기</button>
              </body>
            </html>
          `);
        })
        .catch((err) => console.error("유저 정보 불러오기 실패:", err));
    }
  });

  function sendMessageToServer(message) {
    console.log("메시지 전송:", message);

    addChatMessage({
      userId: message.userId,
      nickname: "You",
      content: message.content,
    });
  }
});
