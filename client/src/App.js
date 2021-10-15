import {withAuthenticator} from 'aws-amplify-react';

import DisplayPosts from './components/DisplayPosts';
import CreatePost from './components/CreatePost';
import AddFileToS3 from './components/AddFileToS3'

import './App.css';

function App() {
  return (
    <div className="App">
      <AddFileToS3 />
      <CreatePost />
      <DisplayPosts />
    </div>
  );
}

export default withAuthenticator(App, {
  includeGreetings: true
});
