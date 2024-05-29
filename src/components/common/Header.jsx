import React, { useRef } from 'react'
import LOGO from "../../assets/logo.png";
import indianCities from '../../data/indianCities';
import Button from './Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchText = useRef("");
    const userData = useSelector(store => store.auth.userData);

    const changeCityHandler = (event) => {
        console.log(event.target.value);
    }

    const handleSearch = () => {
        console.log(searchText.current.value);
    }

    return (
        <div className='w-full lg:w-10/12 mx-auto px-4 py-2 bg-gray-100 flex justify-between'>
            <div className='flex items-center justify-center'>

                <Link to={"/"}>
                    <img
                        className='w-40'
                        src={LOGO}
                        alt="logo"
                    />
                </Link>

                <select
                    onChange={changeCityHandler}
                    className='bg-gray-100 outline-none text-sm'
                >
                    {
                        indianCities.map((city) => (
                            <option
                                key={city.id}
                                value={city.name}
                            >
                                {city.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className='flex justify-center items-center gap-2'>
                <input
                    ref={searchText}
                    className='outline-none px-4 py-2 rounded-md'
                    type="text"
                    placeholder='Search For the Equipment'
                />
                <Button
                    text={"Search"}
                    onClickHandler={handleSearch}
                />
            </div>

            <div>
                {userData !== null
                    ? (<div className='flex justify-center items-center gap-3'>
                        <button
                            onClick={() => navigate("/cart")}
                            className='flex justify-center items-center gap-2'
                        >
                            <FaCartShopping /> Cart
                        </button>
                        <Button
                            text={"Logout"}
                            onClickHandler={() => dispatch(logout(navigate))}
                        />
                    </div>)
                    : (<div className='flex justify-center items-center gap-3'>
                        <Button
                            text={"Login"}
                            onClickHandler={() => { navigate("/login") }}
                        />
                        <Button
                            text={"SignUp"}
                            onClickHandler={() => { navigate("/signup") }}
                        />
                    </div>)
                }
            </div>
        </div>
    )
}

export default Header