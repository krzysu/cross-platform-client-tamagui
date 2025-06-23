import {
  YStack,
  XStack,
  H3,
  Paragraph,
  Button,
  Card,
  Avatar,
  Text,
  Input,
  ScrollView,
} from 'tamagui'
import { User, Mail, Calendar, Pencil } from '@tamagui/lucide-icons'
import { useAuth } from '../../contexts/AuthContext'

export default function ProfileScreen() {
  const { user } = useAuth()

  return (
    <YStack flex={1} bg="$background">
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
        <YStack gap="$6" maxW={600} width="100%" self="center" px="$4" py="$6">
          {/* Profile Picture Section */}
          <Card bg="$color2" borderColor="$borderColor" p="$4">
            <YStack gap="$4" items="center">
              <Avatar circular size="$8" bg="$blue9">
                <Avatar.Image
                  src={`https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(user?.name || 'User')}&backgroundColor=3b82f6&textColor=ffffff`}
                />
                <Avatar.Fallback bg="$blue9">
                  <User size={32} color="$blue12" />
                </Avatar.Fallback>
              </Avatar>
            </YStack>
          </Card>

          {/* Profile Information */}
          <YStack gap="$4">
            <H3 color="$color12">Personal Information</H3>

            {/* Name Field */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Full Name
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <User size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  value={user?.name}
                  editable={false}
                  color="$color11"
                />
              </XStack>
            </YStack>

            {/* Email Field */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                Email Address
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <Mail size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  value={user?.email}
                  editable={false}
                  color="$color11"
                />
              </XStack>
            </YStack>

            {/* User ID Field */}
            <YStack gap="$2">
              <Text color="$color11" fontSize="$3" fontWeight="500">
                User ID
              </Text>
              <XStack
                bg="$color2"
                borderColor="$borderColor"
                borderWidth={1}
                items="center"
                px="$3"
                height={50}
              >
                <Calendar size={20} color="$color10" />
                <Input
                  flex={1}
                  borderWidth={0}
                  bg="transparent"
                  value={user?.id}
                  editable={false}
                  color="$color11"
                />
              </XStack>
            </YStack>
          </YStack>

          {/* Action Buttons */}
          <YStack gap="$3">
            <Button size="$4" bg="$blue9" color="$blue12" icon={<Pencil size={16} />}>
              Edit Profile
            </Button>

            <Button
              size="$4"
              bg="$color3"
              borderColor="$borderColor"
              borderWidth={1}
              color="$color11"
            >
              Change Password
            </Button>
          </YStack>

          {/* Account Info */}
          <Card bg="$blue2" borderColor="$blue6" p="$4">
            <YStack gap="$2">
              <H3 color="$blue11">Account Status</H3>
              <Paragraph color="$blue11" size="$3">
                Your account is active and verified. You have full access to all features.
              </Paragraph>
            </YStack>
          </Card>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
