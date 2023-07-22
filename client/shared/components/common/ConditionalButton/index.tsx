import { useEffect, useState } from 'react';
import { getZKPG } from '@shared/utils/main';
import { connect, getAccount } from "@shared/utils/metamask";
import { Signer, BigNumber } from 'ethers';

export default function ConditionalButton() {
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
        <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-8 rounded"
            onClick={() => window.location.href='/onboard'}
        >
            Onboarding
        </button>
    );
}
