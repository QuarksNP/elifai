import { StepsNavigation } from "@/modules/admin/blog/components/steps-navigation";
import { MultistepPost } from "@/modules/admin/blog/components/multistep-post";

export default function Page() {
    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold">Creation of a post</h1>
            <MultistepPost />
            <StepsNavigation />
        </section>
    )
}