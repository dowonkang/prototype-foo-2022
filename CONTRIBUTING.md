# 시안 작업 가이드

각 시안 타입은 [NPM 워크스페이스](https://docs.npmjs.com/cli/v8/using-npm/workspaces)로 생성하여 작업합니다.

## 저장소 생성하기

- [이 저장소를 템플릿으로 사용하여 저장소를 생성](https://github.com/cttd/template-prototype/generate)합니다.
- 저장소 이름은 아래 형식으로 년도까지 넣어주세요.
  - 제안 시안: `proposal-${project-name}-${YYYY}` (예: `proposal-sivillage-renewal-2020`)
  - 그 외의 시안: `prototype-${project-name}-${YYYY}` (예: `prototype-qoo10-fashion-2021`)

## 타입 생성하기

- 타입 프리픽스는 `temp-`를 사용하고 모두 소문자로 생성합니다.
- 시안 작업이 진행되면서 최초 A안이 최종 C안이 되는 식으로 여러번 변경될 수 있습니다.
- 타입 확정 후 프리픽스 없이 확정된 타입명으로 변경합니다. (예: `types/temp-b` => `types/c`)
  - 루트 디렉토리의 [package.json](./package.json) 파일 내 `workspaces` 필드도 동일하게 변경합니다.

```sh
npm init --yes --workspace types/temp-a
# or
npm init -y -w types/temp-a
```

Vue.js, Vite, React 등과 같이 `npm init` 명령으로 환경 생성이 가능한 경우 아래와 같이 워크스페이스 생성 시 환경 생성이 가능합니다.

생성된 워크스페이스 디렉토리에서 환경 생성기 명령이 실행되므로 명령 마지막의 `.`은 필수입니다.

[Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

```sh
npm init -w types/temp-b vite@latest .
```

[Vue.js](https://vuejs.org/guide/quick-start.html#with-build-tools)

```sh
npm init -w types/temp-c vue@latest .
```

[React](https://create-react-app.dev/docs/getting-started#npm)

```sh
npm init -w types/temp-d react-app .
```

## 작업 환경

각 타입 내 환경은 작업자 임의로 구성하면 됩니다. 다만 아래 내용은 반드시 지켜주시기 바랍니다.

- 노드 버전 파일을 생성해둡니다.
  - `node --version > .node-version`
  - 프로젝트 루트의 `.node-version`과 동일하다면 생략해도 무방합니다.
- 빌드된 파일들은 `./dist/` 디렉토리에 생성합니다.
- 빌드된 파일 내 리소스(이미지, js, css 파일 등) 참조 경로는 상대경로가 되도록 세팅합니다.
- `clean`, `build` NPM 스크립트는 필수로 추가합니다.

## 시안 리뷰 후 작업

- GitHub release를 생성해주세요.
  - 시안 리뷰 후 클라이언트 요청으로 추가 디벨롭 작업이 발생하는 경우가 있습니다.
  - 디벨롭 전 버전 접근이 가능하도록 릴리즈를 생성해두세요.
- README 파일에 시나리오를 작성해주세요.
  - 새로운 시안 작업을 할 때 기존 시안을 참고하는 경우가 많습니다.
  - 특정 영역 클릭 시 다른 화면으로 넘어가거나 UI 요소가 등장하는 등의 인터렉션 시나리오 위주로 작성하면 됩니다.
  - 스크린샷도 추가해주시면 더 도움이 많이 됩니다.
