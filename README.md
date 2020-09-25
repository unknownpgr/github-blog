# Github Blog

- 깃허브 블로그 링크 : https://unknownpgr.github.io/
- 깃허브 블로그 리포지토리 링크 : https://github.com/unknownpgr/unknownpgr.github.io

# 사용 방법

## 기본 설정

1. 깃허브 workflow 설정 : `.github/workflows/auto-update.yml`에서 MY_NAME, MY_EMAIL 수정
   - 추후 파일 하나에 전부 포함하게 하는 것 고려 중.
2. Secret 설정 : 깃허브 토큰 발행 받아서 secret으로 설정
   - SSH 안 쓰고 Token만으로 push 가능하게 하는 것, 힘들었다...엄청...
3. `username.github.io` 리포지토리에서 Slack webhook 주소를 SLAKC_KEY로 주면, 자동으로 슬랙 봇에게 메시지를 보낸다.

## 새 포스트 작성하기

/src/post 디렉토리에 새로운 폴더를 만들고, 그 안에서 yaml formatter가 있는 markdown 형식으로 글을 작성하면 된다. 아래는 마크다운 파일의 예시다.

```
---
title: This is title!
category: this_is_category.
---
# This is h1 title.
```

이것 역시 너무 불편하므로, 추후 GUI를 만들거나 적어도 posts 디렉토리를 root로 옮길 예정이다.

## 포스트 발행하기

로컬에서 작성한 포스트를 발행하려면, 이 리포지토리를 `master`에 push하면 된다. 그러면 GitHub action의 workflow가 자동으로 `blog.js`를 실행하여 포스트를 컴파일하고, 깃헙 블로그 `unknownpgr.github.io`에 푸시한다.

정리하자면, 포스트를 쓰고 발행하려면, 포스트를 작성한 후 커밋하고 마스터 브랜치에 푸시하면 된다.
귀찮다면, 윈도우에서는 `publish.bat`, 리눅스에서는 `publish.sh`를 실행하면 된다. 물론, 리눅스에서 실행할 때에는 chmod를 통하여 실행 권한을 부여받아야 한다.

## 알림

만약 `unknownpgr.github.io`리포지토리에 SLACK_KEY가 slack app webhook url로 등록돼있다면, 자동으로 슬랙에 글을 쓴다.

# 프로젝트 요약

개발자라면 멋진 깃허브 블로그가 필수라고 생각한다. 그래서 대충 만들어두고 버려두었던 깃허브 블로그를 완전히 새로 제작해보기로 하였다. 이 블로그는 다음과 같은 기준을 만족하도록 구현되었다.

- `React`를 공부중이므로, `React`와 `React-router`를 사용하여 SPA (Single Page Application)로 만든다.
- 그러나 포스트의 경우, 모든 포스트를 한 번에 불러오는 것이 아니라 동적으로 불러와야 한다.
- 디자인은 React-Bootstrap을 사용해서 구성하고 `custom.scss`를 사용하여 커스터마이징한다.
- 포스트를 쓰는 작업은 단순히 src/posts 디렉토리에 새로운 폴더를 만들고, 아무 이름의 yaml formatter가 첨부된 markdown 파일을 작성하는 것만으로 가능해야 한다.
- Github remote repository에 동기화하기 위하여 입력해야 하는 commit 등의 작업을 자동화하여, 아주 간단한 커맨드만으로 동작하도록 만들어야 한다.
- 추후 GUI로 쉽게 확장이 가능해야 한다.
- 현재 상수로 등록해놓은 내용들을 변수로 바꾸기 수월해야 한다.
- 운영체제나 포스트 작성 툴에 구애받아서는 안 된다.
- 유니코드를 지원해야 한다.

- Github action을 사용하여 자동 빌드를 한 번 해 보자.
  - 자동 빌드를 완성했다. 이제 자동으로 빌드가 이루어진 후 푸시를 한다.

# 개발 일지

## 2020 / 07 / 12

- 원래는 지킬과 같은 플랫폼을 먼저 만든 후, 깃허브 블로그를 만드려고 했었다. 그러나 React나 Bootstrap등을 공부해본 바, 그러한 라이브러리를 이용하면서 플랫폼까지 만드는 것은 상당히 어렵고 귀찮다는 것을 알게 되었다.
- 그래서 그냥 깃허브 블로그만을 만들려고 한다.
- 그렇다면, 스킨 관련된 기능은 전부 제거하고, 포스트 관련 기능만 구현하면 된다.

### Serverside 구성

- 기본적으로 React app으로 하고, SPA로 만들어보자.
- 개발을 위해서는, 그냥 기본으로 제공하는 start 스크립트를 사용한다.
- Browser routing을 구현하기 위해 `react-router-dom`을 사용한다.
- 디자인으로는 `react-bootstrap`을 사용한다. 추후 업데이트하던가 하자.

### 구현 방법

여기서도 막히는 것이, 어떻게 포스트와 그 목록을 적절히 구현하는가 하는 것이다.

- 일단 이전에 작성해놓은 스크립트를 사용하면 포스트의 목록을 다 가져올 수 있기는 하다.
- Browser routing을 하면, 심지어 적절한 HTML파일을 가져올 수도 있다.
  - 거의 다 왔는데...
- 그렇다면 라우터에서 posts라우터를 작성한다. 그리고 `post/:postID` 방식으로 포스트 파일 이름을 가져온다. 그리고 `postID.js`(혹은 jsx)파일을 require하여 렌더링한다.
- 물론, 이렇게 하면 아무 글을 읽을 때마다 모든 포스트를 로드하는 무서운 일이 벌어진다. 그러므로 React의 code splitting 기법을 사용하여 포스트를 로드하기로 한다.
  - Code splitting 기능을 사용하여
- 이렇게 하면, 최소한의 low-level코드만을 사용하고, 나머지는 IDE에서 깔끔하게 처리할 수 있다.
- 포스트 목록 등은 json파일로 구현될 텐데, 이 json파일을 어떻게 로드하는가도 하나의 문제다.
- 검색해본 바, `create-react-app`을 사용한 경우 `json-loader`가 포함되어있다고 한다. 그러므로 이를 사용해본다.
  - `json-loader`가 잘 작동하는 것을 확인했다.
- 이게 된다면, 거의 다 온 거다. 조금만 더 가면 된다.

## 2020 / 07 /13

### 상세

블로그를 만드려면 포스트나 여러 정보들을 불러와야 한다. 이걸 어떻게 구현할까?

#### 포스트 메타데이터

- 가장 먼저, 포스트의 목록이나 태그의 목록은 걱정할 일이 아니다. 왜냐하면 단순히 import를 해서 사용하면 되기 때문이다.
- 태그별 포스트도 딱히 분리할 필요가 없을 것 같다. 조사해본 바, 포스트 하나당 많아 봐야 500byte정도가 요구된다. 즉, 포스트를 매우 많이 올려서 1000개를 작성한다고 해도 500kbyte인데, 이정도가 되어야 고화질 이미지 한 장 분량이다.
  - 만약 블로그가 점점 커져서 감당할 수 없게 되면, 그때쯤에야 태그별 포스트를 구분하는 게 좋겠다.
- 그러므로 이미 만들어놓은 포스트 메타데이터 시스템은 그대로 이식하기로 한다

#### 포스트 렌더링

- 이건, Browser router에서 `posts/:postID` 형식의 path로 접근할 경우, `postID`에 해당하는 포스트를 렌더링하는 것으로 족하다. 그러려면 일단 포스트에 해당하는, import가능한 파일이 있어야 한다. 이는 md파일을 컴파일한 jsx파일이면 족하다.
- 그런데, 포스트 시스템에서 replace를 어떻게 구현할지가 문제다. 템플릿을 어떻게 구현하면 좋지?
  - 일단은 그냥 jsx파일을 생성하고, metadata도 가져오는 거로 해버리는 편이 제일 낫겠다.
- 위에서 언급한 모든 내용들을 간단히 구현하는 데에 성공했다. 신난다! 비동기 포스트 로드 및 코드 스플리팅을 동시에 구현해야 했는데, 이렇게 부드럽게 잘 될 줄은 몰랐다. 이제야 react의 사용 방법을 약간 알게 된 느낌이다.
  - 생각해보니 비동기 포스트 로드 및 코드 스플리팅은 적어도 React에서는 같은 말이었다. 비동기를 하게 되면 저절로 코드 스플리팅이 이뤄진다. 물론, `import(lib)`을 사용하지 않고 잘못 비동기 로드를 하면 코드상으로는 비동기로 보이지만 bundling하면 같은 js파일로 묶일 수도 있기는 하다.

이제는

1. 블로그에 글을 작성한 후
2. `src/blog.js`파일을 실행시키면 메타데이터와 jsx파일이 생성되고
3. `yarn build`로 빌드하면 블로그가 빌드된다.
4. build path에서 git push하여 원격 리포지토리에 올리는 것까지 하면 완료다.

이걸 어떻게 자동화를 잘 할 수 있을 것 같은데...

#### 디자인

이제 디자인을 어떻게 할 것인가가 문제다.

- 나는 넓고 깨끗한 화면이 좋으니까, 타이틀을 크게 넣자. 타이틀에는 `{ UnknownPgr }` 이정도 박아두면 좋겠다.
- 우측 상단에 깃허브 링크를 박아두는 것도 나쁘지 않다.
- 그리고 게시글은 깔끔하게 사각형으로 해야겠다. 최소 간격은 마진으로 주고, 레이아웃은 flex로 하는 게 좋겠다.

## 2020 / 07 / 14

### 사이드바 구현

- 이제 포스트 리스트를 깔끔하게 구현하였으니, 사이드바를 어떻게 구현할지가 문제다.
- 사이드바에는 깔끔하게 포스트 카테고리 목록만을 넣을 예정이다.
- 여러가지 시도를 해 봤다. `Nav`를 사용할까도 생각해보고...그런데 어떻게 하더라도 보기 좋은 디자인을 만들기가 어려웠다. 그래서 그냥 기본 리스트 `<ul><li></li></ul>`를 사용하기로 했다. 물론 내가 원하는 예쁜 디자인은 아니기는 한데, 마음에 안 든다 싶으면 나중에 개조하면 될 일이다.
- 사이드바를 구현했으니 이제는 사이드바를 누르면 나타날 카테고리별 포스트 목록을 구현해야 한다.
  - 이것을 따로 구현하는 건 UI재사용성을 극대화한 React와는 좀 맞지 않는 것 같아서, 그냥 메인 포스트 화면의 리스트를 가져다 쓰기로 했다.
  - 메인 포스트 리스트에 `filter`속성을 추가해서, `filter`가 없으면 모든 포스트를 보여주고, `filte`가 있을 경우 `filter===category`인 포스트만 보여주도록 설정했다.

### UI

- 또 어려웠던 부분 중 하나는, title과 footer 사이에서 main container가 빈 공간을 채우도록 만드는 것이었다.
  - `root`에 `flex` 속성을 주고, title과 footer 사이즈를 고정한 후에 main container에 `flex:1`을 주어 해결했다.
- 그리고 왜인지 모르겠지만, `html`에 `height : 100%`를 주고, `body`에 `min-height : 100%`를 주니 `body`가 내부 사이즈에 맞게 줄어들어버렸다.
  - `body`에 `min-height : 100%`대신 `min-height : 100vh`를 주어 해결했다.

### React

- 위에서 사이드바에서 버튼을 누르면 해당 카테고리가 볼드체가 되도록 하고 싶었다.
  - 그래서 최상위에 `useState`를 통해서 컨텍스트를 생성하고, 카테고리별 포스트 리스트 페이지의 render함수에서 `setCurrentCategory`를 호출하여 업데이트하려고 했다. 그런데 `category~~`를 렌더링하는 중 `App`을 렌더링할 수 없다고 경고가 떴다.
  - 하위 엘리먼트의 `render` 함수에서 상위 엘리먼트를 업데이트하면 안 된다는걸 알게 됐다.
  - 리액트의 컨텍스트에 대해 더 잘 알게 된 느낌이다.

## 2020 / 07 / 19

- 며칠간 바빠서 블로그 개발을 제대로 할 수 없었다. 오늘 마침 시간이 많이 나서, 각을 잡고 블로그 개발을 시작했다. 디자인도 좀 갈아엎고, `blog.js`도 고쳤다.
- 특히 `blog.js`의 경우, 기존의 복잡하고 멀리 돌아가던 코드를 간결하게 개조해서, 꼭 필요한 정보만 `meta.json`에 넣도록 수정했다.
- 원래는 깃허브 리포지토리 내에서, `build`디렉토리를 바로 github blog에 연결하려고 했다. 그런데 그게 좀 복잡하다. 그래서, 단순무식하게 그냥 `build`를 통째로 외부 디렉토리로 복사한 후, 외부 디렉토리에서 커밋을 하도록 만들어버렸다. 사실 나도 이렇게까지 잘 작동할 줄은 몰랐는데, 너무 잘 작동해서 좀 신기하다.
- 포스트 뷰어 부분도 약간 손봤다.

## 2020 / 02 / 20

- 다음과 같은 workflow를 구성한다.

  1. Master branch에 push가 될 경우
  2. 당연히 checkout을 수행하고
  3. 초기화를 한 후
  4. blog.js를 build 없이 수행하여 업데이트한다.
  5. 업데이트한 내용을 build한 후
  6. 새로운 디렉토리를 생성한 후
  7. git init 및 pull을 수행하고
  8. build 디렉토리를 새로운 디렉토리로 복사한 후
  9. commit 후 push한다.

이렇게 할 경우, 로컬에서는 jsx파일을 생성할 일이 없다. 사실 posts를 다른 repo로 뺄까도 생각해봤는데, 그러면 너무 복잡해진다.

어쨌든, 결국 해냈다. ssh를 사용하기로 하고, ssh를 github secrets에 등록, ssh id_rsa 및 id_rsa.pub를 생성한 후, chmod 600으로 권한 설정, 그리고 나서 git 설정 진행.

어쨌든 중요한 건 다음과 같다.

1. 보안이 미세하게 향상되었다. 개발 리포지토리를 private으로 하면, 난독화를 진행했을 때 원본 소스가 보인다거나 할 일이 없다.
2. 개발이 깔끔하고, 나름 범용적이다. 즉, 내가 개발한 블로그 양식을 누구라도 가져다 쓸 수가 있다. 물론 포스트가 좀 겹치기는 한다만.
3. 많이 부족하기는 하나, CI를 공부해봤다. 이 리포지토리는 개발용으로만 사용하고, 빌드는 GitHub action이 알아서 해 준다. 잘만 하면 추후 Slack 등 알림 전송까지 가능하지 않을까 싶다.

- `utteranc.es`를 사용하여 댓글을 구현했다.
- 추가적으로, 디자인을 굉장히 깔끔하게 개선하였으며, 반응형 웹도 완벽하게 구현했다. 너무 기분좋다! 😀😁
- 그러고보니 위에서 제시한 몇 가지 문제가 알아서 해결됐다. 예를 들어, 페이지 제작 시 React를 사용하였으므로 template replace를 구현할 필요가 없다.

이제 남은 부분은 URL 접근이다. 깃헙에서 SPA를 제대로 처리할 수 없기 때문에, 임의의 URL로 접근하면 에러가 발생한다. 그러므로 404 page를 따로 제작, 404 page에서 SPA index로 redirection하고, SPA index에서는 쿼리를 확인하여 만약 존재한다면 SPA router를 사용하도록 하는 방식으로 구동시켜야 한다. 살짝 헷갈리는 부분은, 어느 타이밍에 SPA 라우터를 구동시키냐는 점이다. React가 실행되기 전에 해도 되는가?

## 2020 / 07 /21

- 포스트 작성을 하고 커밋하는 스크립트를 개선했고, Slack과 연동하여 푸시 알림을 만드는 것도 성공했다.
- 이제 실패 시 푸시 알림이 오도록 하는 것과, 어제의 임의 URL접근만 해결하면 된다.
- 마음이 편안하다.

* 뒷통수를 한 번 더 세게 때린 게, 이모지였다. 이거, React에서 그냥 렌더링하려니 경고가 뜬다. 근데 문제는 GitHub Action에서는 경고가 나면 그냥 에러로 간주하고, 꺼버린다는 사실이다...
* 여차저차하여, `<Emoji/>` UI를 새로 만들고, html까지 다 생성한 후 html에서 replace해버리기로 했다. 난감하더라.
* 이 글 쓴 사람에게 박수를... 👉 https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7

- 아 맞다. 그리고 코드, 깃허브에서 제공하는 걸로 바꾸고.

- 깃허브에서 날짜를 빼먹으면 자동으로 현재 날짜로 채우도록 만들었다.
- 추가로, 커밋 메시지에 ci-skip가 들어가면 workflow를 돌리지 않는다.

- 문제가 하나 더 생겼군. 이미지가 말을 안 듣는다.
- 얘네를 어쩌면 좋지...

## 2020 / 07 / 24

- 마크다운 컴파일러를 만드는 게 차라리 빠르겠다.
- 그런데 정식으로 지원되지 않는 분법은 어떻게 추가하면 좋지.
- Markdown-it을 한 번 더 알아봐야겠다.
- 생각해보니까, markdown -> HTML -> jsx가 훨씬 편리하다. 이 생각을 왜 못했지?
  - 찾아보니 markdown -> jsx솔루션이 없는 것은 아니다. 그러나 이렇게 하면 옵션이 많이 줄어든다.
  - 왜냐하면 markdown -> HTML은 좋은 라이브러리가 많이 있지만, 상대적으로 markdown -> jsx는 얼마 없기 때문이다.
  - 추가적으로, markdown에서 바로 수정을 하기는 힘들지만, html은 md에 비하여 정규화된(?)언어이므로 수정이 쉬운 장점이 있다.

결국 markdown을 HTML으로 변환하고, 이후 다시 jsx로 변환하는 방법을 사용하여 성공했다. 이전에 이모지를 넣으면 warning 뜨는 문제는, 동일한 방법을 html단에서 적용하여 해결했으며, 이미지 로드가 안 되는 문제는 jsx단에서 `src={require("src.jpg")}`식으로 바꾸어 해결했다.

- 추가적으로 이미지 크기가 엄청 커지는 오류가 발생하였으나, scss 조절해서 금방 해결했다.

## 2020 / 08 / 01

- 404 발생 시 루트로 리다이렉트, 루트에서 다시 원하는 페이지로 리다이렉트하도록 구현.
- 이는 GitHub page에서 SPA자동 리다이렉트를 구현해주지 않기 때문.

## 2020 / 08 / 07

- Sitemap구성 중, Github에서 SPA를 지원하지 않아 404로 redirect하는 과정에서 검색엔진이 제대로 검색하지 못함을 발견함.
- 새로 구성 시작.
- `refactoring` 브랜치 새로 생성
- 일단 가장 간단하게, post에 해당하는 html을 전부 생성하는 방향으로 가 본다.
- 생성 완료.

## 2020 / 08 / 09

- 썸네일 생성
- 기존의 블로그 빌드 과정이 너무 복잡하여, 오브젝트의 타입이 매우 헷갈렸다. 그래서 타입스크립트를 도입하여 명시적으로 타입을 지정하도록 바꿨다.

## 2020 / 08 / 11

- 타입스크립트 브랜치 merge.

## 2020 / 09 / 21

- 생각할수록 JSX 컴파일은 너무 비효율적인 것 같다. 방식을 바꿀 필요가 있다.
- 특히 수학 식을 렌더링하거나, 스크립트, CSS삽입 등 다양한 것들을 시도해보고 싶은데, 그에 비해 JSX 렌더링은 너무 제한적인 것만 허용한다.
- 일단 서버사이드 프로세스를 최대한 줄이기 위해서 마크다운을 프론트에서 처리해보자.
  - 실수. 마크다운은 백엔드에서 처리해야만 한다. 왜냐하면 포스트 리스트나, 텍스트 보여주기, 이미지 처리 등이 백엔드에서 미리 이뤄져야 하기 때문이다.
  - 그것까지 프론트에서 하기에는 너무 느릴 것이다.

## 2020 / 09 / 22

- 원래 JSX기반이던 포스트 구조를 HTML기반으로 바꾸었다.
- 빌드 속도도 상당히 빨라졌을 것이고, 코드 양도 훨씬 줄어들었다.
- 뿐만 아니라 수학 식 렌더링, HTML사용 등이 전부 자유로워졌다. 이제는 심지어 header에 html을 집어넣을 수도 있다.

## 2020 / 09 / 24

- `markdown-it` 버전 수정을 위해 라이브러리를 통째로 떼 왔다.
- 라이센스 위반은 아닌지 걱정된다.

## 2020 / 09 / 25

- 블로그 빌드는 한 번만 하고, 포스트 업데이트만 이뤄지도록 수정.
- 블로그 빌드 테스트
