"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Mail, Gift, Sparkles } from 'lucide-react';
import Image from 'next/image';
import about_mission from "../../../public/about_mission.jpg";
import email_image from "../../../public/email.jpg";

export default function EmailSignup({ open, setOpen }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if popup was shown this session
    const popupShown = sessionStorage.getItem('email_popup_shown');
    let shouldShowPopup = true;
  
    if (popupShown) {
      shouldShowPopup = false; // Already shown this session, don't show again
    }
  
    if (shouldShowPopup) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setOpen(true);
        // Mark popup as shown in this session
        sessionStorage.setItem('email_popup_shown', 'true');
      }, 5000);
  
      return () => clearTimeout(timer);
    }
  }, []);
  

  // closes popup
  const handleClose = () => {
    setOpen(false);

    // Reset form state
    setEmail('');
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  // goes to klaviyo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setIsSubmitting(false);

      } else {
        throw new Error(data.error || 'Failed to subscribe');
      }
    } catch (error) {
      console.error('Email signup error:', error);
      setIsSubmitting(false);
      // You could add error state handling here if needed
      alert('Failed to subscribe. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        handleClose();
      }
    }}>
      <DialogContent className="p-0 overflow-hidden border-6 border-primary">
        {/* Background with gradient */}
        <div className="relative">


          {/* Main content with image */}
          <div className="flex">
            {/* Image section */}
            <div className="hidden sm:block w-1/3 relative overflow-hidden">
              <Image
                src={email_image}
                alt="Dog enjoying fresh food"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Content section */}
            <div className="flex-1 p-8">
              {/* Header - only show when not in success state */}
              {!isSuccess && (
                <div className="text-center sm:text-left mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 sm:hidden">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-secondary mb-2">
                    GET 40% OFF YOUR FIRST ORDER!
                  </DialogTitle>
                  <DialogDescription className="text-secondary text-base leading-relaxed">
                    Balanced homemade meals for your dog, made easy. Sign up for nutrition tips, simple recipes, and 40% off!
                  </DialogDescription>
                </div>
              )}

              {/* Form */}
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                        className="h-12 text-base pr-12"
                      disabled={isSubmitting}
                    />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                   
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-200"
                    disabled={isSubmitting || !email}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Gift className="w-5 h-5 mr-2" />
                        Get My 40% Discount
                      </>
                    )}
                  </Button>
                  
                  <Button
                    className="text-muted-foreground w-full h-4"
                    variant="link"
                    onClick={handleClose}
                  >
                    I’ll stick to kibble (for now)
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    No spam or sharing. Opt out anytime.
                  </p>
                </form>
              ) : (
                /* Success state */
                <div className="text-center sm:text-left py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">
                    Success! Your pup's about to eat better. 🐾 
                  </h3>
                  <p className="text-secondary mb-6">
                    Check your email for your exclusive discount code!
                  </p>
                  <Button
                    onClick={handleClose}
                    className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all duration-200 cursor-pointer"
                    variant="default"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Custom close button */}
        <DialogClose
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all duration-200 border border-border/50"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
