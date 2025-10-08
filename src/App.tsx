import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, UserPlus, CheckCircle2, AlertCircle, Moon, Sun } from 'lucide-react';
import { supabase, type User } from './lib/supabase';

type NotificationType = 'success' | 'error' | null;

function App() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: NotificationType; message: string } | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
    } else {
      setUsers(data || []);
    }
  };

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from('users')
      .insert([{ name: name.trim(), email: email.trim() }]);

    setLoading(false);

    if (error) {
      if (error.code === '23505') {
        showNotification('error', 'Email already exists');
      } else {
        showNotification('error', 'Failed to save user');
      }
    } else {
      showNotification('success', 'User saved successfully!');
      setName('');
      setEmail('');
      setOpen(false);
      fetchUsers();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-secondary p-8 transition-colors duration-300">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 left-4 z-50 p-3 bg-bg-secondary border border-border-color rounded-lg shadow-lg hover:shadow-xl transition-all animate-bounce-in"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="text-accent" size={24} /> : <Moon className="text-text-primary" size={24} />}
      </button>

      {notification && (
        <div className={`notification animate-slide-down ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4 animate-slide-up">
            User Management
          </h1>
          <p className="text-text-secondary text-lg mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Add and manage users with Supabase database integration
          </p>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button className="btn-primary inline-flex items-center gap-2 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <UserPlus size={20} />
                Add New User
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-secondary border border-border-color rounded-xl shadow-2xl p-6 w-full max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
                <Dialog.Title className="text-2xl font-bold text-text-primary mb-2">
                  Add New User
                </Dialog.Title>
                <Dialog.Description className="text-text-secondary mb-6">
                  Enter the user's information to save it to the database.
                </Dialog.Description>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      disabled={loading}
                    />
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Dialog.Close asChild>
                      <button
                        type="button"
                        className="flex-1 btn-secondary"
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </Dialog.Close>
                    <button
                      type="submit"
                      className="flex-1 btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Submit'}
                    </button>
                  </div>
                </form>

                <Dialog.Close asChild>
                  <button
                    className="absolute top-4 right-4 text-text-secondary hover:text-text-primary transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="card animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-border-color">
            <h2 className="text-2xl font-semibold text-text-primary">Registered Users</h2>
            <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
              {users.length}
            </span>
          </div>
          <div className="space-y-3">
            {users.length === 0 ? (
              <div className="py-12 text-center text-text-secondary animate-fade-in">
                No users yet. Add your first user to get started!
              </div>
            ) : (
              users.map((user, index) => (
                <div
                  key={user.id}
                  className="p-4 rounded-lg border border-border-color hover:border-accent/50 bg-bg-primary hover:bg-accent/5 transition-all duration-200 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{user.name}</h3>
                      <p className="text-text-secondary text-sm">{user.email}</p>
                    </div>
                    <div className="text-xs text-text-secondary bg-bg-secondary px-3 py-1 rounded-full border border-border-color">
                      {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
