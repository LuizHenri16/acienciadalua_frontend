import Image from "next/image";

export function NotFoundStory() {
    return (
        <div className="">
            <Image loading="eager" className="w-50 md:w-70 lg:w-80" src="/404error.svg" alt="" width={300} height={300} />
        </div>
    );
}    