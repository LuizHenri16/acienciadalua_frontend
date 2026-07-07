import { HashLoader } from "react-spinners"

interface LoadingPageProps {
    message?: string;
}

export const LoadingPage = ({ message }: LoadingPageProps) => {
    const letters: string[] | undefined = message ? message.split("") : undefined;
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-off-white gap-8" role="status" aria-live="polite">
            <HashLoader color="#2C9E95" size={60} />

            <div className="flex items-center gap-2">
                {letters?.map((letter, index) => (
                    <p key={index} className="text-turquesa-dark text-sm lg:text-lg font-bold tracking-normal uppercase animate-bounce">{letter}</p>
                ))}
            </div>
        </div>
    );
};