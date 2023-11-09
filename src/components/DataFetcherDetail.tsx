import { useQuery } from "react-query";

async function fetchComments(postId: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    return response.json();
  }
  
  async function deletePost(postId: string) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/postId/${postId}`,
      { method: "DELETE" }
    );
    return response.json();
  }
  
  async function updatePost(postId: string) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`, // Note the correct URL
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Set the content type as needed
          },
          body: JSON.stringify({ title: "REACT QUERY FOREVER!!!!" }), // Convert data to JSON
        }
      );
      return response.json();
    }

  export function DataFetcherDetail({ post }) {
    // const data: any = [];
    const {data, isError,error , isLoading} = useQuery(["comments", post.id], () => 
        fetchComments(post.id)
    )
    // 댓글 컴포넌트에서 모든 쿼리가 comments 쿼리 키를 동일하게 사용하고 있기에 stale 데이터가 나옴
    // 어떠한 트리거가 있어야 데이터를 다시 가져오게 된다 
    // 트리거 예시 c.f. 화면 포커스, 컴포넌트 마운트, useQuery에서 반환되어 수동으로 리페칭을 실행할 때
    // 지정된 간격으로 리페칭을 자동 실행할 때, 
    // 변이(Mutation)를 생성한 뒤 쿼리를 무효화할 시 클라이언트의 데이터가 서버의 데이터와 불일치 할 때 리페칭이 트리거 됨
    // 1. 제목을 클릭할 때마다 데이터를 무효화사켜서 데이터를 다시 가져오게 만들 수 있음 -> not simple, 캐시에 데이터를 갖고있어야
    // 같은 쿼리를 실행하는게 아니므로 같은 캐시 공간을 차지하지 않음
    // 2. 쿼리는 게시물 ID를 포함하기 떄문에 쿼리별로 캐시를 남길 수 있으며 cooments 쿼리에 대한 캐시를 공유하지 않아도 된다.
    // 3. 각 게시물에 대한 쿼리에 라벨을 설정하면 된다.
    // 4. 쿼리키에 문자열 대신 배열을 전달하면 가능 like -> ['comments', post.id], 
    //    쿼리 키를 쿼리에 대한 의존성 배열로 취급하게 된다. 따라서 쿼리 키가 변경되면 즉 post.id가 업데이트되면 RQ가 새 쿼리를 생성해서 staleTime, cacaheTime을
    //    가지게 되고 의존성 배열이 다르다면 완전히 다른것으로 간주, 따라서 데이터를 가져올 떄 사용하는 쿼리 함수에 있는 값이 쿼리 키에 포함되어야 하는 것🔥
    //    이를 통해 comments 쿼리가 같은 쿼리로 간주되는 상황을 막고 각기 다른 쿼리로 다뤄질 것
    //    ["comments", post.id] -> 의존성 배열로 작용하며 문자열 'comments'에 식별자가 추가된 격
    //    다른 것을 클릭할 때 마다 이전의 쿼리는 가비지로 수집되기 전까지 캐시로 저장

    if(isLoading) return <h3>Loading...</h3>
    if (isError) return (<>
    <h3>ERROR is OCCUR</h3>
    <p>{error?.toString()}</p>
    </>)
  
  
    return (
      <>
        <h3 style={{ color: "blue" }}>{post.title}</h3>
        <button>Delete</button> <button>Update title</button>
        <p>{post.body}</p>
        <h4>Comments</h4>
        {data.map((comment: any) => (
          <li key={comment.id}>
            {comment.email}: {comment.body}
          </li>
        ))}
      </>
    );
  }