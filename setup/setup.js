const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function installDependencies() {
  console.log('패키지를 설치하는 중...');
  execSync('npm install', { stdio: 'inherit' });
}

function createRunBat() {
  const batFilePath = path.join(__dirname, 'run.bat');
  const batContent = `
@echo off
npm start
`;

  fs.writeFileSync(batFilePath, batContent);
  console.log('run.bat 파일이 생성되었습니다.');
}

function setup() {
  installDependencies();
  createRunBat();
  console.log('설치가 완료되었습니다!');
}

setup();
