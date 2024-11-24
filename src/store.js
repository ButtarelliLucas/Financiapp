// src/store.js
import { create } from "zustand";
import Cookies from "js-cookie";
import { 
  fetchInvestments as apiFetchInvestments, 
  fetchUserData as apiFetchUserData, 
  apiLogout 
} from "./api/api";

const SESSION_DURATION = 20000; // 20 segundos

const useStore = create((set) => ({
  // **Datos de Usuario**
  userInfo: null, // Contendrá información del usuario (sin datos de sesión)
  
  // **Datos de Sesión**
  session: {
    isLoggedIn: false,
    expiry: null, // Timestamp en milisegundos
  },

  // **Estado de Carga**
  loading: true, // Indica si la sesión está siendo inicializada
  
  // **Inversiones**
  investments: [],
  isLoadingInvestments: false,
  investmentsError: null,

  // **Acción de Login**
  login: (userData) => {
    console.log("store.js - Iniciando sesión para:", userData);
    const expiryTime = Date.now() + SESSION_DURATION;
    set({
      userInfo: {
        name: userData.name,
        account: userData.account,
        role: userData.role.toLowerCase(), // Asegurando minúsculas
        token: userData.token,
      },
      session: {
        isLoggedIn: true,
        expiry: expiryTime,
      },
      loading: false, // La sesión ya está iniciada
    });
    Cookies.set("token", userData.token, { 
      expires: 1/1440, // 1 minuto
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production', // Solo en producción
    });
    Cookies.set("expiry", expiryTime.toString(), { 
      expires: 1/1440, // 1 minuto
      sameSite: 'Strict',
      secure: process.env.NODE_ENV === 'production', // Solo en producción
    });
  },

  // **Acción de Logout (Asíncrona)**
  logout: async () => {
    console.log("store.js - Cerrar sesión");
    await apiLogout(); // Esperar a que la función de logout del API termine
    set({
      userInfo: null,
      session: {
        isLoggedIn: false,
        expiry: null,
      },
      loading: false, // La sesión ya está cerrada
      investments: [],
      investmentsError: null,
    });
    Cookies.remove("token");
    Cookies.remove("expiry");
  },

  // **Acción para Actualizar la Expiración de la Sesión**
  updateExpiry: () => {
    set((state) => {
      if (state.session.isLoggedIn) {
        const newExpiry = Date.now() + SESSION_DURATION;
        console.log("store.js - Actualizando expiración de la sesión.");
        Cookies.set("expiry", newExpiry.toString(), { 
          expires: 1/1440, // 1 minuto
          sameSite: 'Strict',
          secure: process.env.NODE_ENV === 'production', // Solo en producción
        });
        return {
          session: {
            ...state.session,
            expiry: newExpiry,
          },
        };
      }
      console.log("store.js - No se actualizó la expiración de la sesión.");
      return {};
    });
  },

  // **Acción para Cargar Inversiones**
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

  // **Acción para Inicializar la Sesión desde Cookies**
  initializeSession: async () => {
    const token = Cookies.get("token");
    const expiry = Cookies.get("expiry");
    if (token && expiry) {
      const expiryTime = parseInt(expiry, 10);
      const now = Date.now();
      if (now > expiryTime) {
        console.log("store.js - Sesión expirada.");
        Cookies.remove("token");
        Cookies.remove("expiry");
        set({ 
          userInfo: null, 
          session: { isLoggedIn: false, expiry: null }, 
          loading: false // Finalizar la carga
        });
      } else {
        try {
          const userData = await apiFetchUserData(token);
          console.log("store.js - Sesión inicializada para:", userData);
          set({
            userInfo: userData,
            session: {
              isLoggedIn: true,
              expiry: expiryTime,
            },
            loading: false, // La sesión ya está iniciada
          });
          // Cargar inversiones
          set({ isLoadingInvestments: true, investmentsError: null });
          try {
            const data = await apiFetchInvestments(token);
            set({ investments: data });
          } catch (error) {
            set({ investmentsError: error.message });
          } finally {
            set({ isLoadingInvestments: false });
          }
          // Calcular tiempo restante para renovar la sesión
          const timeLeft = expiryTime - now;
          if (timeLeft > 5000) { // Renovar 5 segundos antes de expirar
            setTimeout(() => {
              useStore.getState().renewToken();
            }, timeLeft - 5000);
          } else {
            // Si queda menos de 5 segundos, renovar inmediatamente
            useStore.getState().renewToken();
          }
        } catch (error) {
          console.log("store.js - Error al inicializar la sesión:", error);
          Cookies.remove("token");
          Cookies.remove("expiry");
          set({ 
            userInfo: null, 
            session: { isLoggedIn: false, expiry: null }, 
            loading: false // Finalizar la carga
          });
        }
      }
    } else {
      // Si no hay token o expiry, finalizar la carga
      set({ loading: false });
    }
  },

  // **Acción para Renovar la Sesión**
  renewToken: () => {
    const { session, userInfo } = useStore.getState();
    if (session.isLoggedIn && userInfo) {
      console.log("store.js - Renovando expiración de la sesión...");
      const newExpiry = Date.now() + SESSION_DURATION;
      set({
        session: {
          ...session,
          expiry: newExpiry,
        },
      });
      // Actualizar la cookie de expiración
      Cookies.set("expiry", newExpiry.toString(), { 
        expires: 1/1440, // 1 minuto
        sameSite: 'Strict',
        secure: process.env.NODE_ENV === 'production', // Solo en producción
      });
      console.log("store.js - Sesión renovada. Nueva expiración:", new Date(newExpiry));
      // Programar la próxima renovación
      setTimeout(() => {
        useStore.getState().renewToken();
      }, SESSION_DURATION - 5000); // Renovar 5 segundos antes de expirar
    }
  },
}));

export default useStore;
