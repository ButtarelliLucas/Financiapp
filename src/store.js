// src/store.js
import { create } from "zustand";
import { fetchInvestments as apiFetchInvestments } from "./api/api";

const SESSION_DURATION = 60000; // 10 segundos para pruebas

const useStore = create((set) => ({
  user: null,
  isLoggingOut: false, // Estado para indicar si se está cerrando sesión
  investments: [], // Estado para almacenar las inversiones del usuario
  isLoadingInvestments: false, // Estado para indicar si se están cargando las inversiones
  investmentsError: null, // Estado para almacenar errores al cargar inversiones

  login: (userData) => {
    set({
      user: { ...userData, expiry: Date.now() + SESSION_DURATION },
      isLoggingOut: false, // Asegurar que no está en modo logout
    });
  },
  logout: () => {
    console.log("store.js - Cerrar sesión");
    set({ isLoggingOut: true, user: null, investments: [] }); // Marcar como cerrando sesión, eliminar usuario e inversiones
  },
  updateExpiry: () => {
    set((state) => {
      if (state.user) {
        const newExpiry = Date.now() + SESSION_DURATION;
        // Solo actualizar si la nueva expiración es mayor que la actual por más de 1 segundo
        if (newExpiry - state.user.expiry > 1000) {
          console.log("store.js - Actualizando expiración de la sesión.");
          return {
            user: { ...state.user, expiry: newExpiry },
          };
        }
      }
      console.log("store.js - No se actualizó la expiración de la sesión.");
      return state; // No hay cambios, no se actualiza el estado
    });
  },
  // **Nueva Acción:** Cargar Inversiones
  loadInvestments: async (token) => {
    set({ isLoadingInvestments: true, investmentsError: null });
    try {
      const data = await apiFetchInvestments(token);
      set({ investments: data });
    } catch (error) {
      set({ investmentsError: error.message });
    } finally {
      set({ isLoadingInvestments: false });
    }
  },
}));

export default useStore;
