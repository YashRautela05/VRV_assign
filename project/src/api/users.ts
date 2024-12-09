import { User } from '../types';
import { simulateRequest } from './utils';
import { db } from '../lib/db';

export const userApi = {
  async getAll(): Promise<User[]> {
    return simulateRequest(
      () => db.users,
      'Failed to fetch users'
    );
  },

  async getById(id: string): Promise<User> {
    return simulateRequest(() => {
      const user = db.users.find((u) => u.id === id);
      if (!user) throw new Error('User not found');
      return user;
    }, 'Failed to fetch user');
  },

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    return simulateRequest(() => {
      const user: User = {
        ...userData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      db.users.push(user);
      return user;
    }, 'Failed to create user');
  },

  async update(id: string, userData: Partial<User>): Promise<User> {
    return simulateRequest(() => {
      const index = db.users.findIndex((u) => u.id === id);
      if (index === -1) throw new Error('User not found');
      
      const updatedUser = {
        ...db.users[index],
        ...userData,
      };
      db.users[index] = updatedUser;
      return updatedUser;
    }, 'Failed to update user');
  },

  async delete(id: string): Promise<void> {
    return simulateRequest(() => {
      const index = db.users.findIndex((u) => u.id === id);
      if (index === -1) throw new Error('User not found');
      db.users.splice(index, 1);
    }, 'Failed to delete user');
  },
};