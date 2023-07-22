import React from 'react';
import { useEffect } from 'react';
import { Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { getZKPG } from '@shared/utils/main';
import { useRouter } from 'next/router';

const Onboarding: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                // Get the contract
                const zkpg = await getZKPG();
                // Check if user is already onboarded
                const logs = await zkpg.proofs(
                    await zkpg.signer.getAddress(),
                    1
                )
                console.log(logs);

                // if (id.toString() !== '0') {
                //     router.push('/');
                // }
            } catch (error) {
                console.error("An error occurred!", error);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-8 top-0">
                Prove that you're a human
            </h1>
            <div className="relative">
                <img src="id/claim.png" alt="Onboarding Image" className="max-w-md"/>
            </div>
        </div>
    );
}

export default Onboarding;
