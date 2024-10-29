import { LogoutBtn } from "@/modules/auth/components/logout-btn";

import { Logo } from "@/modules/core/components/logo";

import { getUserById } from "@/modules/user/actions/get-user-by-id";

export default async function Page() {
    const user = await getUserById();

    return (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
            <div className="text-center space-y-4">
                <h1 className="text-xl">Welcome back to</h1>
                <Logo width={200} height={200} />
            </div>
            <h2 className="text-3xl font-bold">{user.fullname}</h2>
            <LogoutBtn />
        </div>
    )
}