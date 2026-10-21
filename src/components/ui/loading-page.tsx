import { HashLoader } from "react-spinners"

interface LoadingPageProps {
    message?: string;
    asMain?: boolean;
}

export const LoadingPage = ({ message, asMain = true }: LoadingPageProps) => {
    const letters: string[] | undefined = message ? message.split("") : undefined;
    const Tag = asMain ? "main" : "div";
    return (
        <Tag
            {...(asMain ? { id: "main-content", tabIndex: -1 } : {})}
            className="min-h-dvh flex flex-col items-center justify-center bg-off-white gap-8 px-4"
            role="status"
            aria-live="polite"
        >
            <HashLoader color="#2C9E95" size={60} />

            {message && <span className="sr-only">{message}</span>}

            {/* Letters are decorative: screen readers get the message above. */}
            <div className="flex items-center gap-2" aria-hidden="true">
                {letters?.map((letter, index) => (
                    <p key={index} className="text-turquesa-deep text-sm lg:text-lg font-bold tracking-normal uppercase animate-bounce">{letter}</p>
                ))}
            </div>
        </Tag>
    );
};