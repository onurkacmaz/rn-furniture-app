import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/screens/app/AppStack'
import AuthStack from './src/screens/auth/AuthStack'

export default function App() {

  const isLoggedIn = true;

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}