import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Separator } from "@/modules/core/components/ui/separator";

export default function NotFound() {
    return (
        <section className="h-[calc(100vh_-_2rem)] flex flex-col items-center justify-center gap-4 p-8 text-muted-foreground">
            <header className="flex gap-2">
                <h2 className="text-xl font-bold">404</h2>
                <Separator orientation="vertical" />
                <p>Ups!, this page does not exist {":("}</p>
            </header>
            <ButtonAsLink href="/" variant="link">Go back home</ButtonAsLink>
        </section>
    )
};