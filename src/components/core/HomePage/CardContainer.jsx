import React from 'react'
import CardList from '../../common/CardList'
import TRACTOR from "../../../assets/tractor 1.png";
import FEEDING from "../../../assets/feeding trough 1.png";


const CardContainer = () => {

    const cardData = [
        {
            id: 1,
            name: "Tractor",
            image: TRACTOR,
            description: "This tractor can help you for transporting your Goods from one place to another",
            price: 2000
        },
        {
            id: 2,
            name: "Feeding Through",
            image: FEEDING,
            description: "This is I dont know what it is but its Definity helpfull",
            price: 100
        },
        {
            id: 3,
            name: "Tractor",
            image: TRACTOR,
            description: "This tractor can help you for transporting your Goods from one place to another",
            price: 2400
        },
        {
            id: 4,
            name: "Feeding Through",
            image: FEEDING,
            description: "This tractor can help you for transporting your Goods from one place to another",
            price: 2000
        },
        {
            id: 5,
            name: "Tractor",
            image: TRACTOR,
            description: "This tractor can help you for transporting your Goods from one place to another",
            price: 350
        },
        {
            id: 6,
            name: "Feeding Through",
            image: FEEDING,
            description: "This is I dont know what it is but its Definity helpfull",
            price: 230
        },
    ]

    return (
        <div className='bg-gray-100 mt-10'>
            <div className='w-full lg:w-10/12 mx-auto'>
                <CardList cardData={cardData} />
            </div>
        </div>
    )
}

export default CardContainer