import { create } from 'zustand'
import { TOKEN_KEY } from '../lib/constants/key';

const useOAuth = create((set) => ({
  isLogged: false,
  login: (token) => {
    localStorage.setItem(TOKEN_KEY, token);

    set({  isLogged: true });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);

    set({ isLogged: false });
  },
}));

export default useOAuth;
