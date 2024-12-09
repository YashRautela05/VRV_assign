import { User, Role } from '../types';

interface DB {
  users: User[];
  roles: Role[];
}

// Initial mock data
export const db: DB = {
  roles: [
    {
      id: '1',
      name: 'Admin',
      permissions: ['read', 'write', 'delete', 'manage'],
      description: 'Full system access',
    },
    {
      id: '2',
      name: 'Editor',
      permissions: ['read', 'write'],
      description: 'Can read and modify content',
    },
  ],
  users: [
    {
      id: '1',
      name: 'Yash Rautela',
      email: 'rautelayash1205@gmail.com',
      avatar: 'C:\\Users\raute\\OneDrive\\Desktop',
      roleId: '1',
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ],
};