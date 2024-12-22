import { z } from 'zod';

import { POST_CATEGORIES } from './constants/post-categories';

export const PostSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(500).max(10000),
  category: z.enum(POST_CATEGORIES),
});
