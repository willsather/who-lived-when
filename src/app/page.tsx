import TimeLine from "@/app/timeline";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <h1 className="mb-8 font-bold text-4xl">Who Lived When</h1>

      <TimeLine />
    </main>
  );
}
