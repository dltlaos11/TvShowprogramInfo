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