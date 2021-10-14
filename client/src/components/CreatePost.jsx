import React, {useState, useEffect} from 'react';
import {createPost } from '../graphql/mutations';
import {API, Auth, graphqlOperation} from 'aws-amplify';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });
  const [currUser, setCurrUser] = useState({});

  useEffect(()=>{
    (async function(){
      const { username, attributes } = await Auth.currentUserInfo();
      setCurrUser({username, id: attributes.sub});
    })()

  }, []);

  const submitHandler = async (e)=> {
    e.preventDefault(); 

    try{
      const input = {
        ...formData,
        postOwnerId: currUser.id,
        postOwnerUsername: currUser.username,
        createdAt: new Date().toISOString()
      };
     await API.graphql(graphqlOperation(createPost, {input}));

      setFormData({
        postTitle: "",
        postBody: "",
      })
    }catch(e){
      console.error('Error while creating post. Reason: ',e.message)
    }
  }

  const changeHandler = ({target}) => {
    setFormData(prev => ({
      ...prev, 
      [target.name]: target.value
    }))
  }

  return (
    <div>
      <h1>Create Post</h1>

      <form className="add-post" onSubmit={submitHandler}>
        <input type="text" placeholder="title" name="postTitle" required value={formData.postTitle} onChange={changeHandler}/>
        <textarea cols="40" rows="3" placeholder="Post body" name="postBody" required value={formData.postBody} onChange={changeHandler}></textarea>
        <input type="submit"  className="btn" value="submit"/>  
      </form>
    </div>
  )
}

export default CreatePost;