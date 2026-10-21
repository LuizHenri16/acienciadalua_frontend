import Image from "next/image";

export function NotFoundStory() {
    return (
        <div className="">
            <Image loading="eager" className="w-[12.5rem] md:w-[17.5rem] lg:w-[20rem]" src="/404error.svg" alt="" width={300} height={300} />
        </div>
    );
}    