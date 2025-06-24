import { Tabs, router } from 'expo-router'
import { useTheme } from 'tamagui'
import { Home, User, LogOut } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'
import { DestructiveButton } from '../../components/ui'

export default function AppLayout() {
  const theme = useTheme()
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
      router.replace('/(auth)/login')
    } catch (error) {
      console.error('Logout error:', error)
      router.replace('/(auth)/login')
    }
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.blue10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
          borderBottomColor: theme.borderColor.val,
        },
        headerTintColor: theme.color.val,
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Home color={color as any} size={20} />,
          headerShown: true,
          headerRight: () => (
            <DestructiveButton
              size="$2"
              onPress={handleLogout}
              icon={<LogOut size={16} />}
              mr="$3"
            >
              Logout
            </DestructiveButton>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User color={color as any} size={20} />,
          headerShown: true,
          headerRight: () => (
            <DestructiveButton
              size="$2"
              onPress={handleLogout}
              icon={<LogOut size={16} />}
              mr="$3"
            >
              Logout
            </DestructiveButton>
          ),
        }}
      />
    </Tabs>
  )
}
