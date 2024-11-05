import { PostSteps } from "@/modules/admin/blog/components/post-steps";
import { BlogProvider } from "./_blog-provider";
import { StepsNavigation } from "@/modules/admin/blog/components/steps-navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col gap-8 md:grid md:gap-16 md:grid-cols-[30%_1fr] lg:grid-cols-[20%_1fr]">
                <BlogProvider>
                    <article className="flex flex-col gap-y-16 md:sticky md:top-16 md:self-start">
                        <PostSteps />
                        <StepsNavigation />
                    </article>
                    {children}
                </BlogProvider>
            </div>
        </>
    )
}