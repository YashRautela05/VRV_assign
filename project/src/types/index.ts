export type Permission = 'read' | 'write' | 'delete' | 'manage';

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
  createdAt: string;
}