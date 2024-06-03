import { create } from 'zustand'

export const loggedIn = create((set) => ({
    loggedIn: false,
    authenticated: () => set((state) => ({ loggedIn: true})),
    unauthenticated: () => set({ loggedIn: false }),
    updateAuthentication: (newStatus) => set({ loggedIn: newStatus }),
  }))

  
export const loaded = create((set) => ({
    loaded: false,
    completed: () => set((state) => ({ loaded: true})),
    incomplete: () => set({ loaded: false }),

  }))