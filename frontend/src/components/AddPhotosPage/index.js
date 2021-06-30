import { useState } from "react";
import { createUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';
import * as photoActions from '../../store/photos';

const AddPhotosPage = () => {
    const [image, setImage] = useState([]);
    const [errors, setErrors] = useState([]);
    const {id} = useParams();

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = [];
        dispatch(photoActions.createPhoto({ id: Number(id), image }))
            .then(() => {
                setImage(null);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    newErrors = data.errors;
                    setErrors(newErrors);
                }
            });
    };

    const updateFile = (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) setImage(file);
      };

    return (
        <div>
            <h1>Add Photo</h1>
            {errors.length > 0 &&
                errors.map((error) => <div key={error}>{error}</div>)}
            <form
                style={{ display: "flex", flexFlow: "column" }}
                onSubmit={handleSubmit}
            >
                <label>
                    Upload Photo
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>
                </label>
                <button type="submit">Submit Photos</button>
            </form>
            <div>
            </div>
        </div>
    );
};

export default AddPhotosPage;
