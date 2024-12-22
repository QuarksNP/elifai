'use client';

import { Icon } from '@/modules/core/components/ui/icon';
import { useHandlePosts } from '../hooks/use-handle-posts';
import { Badge } from '@/modules/core/components/ui/badge';
import { Card } from '@/modules/core/components/ui/card';
import { Blockquote } from '@/modules/core/components/ui/blockquote';
import { formatUpperCase } from '@/modules/core/lib/format-upper-case';

export const PostPreview = () => {
  const {
    post: { title, content, category },
  } = useHandlePosts();

  const formattedCategory = formatUpperCase(category);

  return (
    <Card className="border-0 bg-transparent md:bg-card md:border md:border-border md:space-y-8 md:p-8">
      <div className="flex flex-col gap-8 grow overflow-auto max-w-screen-md w-full mx-auto">
        <Blockquote title="Good to know">
          <p>Make sure to preview your post before publishing</p>
        </Blockquote>
        <header className="space-y-2">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="flex items-center">
            <time className="text-muted-foreground">
              {new Date().toDateString()}
            </time>
            <Icon name="Dot" />
            <Badge>{formattedCategory}</Badge>
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: content.html }} />
      </div>
    </Card>
  );
};
