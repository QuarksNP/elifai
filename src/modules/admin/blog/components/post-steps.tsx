'use client';

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbPage } from "@/modules/core/components/breadcroump";
import { Card, CardContent } from "@/modules/core/components/ui/card";
import { useMediaQuery } from "@/modules/core/hooks/use-media-query";
import { cn } from "@/modules/core/lib/cn";
import React from "react";
import { useHandlePosts } from "../hooks/use-handle-posts";

const STEPS = [
    {
        name: "Edit",
        step: 0
    },
    {
        name: "Preview",
        step: 1
    },
    {
        name: "Publish",
        step: 2
    }
]

export const PostSteps = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    
    const { currentStep } = useHandlePosts();

    if (isDesktop) {
        return (
            <aside>
                <Card>
                    <CardContent>
                        <nav className="flex flex-col justify-center gap-4 p-4">
                            {STEPS.map(({ step, name }, i) => (
                                <div key={i} className={cn("flex items-center text-lg gap-4", {
                                    "opacity-50": step > currentStep,
                                    "font-bold": step === currentStep,
                                })}>
                                    <div 
                                        className={cn("rounded-full w-10 h-10 border border-muted-foreground flex justify-center items-center group-hover:border-primary", {
                                            "bg-primary border-none": step === currentStep,
                                        })}
                                    >
                                        <span>{step + 1}</span>
                                    </div>
                                    <span>{name}</span>
                                </div>
                            ))}
                        </nav>
                    </CardContent>
                </Card>
            </aside>
        )
    }

    return (
        <header className="flex items-center justify-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {STEPS.map(({ step, name }, i) => (
                        <React.Fragment key={i}>
                            <BreadcrumbItem>
                                {step === currentStep ? (
                                    <BreadcrumbPage className="font-bold">{name}</BreadcrumbPage>
                                ) : (
                                    <span>{name}</span>
                                )}
                            </BreadcrumbItem>
                            {i < STEPS.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
};