import { filterPosts } from '@/modules/admin/blog/actions/filter-posts';
import { getPosts } from '@/modules/admin/blog/actions/get-posts';
import { ListOfPosts } from '@/modules/admin/blog/components/list-of-posts';
import { checkUserRole } from '@/modules/auth/actions/check-user-role';
import { ButtonAsLink } from '@/modules/core/components/button-as-link';
import { Icon } from '@/modules/core/components/ui/icon';

type SearchParams = Promise<{
  search?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const role = await checkUserRole();

  if (role !== 'ADMIN') {
    return null;
  }

  const search = (await searchParams).search;

  const [posts, filteredPosts] = await Promise.all([
    getPosts(),
    filterPosts({ search }),
  ]);

  const currentPosts =
    filteredPosts && filteredPosts.length > 0 ? filteredPosts : posts;

  if (!currentPosts || !currentPosts.length) {
    return (
      <section className="relative flex flex-col items-center justify-center grow p-4 md:p-8">
        <h1 className="text-center">You have no published articles</h1>
        <ButtonAsLink href="blog/publish" variant="link">
          Click here to create your first article and publish it
          <Icon name="FilePlus" size={16} className="ml-2" />
        </ButtonAsLink>
        <Icon
          name="FolderSearch"
          className="absolute text-muted-foreground opacity-20 rotate-12 size-60 md:size-96 -z-10"
        />
      </section>
    );
  }

  return (
    <section className="p-4 space-y-8 md:p-8">
      <h1>Published articles</h1>
      <ListOfPosts posts={currentPosts} />
    </section>
  );
}
