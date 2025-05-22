import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

export default function Team() {

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const query = '?populate[teamMembers][populate]=profilePicture';
  
    useEffect(() => {
      fetch(`${import.meta.env.VITE_STRAPI_URL}/api/team${query}`)
        .then(res => res.json())
        .then(data => {
          if (data?.data) {
            setTeam(data.data);
            console.log("Fetched team data:", data.data);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching team:", err);
          setLoading(false);
        });
    }, []);

    useEffect(() => {
      if (team) {
        console.log("Current team data:", team);
      }
    }, [team]);
    
  return (
    <div className="flex-1 py-16 px-6">
      {loading ? (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl text-secondary font-bold mb-4">
              <Skeleton width={300} />
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              <Skeleton width={600} />
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl text-secondary font-bold mb-4">
              {team.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {team.description}
            </p>
          </div>

          <div className="flex flex-wrap md:gap-8 justify-center">
            {team.teamMembers.map((member, index) => (
              // <div key={index} className="bg-primary/10 p-6 mx-4 rounded-lg text-center border-2 border-secondary w-64">
              <div key={index} className="p-6 w-64">
                <img 
                  src={
                    member.profilePicture?.formats?.small?.url ||
                    member.profilePicture?.formats?.thumbnail?.url
                  }
                  alt={member.name}
                  className="h-56 mb-2 object-cover"
                />
                <h3 className="text-2xl text-secondary font-bold">
                  {member.name}
                </h3>
                <p className="text-xl font-semibold text-primary">
                  {member.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}