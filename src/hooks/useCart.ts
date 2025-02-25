import { db } from "../data/db"
import { useEffect, useMemo, useState } from "react"


export default function useCart() {

     const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart")
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      const [ data ] = useState(db) 
      const [cart, setCart ] = useState(initialCart) 
      const MAX_ITEMS = 5
      const MIN_ITEMS = 1
    
      // Codigo para guardar automaticamente el carrito en el localStorage
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
    
      // Funcion para agregar guitarras al carrito
      function addToCart(item) {
    
        const itemExists = cart.findIndex(guitar => guitar.id === item.id )
        if (itemExists >= 0){
          if(cart[itemExists].quantity >= MAX_ITEMS) return
          const updatedCart = [...cart]
          updatedCart[itemExists].quantity++
          setCart(updatedCart)
        }else {
          item.quantity = 1
          setCart([...cart, item])
        }
      }
    
      // Funcion para remover guitarras del carrito. 
      function removeFromCart (id)  {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      // Funcion para incrementar el producto en el carrito
      function increaseQuantity (id){
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity < MAX_ITEMS ) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      // Funcion para decrementar el producto en el carrito 
      function decreaseQuantity (id) {
        const updatedCart = cart.map(item => {
          if(item.id === id && item.quantity > MIN_ITEMS){
            return {
              ...item,
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(updatedCart)
      }
    
      // FUncion para limpiar el carrito 
      function clearCart(e) {
        setCart([])
      }

        // State Derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart] )
    const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])


    return {
        data,
        cart, 
        addToCart, 
        removeFromCart,
        decreaseQuantity, 
        increaseQuantity, 
        clearCart,
        isEmpty, 
        cartTotal
    }
}
