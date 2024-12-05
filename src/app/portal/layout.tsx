import { getUserById } from "@/modules/user/actions/get-user-by-id";
import { Navigation as UserNavigation } from "@/modules/user/components/navigation";
import { Navigation as AdminNavigation } from "@/modules/admin/components/navigation";

export default async function PortalLayout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const response = await getUserById();

  return (
    <main className="flex flex-col min-h-screen xl:px-0 md:grid md:h-auto md:grid-cols-[30%,1fr] lg:grid-cols-[20%,1fr]">
      {response.role === "ADMIN" ? (
        <AdminNavigation user={{ fullName: response.fullname }} />
      ) : (
        <UserNavigation />
      )}

      <div className="md:h-screen md:overflow-y-scroll">
        {response.role === "ADMIN" ? admin : user}
      </div>
    </main>
  );
}
