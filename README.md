<<<<<<< HEAD
**프로젝트 제출 방법**

1. 브랜치 네이밍 규칙에 따라 새로운 브랜치를 생성합니다.

- 브랜치 이름 형식은 project1/팀명/이름입니다.
- eg.g project2/team1/오스틴

2. 하위에 프로젝트 파일을 생성하고 진행합니다.
3. 완료한 파일을 commit, push합니다.
4. 해당 브랜치에서 Pull Request를 생성합니다.
5. PR제목은 프로젝트1*Vido Editor*팀명\_이름으로 통일해주세요.

- eg.g project1/Vido Editor/team1/오스틴

6. label을 적극적으로 활용해주세요.

---

**main에 push하지 않도록 주의해 주세요**

훅 스크립트를 사용하여 로컬 환경에서 main 브랜치로의 직접 푸시를 방지할 수 있습니다.

`.git/hooks/pre-push` 파일을 생성후 아래 내용을 작성합니다.

```
#!/bin/sh

protected_branch="main"
current_branch=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')

if [ "$current_branch" = "$protected_branch" ]; then
  echo "Direct push to $protected_branch branch is not allowed. Please use a pull request."
  exit 1
fi
```

아래 명령어로 실행 권한을 부여합니다.

```
chmod +x .git/hooks/pre-push
```
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
<<<<<<< HEAD
>>>>>>> a22614d6 (:tada: vite project start)
=======

<br>

## 프로젝트 목표

> **React와 Bootstrap을 활용하여 비디오 에디터 웹 만들기**

- JSX, React를 이용한 방식에 익숙해지기
- bootstrap, ffmpeg, video-react 등의 라이브러리 활용에 익숙해지기
- useState, useEffect 등의 Hook 쓰는 방법 익히기
- 컴포넌트 단위로 분리하여 효율적으로 관리해보기!

### ❗️ 필수 기능

- [x] 비디오 업로드 : 파일 업로드 & 재선택
- [x] 비디오 플레이어 : 재생, 중지
- [x] 비디오 편집 : 타임라인 자르기
- [ ] 비디오 다운로드 : 편집한 비디오 다운로드

### ✨ 추가 기능

- [x] styled-component로 css 분리
- [ ] UI : 모바일 반응형 & 다크모드
- [ ] 플레이어 : 비디오 재생 시간 표시
- [ ] 편집 기능 : 필터, 조절
- [ ] 업로드/다운로드 시 progress bar 표시
- [ ] 컴포넌트 분리 및 리팩토링

<br>

## 사용한 라이브러리

- 빌드 및 개발 도구
  - Vite
  - React
- UI 및 스타일링
  - [react-bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
  - [styled-components](https://styled-components.com/docs/basics#getting-started)
- 비디오 처리 관련
  - [FFmpeg](https://ffmpegwasm.netlify.app/docs/overview/)
  - [video-react](https://video-react.js.org/)
- 배포
  - vercel
>>>>>>> e49d4be8 (:memo: docs: Update README)
