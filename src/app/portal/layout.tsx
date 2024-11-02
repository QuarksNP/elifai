import { Logo } from "@/modules/core/components/logo";

import { getUserById } from "@/modules/user/actions/get-user-by-id";
import { Navigation as UserNavigation } from "@/modules/user/components/navigation";
import { Navigation as AdminNavigation } from "@/modules/admin/components/navigation";
import { Profile } from "@/modules/user/components/profile";

export default async function PortalLayout({ user, admin }: { user: React.ReactNode, admin: React.ReactNode }) {
    const response = await getUserById();

    return (
        <main className="px-8 pt-8 pb-28 max-w-screen-xl space-y-16 mx-auto xl:px-0">
            <header className="flex flex-row items-center justify-between gap-4">
                <Logo containerClassName="flex-grow basis-0" href="/" />
                {response.role === "ADMIN" ? <AdminNavigation /> : <UserNavigation />}
                <Profile
                    user={{ name: response.fullname }}
                    className="flex flex-grow justify-end basis-0"
                />
            </header>
            {response.role === "ADMIN" ? admin : user}
        </main>
    )
}