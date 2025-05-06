import { Stack } from 'expo-router';
import '../global.css';

export default function Layout() {
  return (
    <>
      {/* <StatusBar barStyle={'light-content'} /> */}
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
