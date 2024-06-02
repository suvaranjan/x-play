// store.js
import { create } from 'zustand';

const useStore = create((set) => ({
    userEmail: null,
    setUserEmail: (email) => set({ userEmail: email }),
    notificationCount: 0,
    setNotificationCount: (num) => set({ notificationCount: num }),
    decrementNotificationCount: () => set((state) => ({ notificationCount: state.notificationCount - 1 })),
    userPassword: null,
    setUserPassword: (password) => set({ userPassword: password }),
    user: null,
    setUser: (info) => set({ user: info }),
    playerInfo: null,
    setPlayerInfo: (info) => set({ playerInfo: info }),
}));

export default useStore;