import { getCurrentUser } from '@/lib/auth-actions';
import ProfileForm from '@/components/profile/ProfileForm';

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user || user.error) {
    // Not logged in or error fetching user
    return (
      <div className="max-w-xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-gray-600">You must be signed in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}
