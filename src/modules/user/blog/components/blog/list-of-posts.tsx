import { Badge } from '@/modules/core/components/ui/badge';
import { formatUpperCase } from '@/modules/core/lib/format-upper-case';
import { Post } from '@prisma/client';
import Link from 'next/link';

interface ListOfPostsProps {
  posts: Pick<
    Post,
    'id' | 'category' | 'title' | 'content' | 'createdAt' | 'slug'
  >[];
}

export const ListOfPosts = ({ posts }: ListOfPostsProps) => {
  return (
    <>
      {posts.map(({ id, category, title, content, createdAt, slug }) => {
        const date = new Date(createdAt);

        return (
          <Link
            key={id}
            href={`/portal/blog/${slug}`}
            className="lg:max-w-md border border-transparent p-4 rounded transition-colors hover:border-border"
          >
            <article className="space-y-4">
              <header className="space-y-2">
                <Badge>{formatUpperCase(category ?? '')}</Badge>
                <h2 className="font-bold line-clamp-1">{title}</h2>
              </header>
              <p className="text-muted-foreground line-clamp-2">
                {content.replace(/<[^>]*>/g, '')}
              </p>
              <footer>
                <time dateTime={date.toISOString()}>
                  {date.toLocaleDateString()}
                </time>
              </footer>
            </article>
          </Link>
        );
      })}
    </>
  );
};
