import TimeLine from "@/app/timeline";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4">
      <h1 className="mb-8 text-4xl font-bold">Who Lived When</h1>

      <TimeLine />
    </main>
  );
}
