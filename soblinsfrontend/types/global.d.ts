export {};

declare global {
  declare module "*.mp3" {
    const src: string;
    export default src;
  }

  interface RecentPlays {
    id?: String;
    signature?: String;
    payoutSignature?: String;
    createdAt?: Date;
    hut?: String;
    player?: String;
    outcome?: boolean;
    processed?: true;
    initialBet?: bigint;
    winAmount?: bigint;
  }
}
