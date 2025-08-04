import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReferralProgram() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button size="lg">
      <a 
        href="https://forms.gle/G4pcQ7rUf7fzksNf8" 
        target="_blank" 
        rel="noopener noreferrer"
      >
          Click for Referral Program Details
        </a>
      </Button>
    </div>
  );
};