import { checkUserRole } from '@/modules/auth/actions/check-user-role';
import { Blockquote } from '@/modules/core/components/ui/blockquote';
import { Icon } from '@/modules/core/components/ui/icon';
import { getPosts } from '@/modules/user/blog/actions/get-posts';
import { ListOfPosts } from '@/modules/user/blog/components/blog/list-of-posts';

export default async function Page() {
  const role = await checkUserRole();

  if (role !== 'USER') {
    return null;
  }

  const posts = await getPosts();

  if (!posts || !posts.length) {
    return (
      <section className="relative flex flex-col items-center justify-center text-center grow p-4 md:p-8">
        <h1>There are no published articles</h1>
        <p className="text-muted-foreground">
          We are working hard to publish articles, please check back later
        </p>
        <Icon
          name="FolderSearch"
          className="absolute text-muted-foreground opacity-20 rotate-12 size-60 md:size-96 -z-10"
        />
      </section>
    );
  }

  return (
    <section className="p-4 space-y-16 md:p-8">
      <header className="space-y-4 lg:max-w-md ">
        <h1>Blog</h1>
        <p>
          Read different articles about personal finance, investments, and more
        </p>
        <Blockquote>
          <q className="ml-2">
            Invest in your mind through reading, your future through saving, and
            your growth through learning—because true wealth is built on
            knowledge.
          </q>
        </Blockquote>
      </header>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">
        <ListOfPosts posts={posts} />
      </div>
    </section>
  );
}
