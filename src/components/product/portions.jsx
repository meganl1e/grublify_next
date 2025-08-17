import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Portions() {
  return (
    <div className="flex flex-col max-w-md gap-4 mt-8 h-full">
      <h1 className="text-2xl text-secondary font-semibold">How Long One Nutrition Pack Lasts*</h1>
      <Button variant="secondary" className="w-auto self-start">
        <Link href="/recipes/portion-calculator">Get My Dog’s Precise Portion</Link>
      </Button>
      <table className="table-fixed min-w-[320px] border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
        <thead>
          <tr className="bg-gray-100 text-secondary">
            <th className="w-1/2 px-4 py-2 border-b text-left">Dog Weight (lbs)</th>
            <th className="w-1/2 px-4 py-2 border-b text-left">Feeds For</th>
          </tr>
        </thead>
        <tbody className="text-secondary">
          <tr>
            <td className="px-4 py-2 border-b">5</td>
            <td className="px-4 py-2 border-b">~31 days</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">10</td>
            <td className="px-4 py-2 border-b">~18 days</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">20</td>
            <td className="px-4 py-2 border-b">~9 days</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">35</td>
            <td className="px-4 py-2 border-b">~7 days</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b">50</td>
            <td className="px-4 py-2 border-b">~5 days</td>
          </tr>
          <tr>
            <td className="px-4 py-2">75</td>
            <td className="px-4 py-2">~4 days</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm max-w-md text-gray-600">*The table above has approximate feeding guidelines. As a general rule, feed your Adult Dog  1-2  times per day. Factors such as age, activity level, breed all play a			
part in the necessary feeding quantities of all dogs. Use the suggested guidelines below, adjust the feeding			
quantities as necessary to maintain your pet’s ideal body score (BCS). Please consult with your veterinarian or		
contact hello@grublify.com if you have specific questions about how much to feed.</p>
    </div>
  )
}