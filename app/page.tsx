import Main from "@/app/components/page";
import MainTitle from "@/app/components/MainTitle";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <MainTitle/>
            <Main/>
        </main>
    );
}
