'use client';

import { useEffect, useRef } from 'react';
import { Heart, Shield, Clock, DollarSign, CheckCircle, Users, Award, Leaf, Stethoscope, BookOpen, Zap, Smile, Eye, Star } from 'lucide-react';

const benefits = [
  { icon: Stethoscope, text: "Healthier, Happier Dogs" },
  { icon: Award, text: "Meets AAFCO Standards" },
  { icon: BookOpen, text: "Nutritionist Formulated" },
  { icon: Zap, text: "Quick & Easy Prep" },
  { icon: Eye, text: "Real Ingredients" },
  { icon: Star, text: "Guaranteed Quality" },
  { icon: Stethoscope, text: "Healthier, Happier Dogs" },
  { icon: Award, text: "Meets AAFCO Standards" },
  { icon: BookOpen, text: "Nutritionist Formulated" },
  { icon: Zap, text: "Quick & Easy Prep" }
];

export default function ScrollShowcase() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;
    const itemWidth = 240;
    const totalWidth = benefits.length * itemWidth;
    let animationId = null;
    let isPaused = false;
    let isDestroyed = false;
    let lastTime = 0;

    const autoScroll = (currentTime) => {
      // Check if component is still mounted and not paused
      if (isDestroyed || isPaused || !scrollContainer) {
        return;
      }
      
      try {
        // Use time-based animation for more consistent scrolling
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        scrollAmount += scrollSpeed;
        
        // Reset to beginning when we've scrolled through all items
        if (scrollAmount >= totalWidth) {
          scrollAmount = 0;
        }
        
        if (scrollContainer && scrollContainer.scrollLeft !== undefined) {
          scrollContainer.scrollLeft = scrollAmount;
        }
        
        // Schedule next frame
        animationId = requestAnimationFrame(autoScroll);
      } catch (error) {
        console.error('Auto-scroll error:', error);
        // Restart animation after error
        setTimeout(() => {
          if (!isDestroyed && !isPaused && scrollContainer) {
            lastTime = performance.now();
            animationId = requestAnimationFrame(autoScroll);
          }
        }, 100);
      }
    };

    // Start auto-scrolling
    const startScrolling = () => {
      if (isDestroyed || isPaused || !scrollContainer) return;
      
      // Cancel any existing animation
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      lastTime = performance.now();
      animationId = requestAnimationFrame(autoScroll);
    };

    // Handle visibility change (tab focus)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      } else {
        isPaused = false;
        startScrolling();
      }
    };

    // Pause on hover
    const handleMouseEnter = () => {
      isPaused = true;
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    };

    const handleMouseLeave = () => {
      isPaused = false;
      startScrolling();
    };

    // Start the animation
    startScrolling();

    // Add event listeners
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      isDestroyed = true;
      isPaused = true;
      
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className="py-8 bg-primary">
      <div className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-16 items-center overflow-x-auto scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            width: '100%'
          }}
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center gap-3 text-secondary duration-300"
                style={{ minWidth: '240px' }}
              >
                <Icon className="w-8 h-8" />
                <span className="text-md font-semibold whitespace-nowrap">
                  {benefit.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
