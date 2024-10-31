import { Logo } from "@/modules/core/components/logo";

import { getUserById } from "@/modules/user/actions/get-user-by-id";
import { Navigation } from "@/modules/user/components/navigation";
import { Profile } from "@/modules/user/components/profile";

export default async function PortalLayout({ children }: React.PropsWithChildren) {
    const user = await getUserById();

    return (
        <main className="p-8 max-w-screen-xl mx-auto xl:px-0">
            <header className="flex flex-row items-center justify-between gap-4">
                <Logo containerClassName="flex-grow basis-0" href="/" />
                <Navigation />
                <Profile 
                    user={{ name: user.fullname }} 
                    className="flex flex-grow justify-end basis-0"
                />
            </header>
            {children}
        </main>
    )
}