import React, { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { UserList } from './components/UserList';
import { RoleList } from './components/RoleList';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const { fetchUsers, fetchRoles } = useStore();

  useEffect(() => {
    // Initial data fetch
    fetchUsers();
    fetchRoles();
  }, [fetchUsers, fetchRoles]);

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-8">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'users' && <UserList />}
          {activeTab === 'roles' && <RoleList />}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;