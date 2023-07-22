import { useEffect, useState } from 'react';
import { getZKPG } from '@shared/utils/main';
import { connect, getAccount } from "@shared/utils/metamask";
import { Signer } from 'ethers';
import Link from 'next/link';

export default function ConditionalButton({ card }) {
    const [showButton, setShowButton] = useState(false);

    const signer = async () => {
        let account: Signer = await getAccount();
        if (!account) {
            account = await connect();
        }
        return account;
    }

    useEffect(() => {
        (async () => {
            try {
                // Get the contract
                const zkpg = await getZKPG();
                zkpg.connect(await signer());
                // Check if user is already onboarded
                const id = await zkpg.addressToId(
                    await zkpg.signer.getAddress()
                );

                if (id.toString() === '0') {
                    setShowButton(true);
                }
            } catch (error) {
                console.error("An error occurred!", error);
            }
        })();
    }, []);

    if (!showButton) {
        return null;
    }

    return (
        <div className={`flex flex-col items-center p-8 border border-white hover:border-opacity-60 rounded-lg transform transition-transform duration-200 hover:scale-105 ${card.bgColor} w-1/3`}>
          {card.icon}
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-center">{card.description}</p>
          <Link href={card.href}>
            <a className="mt-4 text-white underline">Go to {card.title}</a>
          </Link>
        </div>
      );
}
