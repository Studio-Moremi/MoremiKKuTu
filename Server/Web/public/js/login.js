document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });
  
    if (response.ok) {
      window.location.href = 'http://localhost:3000';
    } else {
      const data = await response.json();
      alert(data.error || '로그인 오류');
    }
  });
  