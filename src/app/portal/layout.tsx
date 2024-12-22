import { getUser } from "@/modules/user/actions/get-user";
import { Navigation as UserNavigation } from "@/modules/user/components/navigation";
import { Navigation as AdminNavigation } from "@/modules/admin/components/navigation";

export default async function PortalLayout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { role, fullname } = await getUser();

  return (
    <main className="flex flex-col min-h-screen xl:px-0 md:grid md:h-auto md:grid-cols-[30%,1fr] lg:grid-cols-[20%,1fr]">
      {role === "ADMIN" ? (
        <AdminNavigation user={{ fullName: fullname }} />
      ) : (
        <UserNavigation />
      )}

      <div className="md:h-screen md:overflow-y-scroll">
        {role === "ADMIN" ? admin : user}
      </div>
    </main>
  );
}
