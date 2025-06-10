import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import { describe, beforeEach, it, expect } from 'vitest'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('isAuthenticated est false sans token', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
  })

  it('logout réinitialise isUsers et le token', () => {
    const store = useAuthStore()
    store.isUsers = { id: 1, username: 'test', email: 'test@test.com' }
    store.logout()
    expect(store.isUsers).toBeNull()
  })
})