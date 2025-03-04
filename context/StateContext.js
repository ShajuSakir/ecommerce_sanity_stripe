import React, {createContext, useContext
    ,useState, useEffect
} from "react";
import {toast} from 'react-hot-toast';
import { product } from "../ecommerce-sanity/schemaTypes/product";


const Context = createContext();

export const StateContext = ({children}) =>{
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuantities, settotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity)=>{
        const checkProductInCart = cartItems.find((item)=> item._id === product._id);
        
        settotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        settotalQuantities((prevTotalQuantities)=> prevTotalQuantities + quantity);

        if(checkProductInCart){            
            const updatedCartItems = cartItems.map((cartProduct) => {
                if(cartProduct._id === product._id) return{
                    ...cartProduct, 
                    quantity : cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);            
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, {...product}]);
        }

        toast.success(`${qty} ${product.name} added to the cart`);
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find((item)=> item._id === product._id);
       
        const newCartItems1 = cartItems.filter((item => item._id!== product._id));
        
        settotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        settotalQuantities((prevTotalQuantities)=>prevTotalQuantities=foundProduct.quantity);
        setCartItems(newCartItems1);
    }

    const toggleCartItemsQuantity = (id, value)=>{
        foundProduct = cartItems.find((item)=> item._id === id);
        index = cartItems.findIndex((product)=> product._id ===id);
        
        const newCartItems1 = cartItems.filter((item => item._id!== id));
           
        if(value === 'inc'){
             let newCartItems = [...newCartItems1,
                {...foundProduct, 
                quantity: foundProduct.quantity+1}];           
            setCartItems(newCartItems);
            settotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price);
            settotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
        } else if (value==='dec')
        {
            if(foundProduct.quantity >1){
            let newCartItems = [...newCartItems1,
                {...foundProduct, 
                quantity: foundProduct.quantity-1}];           
            setCartItems(newCartItems);
            settotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price);
            settotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            }
        }
    
    }

    const incQty = () =>{
        setQty((prevQty)=>prevQty+1);
    }
    const decQty = () =>{
        setQty((prevQty)=>{
            if(prevQty-1 <1) return 1;

            return prevQty-1;
        });
    }

    return(
        <Context.Provider
         value ={{
            showCart,
            setShowCart,
            cartItems,
            totalPrice,
            totalQuantities,
            qty,
            incQty,
            decQty,
            onAdd,
            toggleCartItemsQuantity,
            onRemove,
            setCartItems,
            settotalPrice,
            settotalQuantities            
         }}
        >
            {children}
        </Context.Provider>
    );
}

export const useStateContext = ()=> useContext(Context);


