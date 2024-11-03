'use client';

import { Button } from "@/modules/core/components/ui/button";
import { useHandlePosts } from "../hooks/use-handle-posts";

export const StepsNavigation = () => {
    const { currentStep, handleSteps } = useHandlePosts();

    return (
        <div className="flex flex-col gap-2 grow sm:flex-row sm:ml-auto">
            {currentStep > 0 && <Button type="button" variant="outline" onClick={() => handleSteps({ previous: true })}>Previous</Button>}
            {currentStep < 2 && <Button type="button" onClick={() => handleSteps({ next: true })}>Next</Button>}
        </div>
    )
}