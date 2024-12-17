document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    if (response.ok) {
      alert('회원가입 성공! 로그인해주세요.');
      window.location.href = '/login';
    } else {
      const data = await response.json();
      alert(data.error || '회원가입 오류');
    }
  });
  