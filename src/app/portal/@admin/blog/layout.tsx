import { PostSteps } from "@/modules/admin/components/post-steps";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-[30%_1fr] lg:grid-cols-[20%_1fr]">
                <PostSteps />
                {children}
            </div>
        </>
    )
}