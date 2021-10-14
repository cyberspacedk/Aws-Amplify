import React, {useEffect, useState, useRef} from 'react';
import {listPosts} from '../graphql/queries';
import {onCreatePost} from '../graphql/subscriptions';
import {API, graphqlOperation} from 'aws-amplify';

import DeletePost from './DeletePost';
import EditPost from './EditPost';


const DisplayPosts = () => {
  const [posts, setPosts] = useState([]);
  
  const postListenerRef = useRef();

  postListenerRef?.current?.subscribe({
    next: postData => {
      const newPost = postData.value.data.onCreatePost;
      setPosts(prevPosts => [newPost ,...prevPosts]);
    }
  });


  useEffect(() => {
   getPosts();
   postListenerRef.current = API.graphql(graphqlOperation(onCreatePost));

   return ()=> {
    // postListenerRef?.current?.unsubscribe();
   }
  }, []);



  const getPosts = async () => {
    const result = await API.graphql(graphqlOperation(listPosts));
    setPosts(result?.data?.listPosts?.items); 
    return result?.data?.listPosts?.items;
  };

  return (
    <>
      {posts.map(post => (
        <div className="posts" key={post.id}>
          <h1>{post.title}</h1>
          <span>
            {"Wrote by: "} {post.postOwnerUsername}
          </span>

          <time>{new Date(post.createdAt).toDateString()}</time>

          <p>{post.postBody}</p>
          <div>
            <DeletePost id={post.id}/>
            <EditPost id={post.id}/>
          </div> 
        </div>
      ))}
    </>
  )
}

export default DisplayPosts;