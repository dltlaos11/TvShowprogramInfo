# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 데이터 패칭

> **지난 몇 년 동안 React 커뮤니티는 "데이터 가져오기 및 캐싱"이 실제로 "상태 관리"와는 다른 관심사라는** 것을 깨닫게 되었습니다.

- rtk query는 toolkit에서 사용가능
- 현재 내가 효율적인 데이터 fetching을하기 위해선 react-query를 사용해야 한다.
- redux-toolkit에서도 **createAsyncThunk**를 사용해서 데이터 패칭같은 비동기 작업을 수행 가능 그러나 rtk-query가 더 효율적인 서버 데이터 관리가 가능
    - 예시로 과거에 불러왔던 api라면 캐시에 저장되어 있으므로 캐시에 저장되어있던 값을 return해주고 아니라면 다시 mutation을 통해 캐시를 update한다
    1. **자동 코드 생성**: RTK Query는 API 엔드포인트에 대한 정의를 기반으로 액션 및 리듀서를 자동으로 생성합니다. 이렇게 하면 데이터 가져오기에 필요한 대부분의 코드를 자동으로 생성하므로 반복 작업을 줄일 수 있습니다.
    2. **상태 관리 및 캐싱**: RTK Query는 데이터를 자동으로 캐싱하고, 캐시를 업데이트하고 데이터를 가져오는 방법을 최적화합니다. 불필요한 네트워크 요청을 방지하고 성능을 향상시킵니다.
    3. **데이터 변환**: 가져온 데이터를 필요에 따라 변환하고 정리하는 기능을 제공합니다. 이를 통해 서버에서 가져온 데이터를 클라이언트에서 쉽게 가공할 수 있습니다.
    4. **타입 안정성**: RTK Query는 TypeScript와 함께 사용하기 적합하며, 타입을 안정하게 유지하도록 도와줍니다.
    5. **간결한 코드**: RTK Query를 사용하면 더 간결한 코드로 데이터 가져오기 작업을 처리할 수 있으며, 비동기 작업과 상태 관리를 효과적으로 결합할 수 있습니다.

물론 여기까지는 thunk나 saga 친구들도 비슷하게 처리하던 부분처럼 보입니다. React Query는 이 과정을 자동화하면서 DX(Developer Experience)를 극대화 했다는 점에서 커다란 차별점을 갖습니다.

React Query는 서버 상태를 관리하는 레이어 전체를 추상화 시켜 개발자가 관리하는 앱 내의 상태에서 서버 상태를 제외한 `UI 상태` 에만 집중하여 개발할 수 있도록 했습니다.

그렇다면 웬만한 경우에는 비동기 처리를 위한 thunk, saga 같은 미들웨어 라이브러리도 불필요 해지고, 동기적인 UI 상태만 관리할 거라면 redux 씩이나 필요 없어지는 연쇄 작용이 일어날 수 있는 것(그렇다고 Redux가 불필요해졌다는 것은 아닙니다)이죠.