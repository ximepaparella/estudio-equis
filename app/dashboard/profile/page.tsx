"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { User, Mail, Lock, Bell, Globe, Upload, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "UI/UX Designer",
    bio: "Passionate designer with 5+ years of experience in creating user-centered digital experiences.",
    location: "New York, USA",
    phone: "+1 (555) 123-4567",
    website: "https://johndoe.design",
    timezone: "America/New_York",
    language: "English",
    notifications: {
      email: true,
      push: true,
      taskAssigned: true,
      taskUpdated: true,
      projectUpdated: true,
      mentions: true,
    },
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would send the data to the server
    console.log("Saving profile:", profileData)
    setIsEditing(false)
    setSuccessMessage("Profile updated successfully")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleChangePassword = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match")
      return
    }

    // In a real app, this would send the data to the server
    console.log("Changing password:", passwordData)
    setIsChangingPassword(false)
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setSuccessMessage("Password changed successfully")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Profile Settings</h1>
      </div>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-green-900/20 border border-green-700 text-green-400 p-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
          <button onClick={() => setSuccessMessage(null)} className="text-green-400 hover:text-green-300">
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-800">
            <TabsList className="bg-gray-900 p-0">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-none border-r border-gray-800 px-6 py-3"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-none border-r border-gray-800 px-6 py-3"
              >
                Security
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-none px-6 py-3"
              >
                Notifications
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile" className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden mb-4 border-4 border-gray-700">
                    <Image
                      src="/placeholder.svg?height=128&width=128&text=JD"
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <button className="text-white bg-gray-700/80 p-2 rounded-full">
                          <Upload className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-1">{profileData.name}</h2>
                  <p className="text-gray-400 mb-4">{profileData.role}</p>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:text-white"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2 justify-center">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-2/3 space-y-6">
                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="name"
                            name="name"
                            value={profileData.name}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-gray-900 border-gray-700 text-white pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                          Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-gray-900 border-gray-700 text-white pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
                        Role
                      </label>
                      <Input
                        id="role"
                        name="role"
                        value={profileData.role}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className="bg-gray-900 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                        Bio
                      </label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleProfileChange}
                        disabled={!isEditing}
                        className="bg-gray-900 border-gray-700 text-white min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                          Location
                        </label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                          Phone
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="bg-gray-900 border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            id="website"
                            name="website"
                            value={profileData.website}
                            onChange={handleProfileChange}
                            disabled={!isEditing}
                            className="bg-gray-900 border-gray-700 text-white pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-300 mb-1">
                          Timezone
                        </label>
                        <Select
                          value={profileData.timezone}
                          onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}
                          disabled={!isEditing}
                        >
                          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700 text-white">
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                            <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="p-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Current Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      disabled={!isChangingPassword}
                      className="bg-gray-900 border-gray-700 text-white pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      disabled={!isChangingPassword}
                      className="bg-gray-900 border-gray-700 text-white pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      disabled={!isChangingPassword}
                      className="bg-gray-900 border-gray-700 text-white pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {!isChangingPassword ? (
                    <Button
                      onClick={() => setIsChangingPassword(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                    >
                      Change Password
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => setIsChangingPassword(false)}
                        variant="outline"
                        className="border-gray-700 text-gray-300 hover:text-white"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleChangePassword}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                      >
                        Save New Password
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-bold mb-4">Two-Factor Authentication</h3>
              <p className="text-gray-400 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                Enable 2FA
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="p-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium mb-3">Notification Channels</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Email Notifications</span>
                      </div>
                      <Switch
                        checked={profileData.notifications.email}
                        onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-gray-400 mr-3" />
                        <span>Push Notifications</span>
                      </div>
                      <Switch
                        checked={profileData.notifications.push}
                        onCheckedChange={(checked) => handleNotificationChange("push", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium mb-3">Notification Types</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>When a task is assigned to me</span>
                      <Switch
                        checked={profileData.notifications.taskAssigned}
                        onCheckedChange={(checked) => handleNotificationChange("taskAssigned", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>When a task I'm assigned to is updated</span>
                      <Switch
                        checked={profileData.notifications.taskUpdated}
                        onCheckedChange={(checked) => handleNotificationChange("taskUpdated", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>When a project I'm part of is updated</span>
                      <Switch
                        checked={profileData.notifications.projectUpdated}
                        onCheckedChange={(checked) => handleNotificationChange("projectUpdated", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>When I'm mentioned in comments</span>
                      <Switch
                        checked={profileData.notifications.mentions}
                        onCheckedChange={(checked) => handleNotificationChange("mentions", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white"
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
