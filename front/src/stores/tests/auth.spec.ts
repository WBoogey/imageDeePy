import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import { describe, beforeEach, it, expect, vi } from 'vitest'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.spyOn(document, 'cookie', 'set').mockImplementation(() => {})
  })

  it('isAuthenticated est false sans token', () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)
  })

  it('logout réinitialise isUsers', () => {
    // @ts-expect-error: ajout d'une propriété custom pour le test
    globalThis.router = { push: () => {} }
    const store = useAuthStore()
    store.isUsers = { id: 1, username: 'test', email: 'test@test.com' }
    store.logout()
    expect(store.isUsers).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
})