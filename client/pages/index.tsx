import Link from "next/link"; // Importing Link for navigation
import ConditionalButton from "@shared/components/common/ConditionalButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      {/* Added Title Header */}
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl font-bold">image.zKPG</h1>
      </header>

      <div className="flex flex-col gap-8 justify-center mt-8">
        <ConditionalButton />
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded w-50">
          <Link href="/attest">Attest Image</Link>
        </span>
        <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded w-50">
          <Link href="/prove">Prove Changes</Link>
        </span>
        <span className="bg-green-500 hover:bg-green-700 text-white font-bold py-5 px-8 rounded w-50">
          <Link href="/verify">Verify Image</Link>
        </span>
      </div>
    </main>
  );
}
