import { PostSteps } from '@/modules/admin/blog/components/post-steps';
import { PostHandleProvider } from '../_post-handle-provider';
import {
  NextStep,
  PreviousStep,
} from '@/modules/admin/blog/components/steps-navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 h-screen overflow-auto p-4 md:p-8">
      <PostHandleProvider>
        <header className="flex items-center justify-center">
          <PreviousStep />
          <PostSteps />
          <NextStep />
        </header>
        {children}
      </PostHandleProvider>
    </div>
  );
}
