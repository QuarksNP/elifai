import { AppleButton, GoogleButton } from "@/modules/auth/components/providers";
import { ButtonAsLink } from "@/modules/core/components/button-as-link";
import { Logo } from "@/modules/core/components/logo";
import { Separator } from "@/modules/core/components/ui/separator";

export default function Home() {
    return (
        <main className="h-full min-h-screen flex flex-col items-center justify-center p-8 gap-2 lg:grid lg:grid-cols-2 lg:gap-8">
            <section className="h-full flex items-center">
                <Logo className="w-40 lg:w-full lg:scale-75" />
            </section>

            <section className="space-y-8">
                <header>
                    <h1 className="max-w-96 text-xl text-center font-bold lg:text-5xl lg:max-w-full lg:text-start">Manage your finances intuitively and without complications</h1>
                </header>

                <h2 className="font-bold text-lg lg:text-2xl">Join today.</h2>

                <div className="lg:w-96 space-y-8">
                    <div className="flex flex-col w-full gap-4">
                        <GoogleButton />
                        <AppleButton />
                    </div>

                    <div className="relative flex flex-col items-center justify-center w-full">
                        <Separator className="absolute w-full" />
                        <span className="relative bg-black px-2">Or</span>
                    </div>

                    <ButtonAsLink href="/sign-up" className="w-full">
                        Create account
                    </ButtonAsLink>

                    <div className="flex flex-col w-full text-center gap-2">
                        <small>Already have an account?</small>
                        <ButtonAsLink href="/sign-in" variant="outline">
                            Sign in
                        </ButtonAsLink>
                    </div>
                </div>
            </section>
        </main>
    )
};