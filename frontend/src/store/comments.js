import { csrfFetch } from "./csrf.js";

const GET_COMMENTS = `api/get_comments`;
const UPDATE_COMMENT = `api/update_comment/`;
const CREATE_COMMENT = `api/create_comment`;
const DELETE_COMMENT = `api/delete_comment/`;
const GET_COMMENT = `api/get_comment/`;

const load = (comments) => ({
    type: GET_COMMENTS,
    comments,
});

const update = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
});

const remove = (commentId) => ({
    type: DELETE_COMMENT,
    commentId,
});

const add = (comment) => ({
    type: CREATE_COMMENT,
    comment,
});

export const getComments = (id) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(load(comments));
    }
};

export const createComment = (data) => async dispatch => {
    const response = await fetch(`/api/comments`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(add(comment));
        return comment;
    }
};

export const updateComment = data => async dispatch => {
    const response = await csrfFetch(`/api/comments/${data.id}/edit`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(update(comment));
        return comment;
    }
};

export const deleteComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}/delete`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(remove(commentId));
    }
};

const initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS: {
            const comments = {};
            action.comments.forEach(comment => {
                comments[comment.id] = comment;
            })
            return comments;
        }
        case GET_COMMENT: {
            return {...state, [action.comment.id] : action.comment};

        }
        case DELETE_COMMENT: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        }
        case CREATE_COMMENT:
        case UPDATE_COMMENT: {
            return {
                ...state,
                [action.comment.id]: action.comment,
            };
        }
        default:
            return state;
    }
};

export default reducer;
