import { useState } from "react";

import { DataFetcherDetail } from "./DataFetcherDetail";
import { useQuery } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"
const maxPostPage = 10;

async function fetchPosts() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
  );
  return response.json();
}

const DataFetcher = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const {data, isError,error , isLoading} = useQuery("posts", fetchPosts, {staleTime: 2000}) as {
    data: any; // Specify the type for 'data'
    isError: boolean;
    error: Error | null; // Specify the type for 'error'
    isLoading: boolean;
  };
  // useQuery의 인수
  // 쿼리 키: 쿼리 이름을 의미
  // 2번째로는 쿼리 함수를 사용, 쿼리에 대한 데이터를 가져오는 방법을 의미
  // 이 함수는 데이터를 가져오는 비동기 함수
  // 3번째 staleTime
  if(isLoading) return <h3>Loading...</h3>
  if (isError) return (<>
  <h3>ERROR is OCCUR</h3>
  <p>{error?.toString()}</p>
  </>)

  return (
    <>
      <ul>
        {data.map((post: any) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <DataFetcherDetail post={selectedPost} />}
      <ReactQueryDevtools /> 
    </>
  );
}

export default DataFetcher;