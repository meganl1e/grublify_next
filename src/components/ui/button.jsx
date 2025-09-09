import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 cursor-pointer",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 cursor-pointer group relative",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",
        enhanced:
          "bg-gradient-to-r from-secondary to-secondary/90 text-white font-semibold border-2 border-secondary rounded-2xl hover:from-secondary/90 hover:to-secondary shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 cursor-pointer group relative",
        enhancedOutline:
          "bg-white/80 backdrop-blur-sm border-2 border-secondary/80 text-secondary font-semibold rounded-2xl hover:bg-white hover:border-secondary hover:text-secondary shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 cursor-pointer group relative",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-2xl px-10 py-6 text-lg has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button"
  const isEnhanced = variant === "enhanced" || variant === "enhancedOutline"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isEnhanced ? (
        <>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
          </span>
          {variant === "enhanced" && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          )}
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants }
