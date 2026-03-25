import LoginForm from "../features/LoginForm";
import { PixelImage } from "../ui/pixel-image";
import hero from "@/public/images/hero.jpg";
 export default function Hero() {
  return (
    <>
    <div className="flex h-[calc(100dvh-80px)] bg-background w-full">
            <div className="relative hidden items-center justify-center p-12 lg:flex lg:w-[70%]">
                <div className="relative z-20 w-full max-w-3xl">
                    
                    <PixelImage
                        src={hero}
                    />
                </div>

                <div className="absolute bottom-12 left-12 z-20 max-w-md">
                    <h1>
                        Discover verified artists and venues for your{" "}
                        <p className="pb-10">Next Event</p>.
                    </h1>
                </div>
            </div>

            <div className="flex w-full lg:w-[30%] items-center justify-center p-6 sm:p-12 bg-[#333]/4 dark:bg-[#333]/30">
                <LoginForm />
            </div>
        </div>
    </>
  );
}