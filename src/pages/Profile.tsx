
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { RhythmHeader } from "@/components/rhythm-header";
import { RhythmNav } from "@/components/rhythm-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, BellIcon, MoonIcon, LockIcon, BookmarkIcon, HeartIcon, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define a TypeScript interface for the profile data
interface ProfileData {
  id: string;
  created_at: string | null;
  updated_at: string | null;
  full_name: string | null;
  email: string | null;
  birthdate: string | null;
  cycle_length: number | null;
  period_length: number | null;
  period_notif: boolean | null;
  ovulation_notif: boolean | null;
  content_notif: boolean | null;
  dark_mode: boolean | null;
  privacy_mode: boolean | null;
  terms_accepted: boolean | null;
  terms_accepted_at: string | null;
}

// Define the profile schema using zod
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  cycleLength: z.coerce.number().int().min(20).max(40),
  periodLength: z.coerce.number().int().min(1).max(10),
  birthdate: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [userInitials, setUserInitials] = useState("U");

  // Notification states
  const [periodNotif, setPeriodNotif] = useState(true);
  const [ovulationNotif, setOvulationNotif] = useState(true);
  const [contentNotif, setContentNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);

  // Initialize form with empty values
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cycleLength: 28,
      periodLength: 5,
      birthdate: "",
    },
  });

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        if (data) {
          const profileData = data as ProfileData;
          
          // Update form with user data
          form.reset({
            fullName: profileData.full_name || "",
            email: user.email || "",
            cycleLength: profileData.cycle_length || 28,
            periodLength: profileData.period_length || 5,
            birthdate: profileData.birthdate || "",
          });

          // Generate initials from name
          if (profileData.full_name) {
            const nameParts = profileData.full_name.split(" ");
            const initials = nameParts.length > 1
              ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
              : nameParts[0][0].toUpperCase();
            setUserInitials(initials);
          }

          // Set notification preferences
          setPeriodNotif(profileData.period_notif || true);
          setOvulationNotif(profileData.ovulation_notif || true);
          setContentNotif(profileData.content_notif || false);
          setDarkMode(profileData.dark_mode || false);
          setPrivacyMode(profileData.privacy_mode || false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.fullName,
          cycle_length: values.cycleLength,
          period_length: values.periodLength,
          birthdate: values.birthdate || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully");

      // Update initials
      const nameParts = values.fullName.split(" ");
      const initials = nameParts.length > 1
        ? (nameParts[0][0] + nameParts[1][0]).toUpperCase()
        : nameParts[0][0].toUpperCase();
      setUserInitials(initials);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const updateNotificationSettings = async (field: string, value: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          [field]: value,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Settings updated");
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rhythm-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <RhythmHeader title="Profile" showProfile={false} />
      
      <main className="container px-4 pt-6 pb-20">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 border-2 border-rhythm-primary">
            <AvatarFallback className="bg-gradient-to-tr from-rhythm-secondary to-rhythm-tertiary text-white text-2xl">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-semibold mt-4">{form.getValues("fullName") || "User"}</h2>
          <p className="text-gray-500">Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "2025"}</p>
        </div>
        
        <div className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormDescription>
                          Email cannot be changed
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="birthdate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" {...field} />
                            <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Settings</CardTitle>
                  <CardDescription>Customize your cycle preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="cycleLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Cycle Length</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input type="number" {...field} />
                            <span className="ml-2">days</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="periodLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Period Length</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Input type="number" {...field} />
                            <span className="ml-2">days</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Changes
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>
          
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BellIcon className="h-5 w-5 text-rhythm-secondary" />
                  <Label htmlFor="period-notif">Period Reminders</Label>
                </div>
                <Switch 
                  id="period-notif" 
                  checked={periodNotif} 
                  onCheckedChange={(checked) => {
                    setPeriodNotif(checked);
                    updateNotificationSettings("period_notif", checked);
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <HeartIcon className="h-5 w-5 text-rhythm-secondary" />
                  <Label htmlFor="ovulation-notif">Ovulation Reminders</Label>
                </div>
                <Switch 
                  id="ovulation-notif" 
                  checked={ovulationNotif}
                  onCheckedChange={(checked) => {
                    setOvulationNotif(checked);
                    updateNotificationSettings("ovulation_notif", checked);
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <BookmarkIcon className="h-5 w-5 text-rhythm-secondary" />
                  <Label htmlFor="content-notif">New Content Notifications</Label>
                </div>
                <Switch 
                  id="content-notif" 
                  checked={contentNotif}
                  onCheckedChange={(checked) => {
                    setContentNotif(checked);
                    updateNotificationSettings("content_notif", checked);
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <MoonIcon className="h-5 w-5 text-rhythm-secondary" />
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                </div>
                <Switch 
                  id="dark-mode" 
                  checked={darkMode}
                  onCheckedChange={(checked) => {
                    setDarkMode(checked);
                    updateNotificationSettings("dark_mode", checked);
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <LockIcon className="h-5 w-5 text-rhythm-secondary" />
                  <Label htmlFor="privacy-mode">Privacy Mode</Label>
                </div>
                <Switch 
                  id="privacy-mode" 
                  checked={privacyMode}
                  onCheckedChange={(checked) => {
                    setPrivacyMode(checked);
                    updateNotificationSettings("privacy_mode", checked);
                  }}
                />
              </div>
            </CardContent>
          </Card>
          
          <Button variant="outline" className="w-full" onClick={handleSignOut}>Sign Out</Button>
          
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>Rhythm v1.0.0</p>
            <div className="mt-1">
              <a href="/terms" className="underline">Terms of Service</a>
              {" • "}
              <a href="#" className="underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </main>
      
      <RhythmNav />
    </div>
  );
};

export default Profile;
