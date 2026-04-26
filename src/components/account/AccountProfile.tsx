// components/AccountProfile.tsx
"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/profile";

interface AccountProfileProps {
  profile: any;
  userId: string;
}

export default function AccountProfile({
  profile,
  userId,
}: AccountProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await updateProfile(userId, formData);
      if (result.success) {
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(result.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">
          Profile Information
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-[#CE978C] hover:underline"
          >
            Edit Profile
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-600">Email</label>
            <p className="text-slate-800">{profile?.email || "Not provided"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Full Name
            </label>
            <p className="text-slate-800">
              {profile?.full_name || "Not provided"}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Phone</label>
            <p className="text-slate-800">{profile?.phone || "Not provided"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">
              Address
            </label>
            <p className="text-slate-800">
              {profile?.address || "Not provided"}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-[#CE978C] focus:outline-none focus:ring-1 focus:ring-[#CE978C]"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-[#CE978C] px-4 py-2 text-white hover:bg-[#b8857a] disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
