import { csrfFetch } from "./csrf.js";

const GET_ALBUMS = `api/get_albums`;
const UPDATE_ALBUM = `api/update_album/`;
const CREATE_ALBUM = `api/create_album`;
const DELETE_ALBUM = `api/delete_album/`;

const load = (albums) => ({
    type: GET_ALBUMS,
    albums,
});

const update = (album) => ({
    type: UPDATE_ALBUM,
    album,
});

const remove = (albumId) => ({
    type: DELETE_ALBUM,
    albumId,
});

const add = (album) => ({
    type: CREATE_ALBUM,
    album,
});

export const getAlbums = () => async dispatch => {
    const response = await fetch(`/api/albums`);
    if (response.ok) {
        const albums = await response.json();
        dispatch(load(albums));

    }
};

export const createAlbum = (data) => async dispatch => {
    const response = await csrfFetch(`/api/albums/new`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const album = await response.json();
        dispatch(add(album));
        return album;
    }
};

export const updateAlbum = data => async dispatch => {
    const response = await csrfFetch(`/api/albums/${data.id}/edit`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const album = await response.json();
        dispatch(update(album));
        return album;
    }
};

export const deleteAlbum = albumId => async dispatch => {
    const response = await csrfFetch(`/api/albums/${albumId}/delete`, {
        method: 'post',
    });

    if (response.ok) {
        const album = await response.json();
        dispatch(remove(album.id));
    }
};

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS: {
            const allAlbums = {};
            action.albums.forEach(album => {
                allAlbums[album.id] = album;
            })
            return allAlbums
        }
        case DELETE_ALBUM: {
            const newState = { ...state };
            delete newState[action.albumId];
            return newState;
        }
        case CREATE_ALBUM:
        case UPDATE_ALBUM: {
            return {
                ...state,
                [action.album.id]: action.album,
            };
        }
        default:
            return state;
    }
};

export default reducer;
