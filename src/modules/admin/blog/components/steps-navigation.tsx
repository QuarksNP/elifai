'use client';

import { Button } from "@/modules/core/components/ui/button";
import { useHandlePosts } from "../hooks/use-handle-posts";
import { Icon } from "@/modules/core/components/ui/icon";

export const StepsNavigation = () => {
    const { currentStep, handleSteps, isSuccess } = useHandlePosts();

    return (
        <div className="flex gap-2 ml-auto md:flex md:justify-between [&>button]:w-16 [&>button]:h-16 [&>button]:rounded-full">
            <Button
                variant="secondary"
                disabled={currentStep === 0}
                onClick={() => handleSteps({ previous: true })}
            >
                <Icon name="ChevronLeft" size={24} />
            </Button>
            <Button
                variant="secondary"
                disabled={currentStep === 2 || !isSuccess}
                onClick={() => handleSteps({ next: true })}
            >
                <Icon name="ChevronRight" size={24} />
            </Button>
        </div>
    )
}