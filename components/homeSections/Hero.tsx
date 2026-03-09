import { LoginForm } from "@/components/features";
import hero from "@/public/images/hero.jpg";
import { PixelImage } from "@/components/ui/pixel-image"
import { AuroraText } from "@/components/ui/aurora-text"
export default function Hero() {
    return (
        <div className="flex h-[calc(100dvh-80px)] bg-background w-full">
            <div className="relative hidden items-center justify-center p-12 lg:flex lg:w-[70%]">
                <div className="relative z-20 w-full max-w-3xl">
                    {/* <Image
                        src={hero} width={500} height={500}
                        alt="Creative art collage with music and entertainment"
                        className="w-full rounded-3xl shadow-2xl shadow-primary/10"
                    /> */}
                    <PixelImage
                        src={hero.src}
                    />
                </div>

                <div className="absolute bottom-12 left-12 z-20 max-w-md">
                    <h1>
                        Discover verified artists and venues for your{" "}
                        <AuroraText className="pb-10">Next Event</AuroraText>.
                    </h1>
                </div>
            </div>

            <div className="flex w-full lg:w-[30%] items-center justify-center p-6 sm:p-12 bg-[#333]/4 dark:bg-[#333]/30">
                <LoginForm />
            </div>
        </div>
    );
}
