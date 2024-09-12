import { AxiosError } from 'axios'
import { create } from 'zustand'
import { Product } from './types'

interface State {
    products: Product[]
    isLoading: boolean
    error: null | unknown
}

interface Actions {
    fetchData: () => Promise<void>
}

const INITIAL_STATE: State = {
    products: [],
    isLoading: true,
    error: null
}

export const useProductsStore = create<State & Actions>(set => ({
    products: INITIAL_STATE.products,
    isLoading: INITIAL_STATE.isLoading,
    error: INITIAL_STATE.error,
    fetchData: async () => {
        try {
            set({ isLoading: true, error: null })
            const response = await fetch('https://66e0bbf32fb67ac16f2a76bb.mockapi.io/products')
            const data = await response.json()
            set({ products: data, isLoading: false })
        } catch (error) {
            set({ error,  isLoading: false })
        }
    }
}))