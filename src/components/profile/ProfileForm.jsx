"use client";
import React, { useState } from "react";

export default function ProfileForm({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.emailAddress?.emailAddress || "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.emailAddress?.emailAddress || "",
    });
    setEditing(false);
    setStatus(null);
  };

  const handleSave = async () => {
    setStatus("saving");
    const res = await fetch("/api/shopify/customer-update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("success");
      setEditing(false);
    } else {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded shadow max-w-lg mx-auto p-6">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500 mr-4">
          {form.firstName?.[0] || "?"}
        </div>
        <div>
          <div className="text-xl font-semibold">{form.firstName} {form.lastName}</div>
          <div className="text-gray-500">{form.email}</div>
        </div>
      </div>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            disabled={!editing}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled
            className="mt-1 block w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div className="flex gap-2 mt-4">
          {editing ? (
            <>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-white rounded"
                disabled={status === "saving"}
              >
                {status === "saving" ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                disabled={status === "saving"}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-secondary text-white rounded"
            >
              Edit
            </button>
          )}
        </div>
        {status === "success" && (
          <div className="text-green-600 mt-2">Profile updated!</div>
        )}
        {status === "error" && (
          <div className="text-red-600 mt-2">Error updating profile. Please try again.</div>
        )}
      </form>
    </div>
  );
} 