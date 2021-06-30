import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import AlbumPage from './components/AlbumPage/AlbumPage';
import PhotosPage from './components/PhotosPage';
import ViewPhoto from './components/ViewPhoto';
import EditCommentPage from './components/EditCommentPage';
import EditAlbumPage from './components/EditAlbumPage';
import AddPhotosPage from './components/AddPhotosPage';
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { useSelector } from 'react-redux';
import CreateAlbumFormPage from "./components/CreateAlbumPage";


function App() {

  const currentUser = useSelector( state => state.session.user);


  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path={`/albums`} exact>
            <AlbumPage/>
          </Route>
          <Route path={`/albums/new`}>
            <CreateAlbumFormPage/>
          </Route>
          <Route path='/:id/photos' exact>
            <PhotosPage/>
          </Route>
          <Route path='/photos/:title/:id' exact>
            <ViewPhoto/>
          </Route>
          <Route path='/:photoId/comments/:commentId/edit'>
            <EditCommentPage/>
          </Route>
          <Route path='/albums/:id/edit' exact={true}>
            <EditAlbumPage/>
          </Route>
          <Route path='/albums/:id/addPhotos'>
            <AddPhotosPage/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
