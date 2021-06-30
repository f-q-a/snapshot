import { csrfFetch } from "./csrf.js";

const GET_PHOTOS = `api/get_photos`;
const UPDATE_PHOTO = `api/update_photo/`;
const CREATE_PHOTO = `api/create_photo`;
const DELETE_PHOTO = `api/delete_photo/`;
const GET_PHOTO = `api/get_photo/`;

const load = (photos, albumId) => ({
    type: GET_PHOTOS,
    photos,
    albumId,
});

const loadOne = (photo) =>(
    {
        type: GET_PHOTO,
        photo,
    }
)

const update = (photo) => ({
    type: UPDATE_PHOTO,
    photo,
});

const remove = (photoId, albumId) => ({
    type: DELETE_PHOTO,
    photoId,
    albumId,
});

const add = (photo) => ({
    type: CREATE_PHOTO,
    photo,
});

export const getPhotos = (albumId) => async dispatch => {
    const response = await fetch(`/api/photos`);
    if (response.ok) {
        const photos = await response.json();
        dispatch(load(photos, albumId));

    }
};

export const getPhoto = (id) => async dispatch => {
    const response = await fetch(`/api/photos/${id}`);
    if (response.ok) {
        const photo = await response.json();
        dispatch(loadOne(photo));
    }
};

export const createPhoto = (data) => async dispatch => {
    const {id, image } = data;
    const formData = new FormData();
    formData.append("id", id);
    if (image) formData.append("image", image);

    const response = await csrfFetch(`/api/photos/${data.id}/addPhotos`, {
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    if (response.ok) {
        const photo = await response.json();
        dispatch(add(photo));
        return photo;
    }
};

export const updatePhoto = data => async dispatch => {
    const response = await fetch(`/api/albums/${data.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const photo = await response.json();
        dispatch(update(photo));
        return photo;
    }
};

export const deletePhoto = (photoId) => async dispatch => {
    const response = await fetch(`/api/photos/${photoId}`, {
        method: 'delete',
    });

    if (response.ok) {
        const photo = await response.json();
        dispatch(remove(photo.id));
    }
};

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PHOTOS: {
            const album = {...state};

            action.photos.forEach(photo =>  {
                if(action.albumId === photo.album_id){
                    album[photo.id] = photo;
                }
            });
            return album;
        }
        case GET_PHOTO: {
            // return {...state, [action.photo.id] : action.photo};
            return action.photo;

        }
        case DELETE_PHOTO: {
            const newState = { ...state };
            delete newState[action.photoId];
            return newState;
        }
        case CREATE_PHOTO:
        case UPDATE_PHOTO: {
            return {
                ...state,
                [action.photo.id]: action.photo,
            };
        }
        default:
            return state;
    }
};

export default reducer;
