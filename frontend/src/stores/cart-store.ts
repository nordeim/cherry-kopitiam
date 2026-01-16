import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  // Time-travel state for undo/redo
  past: CartState[]
  future: CartState[]

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  undo: () => void
  redo: () => void
  getTotal: () => number
  getItemCount: () => number
}

const createItem = (item: Omit<CartItem, 'quantity'>): CartItem => ({
  ...item,
  quantity: 1,
})

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      past: [],
      future: [],
    
      addItem: (newItem) => {
        const { items, past } = get()
        const existingItem = items.find((item) => item.id === newItem.id)
      
        if (existingItem) {
          set({
            past: [...past, { ...get(), items }],
            items: items.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            future: [],
          })
        } else {
          set({
            past: [...past, { ...get(), items }],
            items: [...items, createItem(newItem)],
            future: [],
          })
        }
      },
    
      removeItem: (id) => {
        set((state) => ({
          past: [...state.past, state],
          items: state.items.filter((item) => item.id !== id),
          future: [],
        }))
      },
    
      updateQuantity: (id, quantity) => {
        set((state) => ({
          past: [...state.past, state],
          items: quantity === 0
            ? state.items.filter((item) => item.id !== id)
            : state.items.map((item) =>
                item.id === id ? { ...item, quantity } : item
              ),
          future: [],
        }))
      },
    
      clearCart: () => {
        set((state) => ({
          past: [...state.past, state],
          items: [],
          future: [],
        }))
      },
    
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },
    
      undo: () => {
        const { past, future, items } = get()
        if (past.length === 0) return
      
        const previous = past[past.length - 1]
        set({
          items: previous.items,
          past: past.slice(0, -1),
          future: [{ ...get(), items }, ...future],
        })
      },
    
      redo: () => {
        const { past, future, items } = get()
        if (future.length === 0) return
      
        const next = future[0]
        set({
          items: next.items,
          past: [...past, { ...get(), items }],
          future: future.slice(1),
        })
      },
    
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      },
    
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'kopitiam-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
)
