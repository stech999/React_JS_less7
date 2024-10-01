import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './profileReduser';

function UserProfile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        <div>
            <h2>Профиль пользователя</h2>
            {user && (
                <ul>
                    <li>Имя: {user.name}</li>
                    <li>Email: {user.email}</li>
                    <li>city: {user.address.city}</li>
                    <li>street: {user.address.street}</li>
                    <li>company: {user.company.name}</li>
                    <li>website: {user.website}</li>
                    <li>phone: {user.phone}</li>
                </ul>
            )}
        </div>
    );
}

export default UserProfile;
