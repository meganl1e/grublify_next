import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReferralProgram() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Button size="lg">
        <Link href="https://docs.google.com/document/d/127gR3VBQ_mjlzP8Qjf5ohRxaV0qyRUHDL5zVzEs6pFc/edit?usp=drive_link">
          Click for Referral Program Details
        </Link>
      </Button>
    </div>
  );
};