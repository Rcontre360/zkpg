import Link from "next/link";
import {PhotographIcon, DocumentAddIcon, CheckCircleIcon} from "@heroicons/react/solid"; // Importing icons

export default function Home() {
  const cardData = [
    {
      href: "/attest",
      title: "Attest Image",
      description: "Upload a brand new image and verify that its real.",
      icon: <PhotographIcon className="h-16 w-16 mb-4" />,
      bgColor: "bg-violet-800 hover:bg-violet-900",
    },
    {
      href: "/prove",
      title: "Prove Changes",
      description:
        "Prove to the world that an image has been passed through several modifications.",
      icon: <DocumentAddIcon className="h-16 w-16 mb-4" />,
      bgColor: "",
    },
    {
      href: "/verify",
      title: "Verify Image",
      description: "Verify that an image belongs to a criptographically verified real image.",
      icon: <CheckCircleIcon className="h-16 w-16 mb-4" />,
      bgColor: "bg-violet-800 hover:bg-violet-800",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <header className="w-full text-center mb-8">
        <h1 className="text-4xl font-bold">Image.zkpg</h1>
      </header>

      <div className="flex gap-8 justify-center mt-8">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center p-8 border border-white hover:border-opacity-60 rounded-lg transform transition-transform duration-200 hover:scale-105 ${card.bgColor} w-1/3`}
          >
            {card.icon}
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <p className="text-center">{card.description}</p>
            <Link href={card.href}>
              <a className="mt-4 text-white underline">Go to {card.title}</a>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
