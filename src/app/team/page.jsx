import Image from "next/image";
import { Card } from "@/components/ui/card";

// Helper to fetch blogs from Strapi
async function fetchTeam() {
  try {
    const query = '?populate[teamMembers][populate]=profilePicture';
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/team${query}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch team data');
    }

    const data = await res.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching team data:', error);
    return null;
  }
}

export default async function Team() {
  const team = await fetchTeam();

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary mb-4">Unable to load team information</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 "></div>
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6 animate-slide-in">
              {team.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-slide-in" style={{ animationDelay: '0.1s' }}>
              {team.description}
            </p>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {team.teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden backdrop-blur-sm border-0 rounded-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-in p-0"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                {/* Background Pattern */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                <div className="relative p-6">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                      <Image
                        src={
                          member.profilePicture?.formats?.small?.url ||
                          member.profilePicture?.formats?.thumbnail?.url ||
                          '/grublify_logo.png' // Fallback image
                        }
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={300}
                        height={300}
                        priority={index < 4} // Prioritize first 4 images
                      />
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end">
                      <div className="p-4 text-white">
                        {/* <p className="text-sm font-medium">Click to learn more</p> */}
                      </div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="">
                    <h3 className="text-2xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-lg font-semibold text-primary mb-3">
                      {member.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  {/* Social Links Placeholder */}
                  {/* <div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-sm">L</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-sm">T</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-sm">E</span>
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      {/* <div className="py-16 px-6 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're passionate about creating healthy, nutritious food for your furry friends.
            Want to learn more about our journey or join our team?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
            <button className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
              View Careers
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}