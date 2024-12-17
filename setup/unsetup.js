const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function uninstallDependencies() {
  console.log('패키지를 삭제하는 중...');
  execSync('npm uninstall', { stdio: 'inherit' });
}

function deleteRunBat() {
  const batFilePath = path.join(__dirname, 'run.bat');
  if (fs.existsSync(batFilePath)) {
    fs.unlinkSync(batFilePath);
    console.log('run.bat 파일이 삭제되었습니다.');
  } else {
    console.log('run.bat 파일이 존재하지 않습니다.');
  }
}

function unsetup() {
  uninstallDependencies();
  deleteRunBat();
  console.log('설치가 해제되었습니다!');
}

unsetup();
