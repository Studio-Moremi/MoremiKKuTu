document.addEventListener("DOMContentLoaded", () => {
    const socket = io();

    document.querySelectorAll(".accept").forEach((button) => {
      button.addEventListener("click", () => {
        const inviteId = button.dataset.inviteId;
        socket.emit("accept-invite", { inviteId });
      });
    });
  
    document.querySelectorAll(".reject").forEach((button) => {
      button.addEventListener("click", () => {
        const inviteId = button.dataset.inviteId;
        socket.emit("reject-invite", { inviteId });
      });
    });

    const chatForm = document.querySelector("#chat-form");
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const message = document.querySelector("#chat-input").value;
      socket.emit("send-message", { message });
      document.querySelector("#chat-input").value = "";
    });

    socket.on("new-message", (data) => {
      const chatBox = document.querySelector("#chat-box");
      const messageElement = document.createElement("div");
      messageElement.className = "chat-message";
      messageElement.innerHTML = `<strong>${data.from}:</strong> ${data.text}`;
      chatBox.appendChild(messageElement);
      chatBox.scrollTop = chatBox.scrollHeight;
    });
  });
  