import './App.css'
import Episode from './components/Episode';
import Main from './components/Main';
import MainBTNav from './components/MainBTNav';
import CharacterDetailContainer from './containers/CharacterDetailContainer';
import CharacterListContainer from './containers/CharacterListContainer';
import { Routes, Route, Navigate } from 'react-router-dom';

export interface AllCharacter {
  readonly info: Info;
  readonly results: CharacterArray
}

export interface Info{
  next: string;
  pages: number;
  prev: string;
}

export interface Character {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly type: string;
  readonly gender: string;
  readonly episode : string[];
  readonly image: string;
}

export type CharacterArray = Character[];


export interface Episode {
  readonly episode: string[];
}

function App() {

  return (
    <>
    <Routes>
      {/* <Route path='/' element={<App/>} /> */}
      {/* <Route  path="/" element={<MainBTNav />}> */}
      <Route path="/" element={<Main />} >
      <Route path="/episode" element={<Episode />} />
      <Route path="/character" element={<CharacterListContainer />} />
      <Route path="/character/:id" element={<CharacterDetailContainer />} />
      {/* <Route path="/new-quote" element={<NewQuote />} /> */}
      <Route path="*" element={<Navigate to="/character" />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
