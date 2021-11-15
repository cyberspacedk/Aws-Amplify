import React from 'react';
import { Storage } from 'aws-amplify';

const AddFileToS3 = () => {

  const putHandler = async () => {
    const res = await Storage.put('text.js', 'alert("Hello")');
  }

  return (
    <div>
      <button onClick={putHandler}>Add to S3</button>
    </div>
  )
}

export default AddFileToS3;