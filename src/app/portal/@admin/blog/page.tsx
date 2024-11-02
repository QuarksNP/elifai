import { PostContentEditor } from "@/modules/admin/components/post-content-editor";
import { PostTitle } from "@/modules/admin/components/post-title";

export default function Page() {
    return (
        <section className="flex flex-col gap-8">
            <h1 className="text-3xl font-bold">Creation of a post</h1>
            <PostTitle />
            <PostContentEditor />
        </section>
    )
}