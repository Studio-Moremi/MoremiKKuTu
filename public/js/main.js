document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector("#btn-back");
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "/";
    });
  }

  const recommendationBtn = document.querySelector("#btn-recommendation");
  if (recommendationBtn) {
    recommendationBtn.addEventListener("click", () => {
      window.location.href = "/recommendation";
    });
  }

  const downloadBtn = document.querySelector("#btn-download");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      alert("공사중");
    });
  }
});

