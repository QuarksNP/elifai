import { getPostBySlug } from "@/modules/user/blog/actions/get-post-by-slug";
import { Icon } from "@/modules/core/components/ui/icon";
import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Badge } from "@/modules/core/components/ui/badge";
import { formatUpperCase } from "@/modules/core/lib/format-upper-case";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getPostBySlug(params.slug);

  const formattedCategory = formatUpperCase(post?.category ?? "");

  if (!post) {
    return (
      <section className="relative flex flex-col text-center items-center justify-center grow p-4 md:p-8">
        <h1>Ups, We could not find this article</h1>
        <p className="text-muted-foreground">
          Try it later or check out our latest articles
          <ButtonAsLink
            variant="link"
            size="none"
            href="/portal/blog"
            className="ml-2"
          >
            here
          </ButtonAsLink>
        </p>
        <Icon
          name="CircleOff"
          className="absolute text-muted-foreground opacity-20 size-60 md:size-96 -z-10"
        />
      </section>
    );
  }

  return (
    <section className="max-w-screen-md mx-auto p-4 space-y-8 md:p-8">
      <header className="space-y-4">
        <ButtonAsLink
          variant="ghost"
          href="/portal/blog"
          className="w-fit border border-border"
        >
          <Icon name="ArrowLeft" />
        </ButtonAsLink>
        <h1 className="font-bold">{post.title}</h1>
        <div className="flex gap-2">
          <time
            dateTime={post.updatedAt.toISOString()}
            className="text-muted-foreground"
          >
            {post.updatedAt.toDateString()}
          </time>
          <Icon name="Dot" />
          {formattedCategory && <Badge>{formattedCategory}</Badge>}
        </div>
      </header>
      <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
    </section>
  );
}
