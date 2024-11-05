import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ProductsContext } from "../utils/Context.jsx"
import { IoMdArrowBack } from "react-icons/io"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
import { FiEdit, FiShare2 } from "react-icons/fi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiShoppingBag } from "react-icons/bi"

const Details = () => {
    const { id } = useParams()
    const { products, setProducts } = useContext(ProductsContext)
    const product = products.find((item) => item.id == id)
    const navigate = useNavigate()

    const handleDelete = () => {
        const confirmed = window.confirm('Are you sure you want to delete this product?')
        if (confirmed) {
            setProducts(products.filter(item => item.id != id))
            navigate('/')
        }
    }

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index}>
                {index + 1 <= rating ? (
                    <AiFillStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                ) : (
                    <AiOutlineStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                )}
            </span>
        ))
    }

    if (!products.length) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-lg sm:text-xl font-medium text-gray-600">
                    Loading product details...
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto  ">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                        >
                            <IoMdArrowBack className="h-6 w-6" />
                            <span className="hidden sm:inline font-medium">Back</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6 ">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <div className="relative aspect-square bg-white">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="absolute inset-0 w-full h-full object-contain p-8"
                                />
                            </div>
                        </div>

                        <div className="md:w-1/2 p-6 md:p-8 lg:p-10 bg-gray-50 ">
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                                    {product.category}
                                </span>
                                <button
                                onClick={handleDelete}
                                className="p-2 rounded-full hover:bg-red-50"
                                title="Delete product"
                            >
                                <RiDeleteBin6Line className="h-5 w-5 text-red-500" />
                            </button>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                {product.title}
                            </h1>

                            <div className="flex items-center mb-6">
                                <div className="flex items-center">
                                    {renderStars(product.rating.rate)}
                                </div>
                                <span className="ml-2 text-sm text-gray-500">
                                    ({product.rating.rate} rating)
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                                {product.description}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-3xl font-bold text-green-600">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Details
