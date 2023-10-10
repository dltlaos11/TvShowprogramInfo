import './App.css'
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
  prev: string | null;
}

export interface Character {
  readonly id: number;
  readonly name: string;
  readonly status: string;
  readonly species: string;
  readonly type: string;
  readonly gender: string;
  readonly episode : Episode[];
  readonly image: string;
}
export type CharacterArray = Character[];


export interface Episode{
  readonly episode: string;
}

function App() {

  return (
    <>
    <Routes>
      {/* <Route path='/' element={<App/>} /> */}
      <Route path="/character" element={<CharacterListContainer />} />
      <Route path="/character/:id" element={<CharacterDetailContainer />} />
      {/* <Route path="/new-quote" element={<NewQuote />} /> */}
      <Route path="*" element={<Navigate to="/character" />} />
    </Routes>
    hi
    </>
  )
}

export default App
