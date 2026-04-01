import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),

      cart: {}, // Mapping category -> partId
      addToCart: (category, partId) => set((state) => {
        // Toggle off if already selected, otherwise add
        if(state.cart[category] === partId) {
          const newCart = { ...state.cart };
          delete newCart[category];
          return { cart: newCart };
        }
        return { cart: { ...state.cart, [category]: partId } };
      }),
      removeFromCart: (category) => set((state) => {
        const newCart = { ...state.cart };
        delete newCart[category];
        return { cart: newCart };
      }),
      clearCart: () => set({ cart: {} }),

      wishlist: [], // Array of partIds
      toggleWishlist: (partId) => set((state) => ({
        wishlist: state.wishlist.includes(partId)
          ? state.wishlist.filter(id => id !== partId)
          : [...state.wishlist, partId]
      }))
    }),
    {
      name: 'pc-builder-storage',
    }
  )
);
