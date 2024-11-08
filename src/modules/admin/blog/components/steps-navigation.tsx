'use client';

import { Button } from "@/modules/core/components/ui/button";
import { useHandlePosts } from "../hooks/use-handle-posts";
import { Icon } from "@/modules/core/components/ui/icon";

export const NextStep = () => {
    const { currentStep, handleSteps, isSuccess } = useHandlePosts();

    return (
        <Button
            variant="ghost"
            size="sm"
            disabled={currentStep === 2 || !isSuccess}
            onClick={() => handleSteps({ next: true })}
        >
            <Icon name="ChevronRight" size={24} />
        </Button>
    )
}

export const PreviousStep = () => {
    const { currentStep, handleSteps } = useHandlePosts();

    return (
        <Button
            variant="ghost"
            size="sm"
            disabled={currentStep === 0}
            onClick={() => handleSteps({ previous: true })}
        >
            <Icon name="ChevronLeft" size={24} />
        </Button>
    )
}