import { Role } from '../types';
import { simulateRequest } from './utils';
import { db } from '../lib/db';

export const roleApi = {
  async getAll(): Promise<Role[]> {
    return simulateRequest(
      () => db.roles,
      'Failed to fetch roles'
    );
  },

  async getById(id: string): Promise<Role> {
    return simulateRequest(() => {
      const role = db.roles.find((r) => r.id === id);
      if (!role) throw new Error('Role not found');
      return role;
    }, 'Failed to fetch role');
  },

  async create(roleData: Omit<Role, 'id'>): Promise<Role> {
    return simulateRequest(() => {
      const role: Role = {
        ...roleData,
        id: Math.random().toString(36).substring(2, 9),
      };
      db.roles.push(role);
      return role;
    }, 'Failed to create role');
  },

  async update(id: string, roleData: Partial<Role>): Promise<Role> {
    return simulateRequest(() => {
      const index = db.roles.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Role not found');
      
      const updatedRole = {
        ...db.roles[index],
        ...roleData,
      };
      db.roles[index] = updatedRole;
      return updatedRole;
    }, 'Failed to update role');
  },

  async delete(id: string): Promise<void> {
    return simulateRequest(() => {
      const index = db.roles.findIndex((r) => r.id === id);
      if (index === -1) throw new Error('Role not found');
      db.roles.splice(index, 1);
    }, 'Failed to delete role');
  },
};