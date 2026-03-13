import Image from "next/image";
import { Button } from "../ui";

export default function GoogleAuth() {
    return (
        <>
            <div className="space-y-3">
                <Button type="button" variant="google" size="sm" className="gap-2 w-full" >
                    <Image src="/images/google.svg" alt="Google" width={20} height={20} />
                    <span>Continue with Google</span>
                </Button>
            </div>
        </>
    )
}
