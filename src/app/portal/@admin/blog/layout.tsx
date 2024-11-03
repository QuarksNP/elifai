import { PostSteps } from "@/modules/admin/blog/components/post-steps";
import { BlogProvider } from "./_blog-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="grid grid-cols-1 gap-16 md:grid-cols-[30%_1fr] lg:grid-cols-[20%_1fr]">
                <BlogProvider>
                    <PostSteps />
                    {children}
                </BlogProvider>
            </div>
        </>
    )
}