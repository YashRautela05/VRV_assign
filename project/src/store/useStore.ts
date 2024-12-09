import { create } from 'zustand';
import { User, Role } from '../types';
import { userApi } from '../api/users';
import { roleApi } from '../api/roles';

interface Store {
  // State
  users: User[];
  roles: Role[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchUsers: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  addRole: (role: Omit<Role, 'id'>) => Promise<void>;
  updateRole: (id: string, role: Partial<Role>) => Promise<void>;
  deleteRole: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useStore = create<Store>((set, get) => ({
  users: [],
  roles: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const users = await userApi.getAll();
      set({ users });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchRoles: async () => {
    try {
      set({ loading: true, error: null });
      const roles = await roleApi.getAll();
      set({ roles });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addUser: async (userData) => {
    try {
      set({ loading: true, error: null });
      const newUser = await userApi.create(userData);
      set((state) => ({ users: [...state.users, newUser] }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateUser: async (id, userData) => {
    try {
      set({ loading: true, error: null });
      const updatedUser = await userApi.update(id, userData);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updatedUser : u)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteUser: async (id) => {
    try {
      set({ loading: true, error: null });
      await userApi.delete(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  addRole: async (roleData) => {
    try {
      set({ loading: true, error: null });
      const newRole = await roleApi.create(roleData);
      set((state) => ({ roles: [...state.roles, newRole] }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateRole: async (id, roleData) => {
    try {
      set({ loading: true, error: null });
      const updatedRole = await roleApi.update(id, roleData);
      set((state) => ({
        roles: state.roles.map((r) => (r.id === id ? updatedRole : r)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteRole: async (id) => {
    try {
      set({ loading: true, error: null });
      await roleApi.delete(id);
      set((state) => ({
        roles: state.roles.filter((r) => r.id !== id),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));