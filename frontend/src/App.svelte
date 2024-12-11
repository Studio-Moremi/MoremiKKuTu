<script>
    let nickname = "";
    let loading = false;
    let assetsLoaded = 0;
    const totalAssets = 10; // Example total assets count
  
    function startGame() {
      loading = true;
  
      const interval = setInterval(() => {
        assetsLoaded++;
        if (assetsLoaded >= totalAssets) {
          clearInterval(interval);
          alert("게임을 시작합니다!");
        }
      }, 500);
    }
  
    function submitNickname() {
      if (!nickname.trim()) {
        alert("닉네임을 입력해주세요!");
        return;
      }
      alert(`닉네임 "${nickname}" 등록 완료!`);
    }
  </script>
  
  <style>
    .button {
      background-color: #28a745;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
  
    .button:hover {
      background-color: #218838;
    }
  
    .loading {
      margin: 20px 0;
      font-size: 18px;
    }
  </style>
  
  <main>
    <h1>게임 메인 페이지</h1>
  
    {#if !loading}
      <button class="button" on:click={startGame}>게임 시작</button>
    {:else if assetsLoaded < totalAssets}
      <div class="loading">
        {assetsLoaded}개의 애셋 중 {totalAssets}개 로딩 중...
      </div>
    {:else}
      <div>
        <p>앗! 새로 오신 이용자네요! 먼저 닉네임을 정해주세요!</p>
        <small>특수문자와 비속어 사용이 불가합니다.</small>
        <input type="text" bind:value={nickname} placeholder="닉네임 입력" />
        <button class="button" on:click={submitNickname}>결정</button>
      </div>
    {/if}
  </main>
  