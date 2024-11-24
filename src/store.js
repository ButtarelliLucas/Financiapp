// store.js
import { create } from "zustand";

const SESSION_DURATION = 10000; // 10 segundos para pruebas

const useStore = create((set) => ({
  user: null,
  login: (userData) => {
    set({
      user: { ...userData, expiry: Date.now() + SESSION_DURATION },
    });
  },
  logout: () => {
    set({ user: null });
  },
  updateExpiry: () => {
    set((state) => {
      if (state.user) {
        const newExpiry = Date.now() + SESSION_DURATION;
        // Solo actualizar si la nueva expiración es mayor que la actual por más de 1 segundo
        if (newExpiry - state.user.expiry > 1000) {
          return {
            user: { ...state.user, expiry: newExpiry },
          };
        }
      }
      return state; // No hay cambios, no se actualiza el estado
    });
  },
}));

export default useStore;
