import { useEffect, useState } from 'react';
import { getZKPG } from '@shared/utils/main';
import { connect, getAccount } from "@shared/utils/metamask";
import { Signer } from 'ethers';

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
                zkpg.connect(signer? await signer() : null);
                console.log(zkpg.signer);
                // Check if user is already onboarded
                const id = await zkpg.addressToId(
                    await zkpg.signer.getAddress()
                )

                if (id === 0) {
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => window.location.href='/onboard'}
        >
            Onboarding
        </button>
    );
}
