// src/api/api.js

// Simula una base de datos de usuarios
export const users = [
    {
      name: 'test_user',
      account: 'test_user',
      password: 'password123!', // Nota: En producción, nunca almacenes contraseñas en texto plano
      role: 'user', // Puede ser 'admin' o 'user'
      token: 'fake-jwt-token-user',
    },
    {
      name: 'admin_user',
      account: 'admin_user',
      password: 'adminpassword!',
      role: 'admin',
      token: 'fake-jwt-token-admin',
    },
  ];
  
  // Simula una base de datos de inversiones
  export const investments = {
    'fake-jwt-token-user': [
      {
        id: 1,
        type: 'Botones',
        amount: 1,
        date: '2023-10-01',
        status: 'Activo',
      },
      {
        id: 2,
        type: 'Pelusas',
        amount: 2,
        date: '2023-09-15',
        status: 'Activo',
      },
      {
        id: 3,
        type: 'Moneditas',
        amount: 6,
        date: '2023-09-21',
        status: 'Activo',
      },
    ],
    'fake-jwt-token-admin': [
      {
        id: 4,
        type: 'Fondos Mutuos',
        amount: 20000,
        date: '2023-08-20',
        status: 'Activo',
      },
      {
        id: 5,
        type: 'Bienes Raíces',
        amount: 150000,
        date: '2023-07-10',
        status: 'Inactivo',
      },
    ],
  };
  
  // Simula una función de login
  export const apiLogin = (account, password) => {
    return new Promise((resolve, reject) => {
      // Simula la latencia de red con un delay de 1 segundo
      setTimeout(() => {
        // Busca al usuario en la "base de datos"
        const user = users.find(
          (u) => u.account === account && u.password === password
        );
  
        if (user) {
          // Retorna los datos del usuario sin la contraseña
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Credenciales inválidas'));
        }
      }, 1000);
    });
  };
  
  // Simula una función de logout (puede ser simplemente una operación local)
  export const apiLogout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500); // Delay de 0.5 segundos
    });
  };
  
  // Simula una función para obtener datos del usuario usando el token
  export const fetchUserData = (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.token === token);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Token inválido'));
        }
      }, 1000);
    });
  };
  
  // Simula una función para obtener las inversiones del usuario usando el token
  export const fetchInvestments = (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (investments[token]) {
          resolve(investments[token]);
        } else {
          reject(new Error('Token inválido o sin inversiones'));
        }
      }, 1000); // Simula un delay de 1 segundo
    });
  };
  