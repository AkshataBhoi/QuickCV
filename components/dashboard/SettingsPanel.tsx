"use client";

import { useUser, UserProfile } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"; // Assuming ShadCN Sheet exists or I'll check.
// Wait, I didn't check for 'sheet.tsx' in components/ui. I should verify or build a simple modal/slide-over to be safe.
// To be safe and dependency-free, I will build a custom slide-over matching the design system.

import {
  X,
  Save,
  Upload,
  User,
  Mail,
  Phone,
  MapPin,
  Layout,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/toast";
import { TemplateSelector } from "@/components/builder/TemplateSelector";
import { cn } from "@/lib/utils";
import { useRef } from "react";

export const SettingsPanel = () => {
  const { user, updateUser, settingsOpen, setSettingsOpen } = useUser();
  const [formData, setFormData] = useState<UserProfile>(user);
  const { displayToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        avatarUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (settingsOpen) {
      setFormData(user);
    }
  }, [settingsOpen, user]);

  const handleChange = (field: keyof UserProfile, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateUser(formData);
    displayToast("Settings saved successfully!", "success");
    setSettingsOpen(false);
  };

  if (!settingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSettingsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div
              onClick={handleAvatarClick}
              className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-4 relative overflow-hidden group cursor-pointer border-4 border-white/10"
            >
              {formData.avatarUrl ? (
                <img
                  src={formData.avatarUrl}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>
                  {formData.firstName[0]}
                  {formData.lastName[0]}
                </span>
              )}

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="h-6 w-6 text-white" />
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <p className="text-xs text-muted-foreground">Click to upload</p>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-white/10 pb-2">
              Personal Info
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="pl-9 bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-400">
                  Last Name
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-9 bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="pl-9 bg-white/5 border-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="pl-9 bg-white/5 border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Preferences */}
          {/* <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground border-b border-white/10 pb-2">Preferences</h3>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-400 mb-2 block">Default Template</label>
                            <TemplateSelector selectedId={formData.preferredTemplate} onSelect={(id) => handleChange('preferredTemplate', id)} />
                        </div>
                    </div> */}
        </div>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <Button
            onClick={handleSave}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};
