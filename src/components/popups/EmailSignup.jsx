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
import { Mail, Gift, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import about_mission from "../../../public/about_mission.jpg";

export default function EmailSignup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPopup = localStorage.getItem('grublify_newsletter_popup_shown');

    if (!hasSeenPopup) {
      // Show popup after 8 seconds
      const timer = setTimeout(() => {
        setOpen(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('grublify_newsletter_popup_shown', 'true');
    // Reset form state
    setEmail('');
    setIsSubmitting(false);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setIsSubmitting(false);

    // Close after showing success for 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        handleClose();
      }
    }}>
      <DialogContent className="p-0 overflow-hidden">
        {/* Background with gradient */}
        <div className="relative">


          {/* Main content with image */}
          <div className="flex">
            {/* Image section */}
            <div className="hidden sm:block w-1/3 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
              <Image
                src={about_mission}
                alt="Dog enjoying fresh food"
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Content section */}
            <div className="flex-1 p-8">
              {/* Header */}
              <div className="text-center sm:text-left mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 sm:hidden">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <DialogTitle className="text-2xl font-semibold text-foreground mb-2">
                  Join the Grublify Family! 🍽️
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-base leading-relaxed">
                  Get exclusive recipes, cooking tips, and <span className="font-semibold text-accent">15% off your first order</span> delivered straight to your inbox!
                </DialogDescription>
              </div>

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
                        Get My 10% Discount
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center sm:text-left">
                    No spam, just delicious content! Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                /* Success state */
                <div className="text-center sm:text-left py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Sparkles className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Welcome to the family! 🎉
                  </h3>
                  <p className="text-muted-foreground">
                    Check your email for your exclusive discount code!
                  </p>
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
