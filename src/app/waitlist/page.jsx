'use client';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Waitlist() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (newWaitlist) => {
      return axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/waitlists`, 
        {data: newWaitlist}
      );
    },
    onSuccess: () => {
      setSuccessMessage("Successfully joined waitlist! We'll be in touch soon with updates.");
      setErrorMessage("");
      reset();
    },
    onError: () => {
      setErrorMessage("Error joining waitlist. Please try again later.");
      setSuccessMessage("");
    },
  });

  const onSubmit = (data) => {
    setSuccessMessage("");
    setErrorMessage("");
    mutation.mutate(data);
  };

  return (
    <div className="flex-1 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
              Join Our Waitlist
            </h1>
            <p className="text-lg md:text-xl text-secondary/80 mb-8">
              Be among the first to give your dog the nutrition they deserve. Sign up for early access and exclusive updates.
            </p>
            <div className="w-full h-90 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Happy dog"
                className="rounded-md shadow-xl object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="bg-white md:p-8 rounded-lg md:shadow-md">
            {/* Success/Error Messages */}
            {successMessage && (
              <div className="mb-4 p-3 rounded bg-green-100 text-green-800 font-medium">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 p-3 rounded bg-red-100 text-red-800 font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-md font-medium text-secondary">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:ring-2 focus:outline-none sm:text-sm px-4 py-2"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-md font-medium text-secondary">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:ring-2 focus:outline-none sm:text-sm px-4 py-2"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-md font-medium text-secondary">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  className="mt-1 block w-full rounded-sm border border-gray-300 shadow-sm focus:ring-2 focus:outline-none sm:text-sm px-4 py-2 h-48"
                  placeholder="Tell us about your dog and what you're looking for..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-primary text-white font-bold rounded-md shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}