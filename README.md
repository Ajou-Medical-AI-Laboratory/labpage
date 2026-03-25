# Ajou Medical AI Laboratory Website Handover Guide

이 문서는 Ajou Medical AI Laboratory 홈페이지를 다음 담당자가 계속 관리할 수 있도록 만든 인수인계용 안내서입니다.
이 사이트는 별도의 빌드 도구가 없는 정적 HTML/CSS/JavaScript 구조입니다.

## 1. 기본 구조

이 사이트는 아래 파일들로 구성됩니다.

- `index.html`: 메인 페이지
- `research.html`: 연구 분야 소개 페이지
- `project.html`: 프로젝트 페이지
- `publications.html`: 논문 및 출판물 페이지
- `team.html`: 연구실 구성원 페이지
- `joinus.html`: 지원 및 연락 페이지
- `news.html`: 뉴스 페이지
- `style.css`: 전체 사이트 스타일
- `script.js`: 공통 헤더, 공통 푸터, 메뉴(active), 스크롤 애니메이션 처리
- `images/`: 사이트에서 사용하는 이미지 폴더

핵심 포인트:

- 대부분 페이지는 공통 헤더와 푸터를 `script.js`에서 생성합니다.
- 단, `index.html`의 상단 메뉴는 HTML 안에 직접 작성되어 있습니다.
- 따라서 메뉴를 추가하거나 이름을 바꾸면 `script.js`와 `index.html` 둘 다 확인해야 합니다.

## 2. 수정 전 꼭 알아둘 점

이 사이트는 로컬 파일을 브라우저에서 직접 여는 방식(`file:///...`)으로 확인하면 일부 기능이 제대로 보이지 않을 수 있습니다.
특히 YouTube 임베드 영상은 `오류 153`이 발생할 수 있습니다.

반드시 로컬 서버로 확인하세요.

예시:

```bash
cd /mnt/c/Users/p/Desktop/labpage
python3 -m http.server 8000
```

브라우저에서 아래 주소로 확인:

```text
http://localhost:8000
```

프로젝트 페이지 직접 확인:

```text
http://localhost:8000/project.html
```

## 3. 페이지별 수정 방법

### 3-1. 메인 페이지

파일:

- `index.html`

주로 수정하는 항목:

- 메인 소개 문구
- Research Programs 카드 제목/설명/이미지
- Mission, Impact, News 영역

주의:

- `index.html` 상단 메뉴는 직접 HTML에 적혀 있습니다.
- 메뉴 이름을 수정하거나 새 메뉴를 넣으면 `script.js`도 같이 수정해야 합니다.

### 3-2. Research 페이지

파일:

- `research.html`

주로 수정하는 항목:

- Research Areas 설명
- Collaboration 문구
- Research Grants 목록

### 3-3. Project 페이지

파일:

- `project.html`

현재 구조:

- `NIA 학습용 데이터셋 구축사업`: 영상 3개
- `스마트병원`: 영상 1개

수정 가능한 항목:

- 프로젝트 제목
- 프로젝트 설명 문단
- 태그 문구
- 유튜브 영상 제목
- 유튜브 링크

유튜브 링크 수정 시 매우 중요:

- `<a href="...">`에는 일반 유튜브 링크를 넣어도 됩니다.
- `<iframe src="...">`에는 반드시 `embed` 형식 링크를 넣어야 합니다.

예시:

일반 링크:

```text
https://www.youtube.com/watch?v=VIDEO_ID
```

임베드 링크:

```text
https://www.youtube.com/embed/VIDEO_ID
```

시간 지정이 있을 경우:

```text
https://www.youtube.com/watch?v=VIDEO_ID&t=1s
```

는 아래처럼 바꾸면 됩니다.

```text
https://www.youtube.com/embed/VIDEO_ID?start=1
```

잘못 넣기 쉬운 예:

- `iframe src`에 `watch?v=` 링크를 그대로 넣는 경우
- `youtu.be/...` 링크를 그대로 넣는 경우

이 경우 영상이 안 보일 수 있습니다.

### 3-4. Publications 페이지

파일:

- `publications.html`

주로 수정하는 항목:

- 논문 제목
- 저자
- 학술지/학회 정보
- 연도
- 링크

### 3-5. Team 페이지

파일:

- `team.html`
- `images/team-image/`

주로 수정하는 항목:

- 교수/연구원/학생 이름
- 직함 및 설명
- 이메일
- 프로필 이미지

이미지를 바꿀 경우:

- 새 이미지를 `images/team-image/` 안에 넣고
- `team.html`에서 해당 `img src` 경로를 수정합니다.

### 3-6. Join Us 페이지

파일:

- `joinus.html`

주로 수정하는 항목:

- 모집 문구
- 지원 방법
- 위치/연락처
- 지도 또는 안내 정보

### 3-7. News 페이지

파일:

- `news.html`

주로 수정하는 항목:

- 날짜
- 뉴스 제목
- 공지 내용

## 4. 메뉴 수정 방법

메뉴는 두 군데를 확인해야 합니다.

### 공통 페이지 메뉴

파일:

- `script.js`

`navItems` 배열에 메뉴가 들어 있습니다.

예:

```js
const navItems = [
  { label: "Home", href: "index.html" },
  { label: "Research", href: "research.html" },
  { label: "Project", href: "project.html" }
];
```

여기에 항목을 추가하면 공통 헤더를 사용하는 페이지들에 반영됩니다.

### 메인 페이지 메뉴

파일:

- `index.html`

메인 페이지는 상단 메뉴가 HTML 안에 직접 작성되어 있으므로, `index.html`의 `<nav class="main-nav">`도 같이 수정해야 합니다.

## 5. 스타일 수정 방법

파일:

- `style.css`

기본 원칙:

- 전체 색상, 여백, 카드 디자인, 폰트 크기, 반응형 설정은 대부분 `style.css`에서 조정합니다.
- 특정 페이지 레이아웃을 수정할 때는 관련 클래스 이름을 검색해서 수정하면 됩니다.

예시:

- 메인 연구 카드: `.program-grid`, `.program-card`, `.program-thumb`
- 프로젝트 페이지 영상 카드: `.project-list`, `.project-card`, `.project-media`, `.project-video-card`
- 팀 페이지 카드: `.team-card`, `.team-photo`

주의:

- 클래스 하나를 바꾸면 여러 페이지에 동시에 영향이 갈 수 있습니다.
- 수정 후에는 반드시 관련 페이지 전체를 다시 확인하세요.

## 6. 이미지와 영상 교체 방법

### 이미지 교체

1. 새 이미지를 적절한 폴더에 저장합니다.
2. HTML 파일에서 `img src="..."` 경로를 수정합니다.
3. 파일명에 공백이 있으면 관리가 불편할 수 있으므로 가능하면 영문 파일명을 권장합니다.

예:

```html
<img src="images/team-image/new-member.jpg" alt="New member">
```

### 유튜브 영상 교체

1. 일반 유튜브 링크에서 영상 ID를 확인합니다.
2. `iframe src`는 `https://www.youtube.com/embed/VIDEO_ID` 형식으로 넣습니다.
3. 외부 링크용 `<a href>`는 일반 유튜브 링크를 넣습니다.

예:

```html
<iframe src="https://www.youtube.com/embed/aErJphh9jjI"></iframe>
<a href="https://www.youtube.com/watch?v=aErJphh9jjI">Video link</a>
```

## 7. 새 페이지 추가 방법

새 카테고리나 새 페이지를 만들려면 아래 순서로 진행하면 됩니다.

1. 기존 페이지 중 가장 비슷한 파일을 복사해 새 HTML 파일을 만듭니다.
2. 페이지 제목과 본문을 수정합니다.
3. `script.js`의 `navItems`에 새 메뉴를 추가합니다.
4. 필요하면 `index.html` 상단 메뉴도 같이 수정합니다.
5. 필요한 스타일을 `style.css`에 추가합니다.
6. 로컬 서버에서 실제로 열어 확인합니다.

## 8. 운영 시 추천 작업 방식

추천 순서:

1. 수정 전에 원본 파일 백업 또는 Git 커밋
2. 텍스트 수정
3. 이미지/영상 링크 수정
4. 로컬 서버에서 확인
5. 모바일 화면 폭도 확인
6. 최종 반영

가능하면 Git을 사용해 변경 이력을 남기세요.

예:

```bash
git status
git add .
git commit -m "Update project page and news content"
```

## 9. 자주 발생하는 문제

### 유튜브 영상이 안 보이는 경우

원인:

- `iframe src`에 `watch?v=` 링크를 넣음
- `file:///...`로 페이지를 직접 열었음

해결:

- `embed` 링크로 변경
- `python3 -m http.server 8000`으로 로컬 서버 실행 후 확인

### 메뉴가 어떤 페이지에서는 보이고 어떤 페이지에서는 안 맞는 경우

원인:

- `script.js`만 수정하고 `index.html`은 수정하지 않았거나 반대의 경우

해결:

- `script.js`와 `index.html` 둘 다 확인

### 이미지가 안 보이는 경우

원인:

- 파일 경로 오타
- 실제 이미지 파일이 폴더 안에 없음

해결:

- 파일명과 경로를 다시 확인

## 10. 최종 확인 체크리스트

수정 후 아래 항목을 확인하세요.

- 메인 페이지가 정상적으로 열리는가
- 메뉴 링크가 모두 정상 동작하는가
- 수정한 텍스트가 올바르게 반영되었는가
- 이미지가 깨지지 않는가
- 유튜브 영상이 정상 재생되는가
- 모바일 폭에서도 레이아웃이 크게 깨지지 않는가

## 11. 담당자 메모용

필요하면 아래 항목을 직접 추가해서 사용하세요.

- 관리자 연락처
- 도메인 관리 정보
- GitHub 저장소 주소
- 배포 방식
- 정기 업데이트 주기
- 자주 수정하는 자료 위치

현재 이 사이트는 구조가 단순해서 HTML 파일을 직접 수정하는 방식으로 운영 가능합니다.
다만 페이지 수가 더 많아지면 공통 컴포넌트 분리나 템플릿화가 필요할 수 있습니다.
