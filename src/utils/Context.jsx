import { createContext, useState } from 'react'
import axios from './axios.jsx'
import { useEffect } from 'react'
export const ProductsContext = createContext()

const Context = ({children}) => {
    const [products, setProducts] = useState([])
    const getProducts = async () => {
        const res = await axios.get('/products')
        setProducts(res.data)
    }
    useEffect(() => {
        getProducts()
    }, [])

  return (
    <ProductsContext.Provider value={{products, setProducts}}>
      {children}
    </ProductsContext.Provider>
  )
}
export default Context