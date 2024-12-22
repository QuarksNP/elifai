'use client';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/modules/core/components/ui/table';
import { FilterColumns } from '@/modules/core/components/filter-columns';

import { useFilterColumns } from '@/modules/core/hooks/use-filter-columns';

import { Input } from '@/modules/core/components/ui/input';
import { Skeleton } from '@/modules/core/components/ui/skeleton';
import { useSearchTerm } from '@/modules/core/hooks/use-search-term';
import { Icon } from '@/modules/core/components/ui/icon';
import { cn } from '@/modules/core/lib/cn';
import { Button } from '@/modules/core/components/ui/button';
import { useHandleDbPost } from '../hooks/use-handle-db-post';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/modules/core/components/ui/dialog';

import type { Post } from '@prisma/client';

interface ListOfPostsProps {
  posts: Pick<Post, 'id' | 'title' | 'content' | 'createdAt'>[] | null;
}

export const ListOfPostsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      {/* Search Section */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Table Section */}
      <div>
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 mb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>

        {/* Table Rows */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-4 items-center">
              {Array.from({ length: 4 }).map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-6 w-full" />
              ))}
              {/* Actions */}
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ListOfPosts = ({ posts }: ListOfPostsProps) => {
  const columns = Object.keys(posts?.[0] || {}).map(
    (key) => key[0].toUpperCase() + key.slice(1),
  );

  const { currentColumns, handleChange } = useFilterColumns(columns);

  const [, handleSearch] = useSearchTerm({ param: 'search' });

  const { state, handleDeletePost } = useHandleDbPost();

  if (!posts) {
    return <h2>No posts found</h2>;
  }

  return (
    <div className="flex flex-col gap-4">
      <search className="flex items-center gap-4">
        <Input
          type="search"
          placeholder="Search by id or title..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FilterColumns columns={columns} onChange={handleChange} />
      </search>
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            {currentColumns?.map((column, i) => (
              <TableHead key={column + i}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, i) => (
            <TableRow
              key={post.id + i}
              className={cn('group', {
                'pointer-events-none opacity-50': state.isDeleting,
              })}
            >
              {currentColumns?.map((column, i) => {
                const mappedPosts = new Map(Object.entries(post));

                const formattedColumn =
                  column.charAt(0).toLowerCase() + column.slice(1);

                const currentValue = mappedPosts.get(formattedColumn);

                return (
                  <TableCell key={post.id + column + i}>
                    <p
                      className={cn('line-clamp-2', {
                        'max-w-40':
                          column.toLowerCase() === 'title' ||
                          column.toLowerCase() === 'content',
                      })}
                    >
                      {currentValue?.toString()}
                    </p>
                  </TableCell>
                );
              })}
              <TableCell>
                <Icon
                  name="Ellipsis"
                  className="group-hover:hidden"
                  size={16}
                />
                <div className="hidden group-hover:block">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Deliting - {post.title}</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this post?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose>
                          <Button variant="outline" size="sm">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          size="sm"
                          type="button"
                          onClick={async () => await handleDeletePost(post.id)}
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
