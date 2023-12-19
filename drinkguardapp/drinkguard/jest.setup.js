
  jest.mock('./components/UserContext', () => {
    const React = require('react');
    const mockUserContextValue = {
      currentUser: {
        uid: '55WvYIB8oFNEKkAoJNhHMR5mTEy2',
        email: 'Blahblah@gmail.com',
        firstName: 'Anara',
        lastName: 'Ebrima',
        phone: '773-234-2352',
        username: 'aebrima89',
        friends: {},
        history: {},
        notifications: {},
      },
      setCurrentUser: jest.fn(),
    };
  
    return {
      __esModule: true,
      UserContext: React.createContext(mockUserContextValue),
    };
  });
  
  
  jest.mock('expo-linear-gradient', () => 'LinearGradient');
  jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  
  jest.mock('@firebase/database', () => ({
    getDatabase: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    onValue: jest.fn(),
    off: jest.fn(),
    ref: jest.fn(),
  }));
  
  // Mock SettingsManager if necessary
  jest.mock('react-native/Libraries/Settings/Settings', () => ({
    get: jest.fn(),
    set: jest.fn(),
    watchKeys: jest.fn(),
  }));

  jest.mock('@react-navigation/native', () => ({
    useNavigation: jest.fn(),
  }));
  
  // ... any other necessary mocks
  