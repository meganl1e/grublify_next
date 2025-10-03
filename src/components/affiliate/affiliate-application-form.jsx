"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function AffiliateApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (data) => {
    const newErrors = {};

    // Check required fields
    if (!data.name || data.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (!data.email || data.email.trim() === '') {
      newErrors.email = 'Email is required';
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.email && !emailRegex.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Check at least one social media handle
    const hasSocialMedia = data.instagram || data.tiktok || data.youtube || data.website;
    if (!hasSocialMedia) {
      newErrors.socialMedia = 'Please provide at least one social media handle or website';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      instagram: formData.get('instagram'),
      tiktok: formData.get('tiktok'),
      youtube: formData.get('youtube'),
      website: formData.get('website'),
      additionalInfo: formData.get('additionalInfo')
    };

    // Validate form
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Make API call:
    try {
      const response = await fetch('/api/affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        e.target.reset(); // Clear form
      } else {
        setErrors({ submit: result.error || 'Failed to submit application' });
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit application. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="application-form" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-secondary mb-4 text-center">Ready to Get Started?</h2>
          <p className="text-lg text-foreground mb-8 text-center">
            Join our affiliate program in just 2 minutes!
          </p>


          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-secondary mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-secondary mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* <div>
              <label htmlFor="audience" className="block text-sm font-semibold text-secondary mb-2">Tell us about your audience *</label>
              <textarea
                id="audience"
                name="audience"
                required
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Briefly describe your followers or how you'll promote Grublify..."
              />
            </div> */}

            <div>
              {/* <label className="block text-sm font-semibold text-secondary mb-2">Social Media Platforms</label> */}
              {errors.socialMedia && (
                <p className="text-red-500 text-sm mb-3">{errors.socialMedia}</p>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="instagram" className="block text-sm font-semibold text-gray-600 mb-1">Instagram</label>
                  <input
                    type="text"
                    id="instagram"
                    name="instagram"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="@yourhandle"
                  />
                </div>
                <div>
                  <label htmlFor="tiktok" className="block text-sm font-semibold text-gray-600 mb-1">TikTok</label>
                  <input
                    type="text"
                    id="tiktok"
                    name="tiktok"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="@yourhandle"
                  />
                </div>
                <div>
                  <label htmlFor="youtube" className="block text-sm font-semibold text-gray-600 mb-1">YouTube</label>
                  <input
                    type="text"
                    id="youtube"
                    name="youtube"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="@yourhandle"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-semibold  text-gray-600 mb-1">Website/Blog</label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-semibold text-secondary mb-2">Additional information</label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Any questions or additional info..."
              />
            </div>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Apply Now'}
              </Button>
            </div>

          </form>

          <p className="text-center text-sm text-gray-600 m-6">
            Questions? Email us at{" "}
            <a href="mailto:hello@grublify.com" className="text-primary hover:underline font-semibold">
              hello@grublify.com
            </a>
          </p>

          {showSuccess && (
            <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold">🎉 Application submitted successfully!</p>
              <p className="text-green-600 text-sm mt-1">We'll get back to you within 24 hours!</p>
            </div>
          )}

          {errors.submit && (
            <p className="text-red-500 text-sm mt-2 text-center">{errors.submit}</p>
          )}
        </div>
      </div>

    </section>
  )
}
