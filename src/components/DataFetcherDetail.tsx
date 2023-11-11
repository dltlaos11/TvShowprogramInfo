import { useQuery, useMutation } from "@tanstack/react-query";

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
  const { data, isError, error, isLoading } = useQuery(
    ["comments", post.id],
    () => fetchComments(post.id)
  );

  const deleteMutation = useMutation((postId: string) => deletePost(postId));
  //   mutatuin -> 퀴리 키와 관련있는 캐시 내부의 데이터와는 상관없으므로 쿼리 키 할당❌
  //   useQuery에서 인수로서 전달하는 쿼리 함수와는 달리 인수로 전달하는 변이 함수의 경우 그 자체로도 인수를 받을 수 있다
  //   useMutation -> 객체는 변이 함수를 반환하게 된다, 삭제 버튼을 클릭하면 변이 함수를 실행하는 것
  //   const deleteMutation = useMutation(() => deletePost(post.id));

  const updateMutation = useMutation((postId: string) => updatePost(postId));

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
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>
        Delete
      </button>{" "}
      {deleteMutation.isError && (
        <p style={{ color: "red" }}>Error deleting the post</p>
      )}
      {deleteMutation.isLoading && (
        <p style={{ color: "purple" }}>Deleting the Post</p>
      )}
      {deleteMutation.isSuccess && (
        <p style={{ color: "green" }}>post has (not) been deleted</p>
      )}
      <button onClick={() => useMutation(post.id)}>Update title</button>
      {updateMutation.isError && (
        <p style={{ color: "red" }}>Error updating the post</p>
      )}
      {updateMutation.isLoading && (
        <p style={{ color: "purple" }}>updating the Post</p>
      )}
      {updateMutation.isSuccess && (
        <p style={{ color: "green" }}>post has (not) been updated</p>
      )}
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
