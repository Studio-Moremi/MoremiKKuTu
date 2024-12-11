### made
- made by Studio Moremi(biduduki(cookedas1), dakkanasi(theseeduse))
- License is MIT.
 - help by DalDalso

# 소개
**모레미끄투**는 간단하게 끝말잇기를 하는 게임입니다.
아래는 모레미끄투를 설치하는 방법을 나타내었습니다.

## 설치 방법 (윈도우 기준)
1. 먼저 [여기서](https://nodejs.org) nodejs 버전 20을 다운로드 합니다.
2. 그러고 root/server-setup.bat을 실행합니다.
3. 그 후 run.bat를 실행합니다.

### 도메인 설정 방법
1. 원하는 도메인 공급업체에서 도메인을 구매합니다.
2. IP(A)를 자신의 [ip](https://ip.pe.kr)을 입력합니다.
3. 인터넷 공급업체에서 포트포워딩을 아래의 포트를 입력하며 설정합니다.
 - 8080, 80, 443, 3000

### SSL 설정 방법
- 먼저 도메인을 세팅하셔야 합니다.
1. 원하는 인증서 공급업체에서 인증서를 내려받습니다.
2. ssl 폴더에 인증서를 저장합니다.
3. ssl.json에서 SSL과 IsCA를 false에서 true로 변경합니다.
4. 그리고 cert, ca, privatekey에 인증서 경로를 입력합니다.

#### 라이선스
이 모레미끄투는 스튜디오 모레미가 처음부터 끝까지 자체 설계했습니다.
tailwindcss 사용으로 라이선스가 MIT입니다.
문의: op@kkutu.store