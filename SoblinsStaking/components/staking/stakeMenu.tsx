'use client';
import { useState } from 'react';
import StakeCard from './stakeCard';
import { RPC_URL, COLLECTION } from '@/constants/constants';
import { Connection, PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import { useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { useAtomValue, useSetAtom } from 'jotai';
import { selectedAtom } from '@/atoms/atoms';
import { createLockPnftTx, createUnlockPnftTx } from '@/program/scripts';
import { AnchorProvider } from '@coral-xyz/anchor';
import Spinner from '../layout/spinner';

export default function StakeMenu() {
  const [stakeSetting, setStakeSetting] = useState<boolean>(false);
  const [unstaked, setUnstaked] = useState<any>(null);
  const [staked, setStaked] = useState<any>(null);
  const connection = new Connection(RPC_URL);
  const mx = Metaplex.make(connection);
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();
  const selectedNFTs = useAtomValue(selectedAtom);
  const setSelectedNFTs = useSetAtom(selectedAtom);
  const [noSoblin, setNoSoblin] = useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  const provider = new AnchorProvider(
    connection,
    anchorWallet as any,
    AnchorProvider.defaultOptions()
  );

  const findNfts = async () => {
    if (wallet?.publicKey instanceof PublicKey) {
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        wallet.publicKey,
        { programId: TOKEN_PROGRAM_ID }
      );

      const nfts = await mx.nfts().findAllByOwner({
        owner: wallet?.publicKey
      });

      const filteredNFTS = nfts.filter(
        (e: any) => e.collection?.address?.toString() === COLLECTION
      );
      
      if(filteredNFTS.length < 1){
        setNoSoblin(true)
      }

      if(filteredNFTS.length >= 1){
        setNoSoblin(false)
      }

      const metadatas: any[] = filteredNFTS.filter(
        value => value.model === 'metadata'
      ) as any[];

      const stakedNFTs = tokenAccounts.value
        .map(tokenAccount =>
          metadatas.find(
            metadata =>
              tokenAccount.account.data.parsed.info.mint ==
                metadata.mintAddress &&
              tokenAccount.account.data.parsed.info.delegate != undefined
          )
        )
        .filter(Boolean);

      const unstakedNFTs = tokenAccounts.value
        .map(tokenAccount =>
          metadatas.find(
            metadata =>
              tokenAccount.account.data.parsed.info.mint ==
                metadata.mintAddress &&
              tokenAccount.account.data.parsed.info.delegate == undefined
          )
        )
        .filter(Boolean);

      let staked = [];
      for (let i = 0; i < stakedNFTs.length; i++) {
        let nft = await mx.nfts().load({ metadata: stakedNFTs[i] });
        staked.push(nft);
      }

      let unstaked = [];
      for (let i = 0; i < unstakedNFTs.length; i++) {
        let nft = await mx.nfts().load({ metadata: unstakedNFTs[i] });
        unstaked.push(nft);
      }

      setStaked(staked);
      setUnstaked(unstaked);
    }
  };

  useEffect(() => {
    findNfts();
  }, [wallet?.publicKey]);

  async function stake() {
    setLoading(true);
      try {
        await createLockPnftTx(
          wallet.publicKey!,
          selectedNFTs,
          connection,
          provider
        );
        for (const i in selectedNFTs) {
          const unstakedFilter = unstaked?.filter(
            (j: any) => j.mint.address.toBase58() !== selectedNFTs[i]
          );
          setUnstaked(unstakedFilter);
          const stakedFilter = unstaked?.filter(
            (j: any) => j.mint.address.toBase58() === selectedNFTs[i]
          );
          if (staked.indexOf(stakedFilter) === -1) {
            setStaked((oldArray: any) => [...oldArray, stakedFilter[0]]);
          }
      }
      findNfts()
      } catch (e) {
        setLoading(false);
      }
    setSelectedNFTs([]);
    setLoading(false);
  }
  

  async function unstake() {
    setLoading(true);
      try {
        await createUnlockPnftTx(
          wallet.publicKey!,
          selectedNFTs,
          provider
        );
        for (const i in selectedNFTs) {
          const stakedFilter = staked?.filter(
            (j: any) => j.mint.address.toBase58() !== selectedNFTs[i]
          );
          const unstakedFilter = staked?.filter(
            (j: any) => j.mint.address.toBase58() === selectedNFTs[i]
          );
          if (staked.indexOf(stakedFilter) === -1) {
            setUnstaked((oldArray: any) => [...oldArray, unstakedFilter[0]]);
          }
          setStaked(stakedFilter);
      }
      findNfts()
      } catch (e) {
        setLoading(false);
      }
    setSelectedNFTs([]);
    setLoading(false);
  }

  if (!wallet.connected) {
    return (
      <div className={'w-full text-center text-soblinRed-3 font-bold'}>
        Connect a wallet to continue
      </div>
    );
  }

  return (
    <>
      <div
        className={
          'flex flex-col sm:flex-row w-full justify-between pb-9 text-soblinRed-1 gap-2 sm:items-center'
        }
      >
        <div
          className={
            'flex flex-row justify-between sm:gap-2 items-center font-bold p-2 rounded-2xl bg-soblinRed-4 w-full sm:max-w-[320px] h-[61px]'
          }
        >
          <button
            onClick={() => {
              setStakeSetting(false), setSelectedNFTs([]);
            }}
            className={`${
              stakeSetting === false ? 'bg-soblinRed-3' : 'bg-transparent'
            } h-[45px] rounded-[10px] w-full sm:w-[148px] transition ease-in-out duration-300`}
          >
            Encamped
          </button>
          <button
            onClick={() => {
              setStakeSetting(true), setSelectedNFTs([]);
            }}
            className={`${
              stakeSetting === true ? 'bg-soblinRed-3' : 'bg-transparent'
            } h-[45px] rounded-[10px] w-full sm:w-[148px] transition ease-in-out duration-300`}
          >
            Resting
          </button>
        </div>
        {stakeSetting === false ? (
          <button
            className={
              'font-bold h-[45px] bg-soblinRed-3 rounded-[10px] w-full sm:w-[148px]'
            }
            onClick={unstake}
            disabled={!selectedNFTs}
          >
            {loading ? <Spinner /> : 'Unstake'}
          </button>
        ) : (
          <button
            className={
              'font-bold h-[45px] bg-soblinRed-3 rounded-[10px] w-full sm:w-[148px]'
            }
            onClick={stake}
            disabled={!selectedNFTs}
          >
            {loading ? <Spinner /> : 'Stake'}
          </button>
        )}
      </div>
      {
        !staked ? <Spinner/>
        : !unstaked ? <Spinner/> : noSoblin === true && <div className={'w-full text-center text-soblinRed-3 font-bold'}>Please connect a wallet with Soblin NFTs to continue</div>
      }
      <div
        className={
          'grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 lg:gap-16 place-items-center'
        }
      >
        {staked && stakeSetting === false ? (
          staked?.map((nft: any, index: number) => {
            return <StakeCard key={index} nft={nft} mode={'staking'} />;
          })
        ) : unstaked && stakeSetting === true && (
          unstaked?.map((nft: any, index: number) => {
            return <StakeCard key={index} nft={nft} mode={'unstaked'} />;
          })
        )}
      </div>
    </>
  );
}
