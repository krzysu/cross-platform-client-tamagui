import {
  YStack,
  XStack,
  H1,
  H3,
  Paragraph,
  Card,
  Avatar,
  Text,
  ScrollView,
} from 'tamagui'
import { User } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'

export default function DashboardScreen() {
  const { user } = useAuth()

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$6" maxW={600} width="100%" self="center" px="$4" py="$6">
          {/* Header */}
          <YStack gap="$2">
            <H1 color="$color12">Dashboard</H1>
            <Paragraph color="$color11">Welcome back, {user?.name}!</Paragraph>
          </YStack>

          {/* User Profile Card */}
          <Card bg="$color2" borderColor="$borderColor" p="$4">
            <XStack gap="$4" items="center">
              <Avatar circular size="$6" bg="$blue9">
                <Avatar.Image
                  src={`https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=3b82f6&textColor=ffffff`}
                />
                <Avatar.Fallback bg="$blue9">
                  <User size={24} color="$blue12" />
                </Avatar.Fallback>
              </Avatar>
              <YStack flex={1} gap="$1">
                <H3 color="$color12">{user?.name}</H3>
                <Text color="$color11" fontSize="$3">
                  {user?.email}
                </Text>
                <Text color="$color10" fontSize="$2">
                  User ID: {user?.id}
                </Text>
              </YStack>
            </XStack>
          </Card>

          {/* Protected Content Info */}
          <Card bg="$yellow2" borderColor="$yellow6" p="$4">
            <YStack gap="$2">
              <H3 color="$yellow11">🎉 Protected Content</H3>
              <Paragraph color="$yellow11" size="$3">
                This dashboard is only accessible to authenticated users. You successfully
                logged in and can now access protected features of the application.
              </Paragraph>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
