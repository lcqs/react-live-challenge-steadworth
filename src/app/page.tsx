import Component from "./components/component";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold">Welcome</h1>
      <div className="w-full items-center justify-between font-mono text-sm ">

      <Component />

      </div>
    </main>
  );
}
