import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProvider = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromcart: (id: number) => void;
  cartItems:  number;
  openCart: () => void;
  closeCart: () => void;
  cartItem: CartItem[];
};

export const ShoppingCartContext = createContext({} as ShoppingCartContext);

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({ children }: ShoppingCartProvider) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItem, setCartItem] = useLocalStorage<CartItem[]>('shopping-cart',[]);

  const cartItems = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const getItemQuantity = (id: number) => {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItem((currentItem) => {
      if (!currentItem.find((item) => item.id === id)) {
        return [...currentItem, { id, quantity: 1 }];
      } else {
        return currentItem.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItem((currentItem) => {
      if (currentItem.find((item) => item.id === id)?.quantity === 1) {
        return currentItem.filter((item) => item.id !== id);
      } else {
        return currentItem.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromcart = (id: number) => {
    setCartItem((currentItem) => {
      return currentItem.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromcart,
        cartItems,
        openCart,
        closeCart,
        cartItem,
      }}
    >
      <ShoppingCart isCartOpen={isCartOpen} />
      {children}
    </ShoppingCartContext.Provider>
  );
};
