import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Couple, User } from '@/types'

interface CoupleState {
  couple: Couple | null
  user: User | null
  partner: User | null
  setCouple: (couple: Couple) => void
  setUser: (user: User) => void
  setPartner: (partner: User) => void
  reset: () => void
}

export const useCoupleStore = create<CoupleState>()(
  persist(
    (set) => ({
      couple: null,
      user: null,
      partner: null,
      setCouple: (couple) => set({ couple }),
      setUser: (user) => set({ user }),
      setPartner: (partner) => set({ partner }),
      reset: () => set({ couple: null, user: null, partner: null }),
    }),
    {
      name: 'wpm_couple-storage',
    }
  )
)