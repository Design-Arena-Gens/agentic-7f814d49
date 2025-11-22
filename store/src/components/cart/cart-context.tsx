"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import type { Product } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}>({
  items: [],
  addItem: () => undefined,
  removeItem: () => undefined,
  setQuantity: () => undefined,
  clearCart: () => undefined,
  total: 0,
});

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.product.id === action.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
              : item,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.productId,
        ),
      };
    case "SET_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: Math.min(Math.max(action.quantity, 1), 99) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    return {
      items: state.items,
      total,
      addItem: (product: Product) => dispatch({ type: "ADD_ITEM", product }),
      removeItem: (productId: string) =>
        dispatch({ type: "REMOVE_ITEM", productId }),
      setQuantity: (productId: string, quantity: number) =>
        dispatch({ type: "SET_QUANTITY", productId, quantity }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
