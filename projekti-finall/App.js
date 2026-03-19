import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import CarListScreen from './screens/CarListScreen';
import CarDetailScreen from './screens/CarDetailScreen';
import FinancingCalculatorScreen from './screens/FinancingCalculatorScreen';
import ContactScreen from './screens/ContactScreen';
import AboutScreen from './screens/AboutScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import CompareScreen from './screens/CompareScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import LocationScreen from './screens/LocationScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  const { user } = useContext(AuthContext);

  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerStyle: { backgroundColor: '#2c3e50' }, headerTintColor: '#fff' }}>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Elite Auto Dealership' }} />
      <Drawer.Screen name="CarList" component={CarListScreen} options={{ title: 'Inventory' }} />
      <Drawer.Screen name="CarDetail" component={CarDetailScreen} options={{ title: 'Car Details', drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="Compare" component={CompareScreen} options={{ title: 'Compare Cars' }} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'My Favorites' }} />
      <Drawer.Screen name="FinancingCalculator" component={FinancingCalculatorScreen} options={{ title: 'Financing Calculator' }} />
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ title: 'Contact Us' }} />
      <Drawer.Screen name="About" component={AboutScreen} options={{ title: 'About Us' }} />
      {user ? (
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
      )}
    </Drawer.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#2c3e50' }, headerTintColor: '#fff' }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Sign In' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  const { user, loading } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);

  if (loading) {
    return null; // Or a loading screen
  }

  const combinedPaperTheme = isDark ? PaperDarkTheme : PaperDefaultTheme;
  const combinedNavTheme = isDark ? NavigationDarkTheme : NavigationDefaultTheme;

  return (
    <PaperProvider theme={combinedPaperTheme}>
      <NavigationContainer theme={combinedNavTheme}>
        {user ? <DrawerNavigator /> : <AuthNavigator />}
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <FavoritesProvider>
          <AppNavigator />
        </FavoritesProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
