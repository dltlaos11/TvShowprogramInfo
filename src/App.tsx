import "./App.css";
import EpisodeContainer from "./containers/EpisodeContainer";
import Episode from "./containers/EpisodeContainer";
import Main from "./components/Main";
import CharacterDetailContainer from "./containers/CharacterDetailContainer";
import CharacterListContainer from "./containers/CharacterListContainer";
import { Routes, Route, Navigate } from "react-router-dom";
import BookMark from "./components/BookMark";
import DataFetcher from "./components/DataFetcher";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface AllCharacter {
  readonly info: Info;
  readonly results: CharacterArray;
}

export interface Info {
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
  readonly episode: string[];
  readonly image: string;
}

export type CharacterArray = Character[];
export type EpisodeArray = Episode[];

export interface Episode {
  // readonly episode: string[];
  readonly episode: string[] | string;
  readonly name: string;
  readonly air_date: string;
}

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* <Route path='/' element={<App/>} /> */}
          {/* <Route  path="/" element={<MainBTNav />}> */}
          <Route path="/" element={<Main />}>
            <Route path="/episode" element={<EpisodeContainer />} />
            <Route path="/character" element={<CharacterListContainer />} />
            <Route path="/datafetcher" element={<DataFetcher />} />
            <Route
              path="/character/:id"
              element={<CharacterDetailContainer />}
            />
            {/* <Route path="/new-quote" element={<NewQuote />} /> */}

            <Route path="*" element={<Navigate to="/character" />} />
          </Route>
          <Route path="/bookmark" element={<BookMark />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
