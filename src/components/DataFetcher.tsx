import { useEffect, useState } from "react";

import { DataFetcherDetail } from "./DataFetcherDetail";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const maxPostPage = 10;

async function fetchPosts(pageNum: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`
  );
  return response.json();
}

const DataFetcher = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (currentPage < maxPostPage) {
      // 9페이지 이전이라면 프리페칭이 일어나지만, 10페이지일 경우 미리 가져올 데이터가 없음
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery(["posts", nextPage], () =>
        fetchPosts(nextPage)
      );
      // 9페이지라면 10패이지의 데이터가 미리 다운
    }
  }, [currentPage, queryClient]);

  const { data, isError, error, isLoading } = useQuery(
    ["posts", currentPage],
    () => fetchPosts(currentPage),
    {
      staleTime: 2000,
      keepPreviousData: true, // 쿼리 키가 바뀔 떄도 지난 데이터를 유지해서 이전 페이지로 돌아갔을 떄 캐시에 해당 데이터가 존재하도록 하기위함
      // 이전의 쿼리에 대한 반환값이 캐시에 남아 있음
    }
  ) as {
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
  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>ERROR is OCCUR</h3>
        <p>{error?.toString()}</p>
      </>
    );

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
        <button
          disabled={currentPage <= 1}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((previousValue) => previousValue + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <DataFetcherDetail post={selectedPost} />}
      <ReactQueryDevtools />
    </>
  );
};

export default DataFetcher;
