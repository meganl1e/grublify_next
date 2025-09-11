'use client';
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function Contact() {
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
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (contactData) => {
      return axios.post('/api/contact', contactData);
    },
    onSuccess: () => {
      setSuccessMessage("Thank you for contacting us! We'll get back to you within 24 hours.");
      setErrorMessage("");
      reset();
    },
    onError: () => {
      setErrorMessage("Error sending your message. Please try again later.");
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
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-secondary">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-secondary/80 max-w-3xl mx-auto">
            Have questions about our products, need support with your order, or want to learn more about our nutrition packs? We're here to help and will get back to you within 24 hours.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image */}
            <div className="order-2 md:order-1">
              <div className="w-full h-96 overflow-hidden rounded-lg shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Happy dog"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="order-1 md:order-2">
              <Card>
                <CardContent>
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
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                          Name *
                        </label>
                        <Input
                          id="name"
                          type="text"
                          {...register("name", { required: "Name is required" })}
                          placeholder="Your name"
                          className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email address",
                            },
                          })}
                          placeholder="your@email.com"
                          className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        type="text"
                        {...register("subject")}
                        placeholder="What's this about?"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        {...register("message", { required: "Message is required" })}
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tell us how we can help you..."
                        rows={6}
                      />
                      {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                      size="lg"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}