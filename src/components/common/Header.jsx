import React, { useRef } from 'react'
import LOGO from "../../assets/logo.png";
import indianCities from '../../data/indianCities';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {

    const navigate = useNavigate();
    const searchText = useRef("");

    const changeCityHandler = (event) => {
        console.log(event.target.value);
    }

    const handleSearch = () => {
        console.log(searchText.current.value);
    }

    return (
        <div className='w-full lg:w-10/12 mx-auto px-4 py-2 bg-gray-100 flex justify-between'>
            <div className='flex items-center justify-center'>
                <img
                    className='w-40'
                    src={LOGO}
                    alt="logo"
                />

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

            <div className='flex justify-center items-center gap-3'>
                <div>
                    <button
                        onClick={()=>navigate("/cart")}
                        className='flex justify-center items-center gap-2'
                    >
                        <FaCartShopping /> Cart
                    </button>
                </div>

                <Button
                    text={"SignIn / SignUp"}
                    onClickHandler={() => { navigate("/login") }}
                />
            </div>
        </div>
    )
}

export default Header