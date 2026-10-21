export function BackgroundLights() {
    return (
        <div className="pointer-events-none select-none">
            <div className="fixed -top-20 -right-20 w-72 h-72 rounded-full bg-turquesa opacity-10 blur-3xl" />
            <div className="fixed -bottom-24 -left-16 w-64 h-64 rounded-full bg-rosa-rose opacity-10 blur-3xl" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-turquesa opacity-5" />
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-turquesa opacity-[0.03]" />
        </div>
    );
}
