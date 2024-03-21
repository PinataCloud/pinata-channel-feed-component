import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

async function cronFeed(channel: any, nextPage: any, pageSize: any) {
  try {
    const result = await fetch(
      `https://api.pinata.cloud/v3/farcaster/casts?channel=${channel}&pageSize=${pageSize}&pageToken=${nextPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`
      }
    });
    if (!result.ok) {
      throw new Error("failed to fetch data")
    }
    const resultData = await result.json();
    return resultData
  } catch (error) {
    console.log(error);
    return error;
  }
}

const dummyCasts = [
  {
    fid: 20591,
    hash: '0x4fa1c5f37ba1d663e225d67c7268523ddfc7e9c7',
    short_hash: '0x4fa1c5f3',
    thread_hash: '0x66d56e0e5d587cd576b05b861f0b6e35a946f322',
    parent_hash: '0x66d56e0e5d587cd576b05b861f0b6e35a946f322',
    parent_url: null,
    root_parent_url: 'https://warpcast.com/~/channel/pinata',
    parent_author: {
      uid: 4823,
      fid: 4823,
      custody_address: '0x7f9a6992a54dc2f23f1105921715bd61811e5b71',
      recovery_address: '0x00000000fcb080a4d6c39a9354da9eb9bc104cd7',
      following_count: 848,
      follower_count: 14863,
      verifications: [Array],
      bio: 'Writer. Building @pinatacloud. Tinkering with a Farcaster native alternative to GoodReads: https://readcast.xyz \\ https://polluterofminds.com',
      display_name: 'Justin Hunter',
      pfp_url: 'https://i.seadn.io/gae/lhGgt7yK1JiBVYz_HBxcAmYLRtP03aw5xKX4FgmFT9Ai7kLD5egzlLvb0lkuRNl28shtjr07DC8IHzLUkTqlWUMndUzC9R5_MSxH3g?w=500&auto=format',
      username: 'polluterofminds'
    },
    author: {
      uid: 20591,
      fid: 20591,
      custody_address: '0x62402434701e0ce0ae4ea4b3caf68230a6ddbe43',
      recovery_address: '0x00000000fcb080a4d6c39a9354da9eb9bc104cd7',
      following_count: 13,
      follower_count: 261,
      verifications: [Array],
      bio: 'Everyone is from somewhere. Cofounder and CEO of Pinata. https://www.pinata.cloud/farcaster',
      display_name: 'Kyle Tut',
      pfp_url: 'https://i.imgur.com/TLMFnH6.jpg',
      username: 'kyletut'
    },
    content: "What's more degen then shilling lol",
    timestamp: '2024-03-07T16:16:27Z',
    embeds: [],
    reactions: { likes: [Array], recasts: [Array] },
    replies: { count: 1 },
    mentioned_profiles: []
  },
  {
    fid: 4823,
    hash: '0x66d56e0e5d587cd576b05b861f0b6e35a946f322',
    short_hash: '0x66d56e0e',
    thread_hash: null,
    parent_hash: null,
    parent_url: null,
    root_parent_url: 'https://warpcast.com/~/channel/pinata',
    parent_author: null,
    author: {
      uid: 4823,
      fid: 4823,
      custody_address: '0x7f9a6992a54dc2f23f1105921715bd61811e5b71',
      recovery_address: '0x00000000fcb080a4d6c39a9354da9eb9bc104cd7',
      following_count: 848,
      follower_count: 14863,
      verifications: [Array],
      bio: 'Writer. Building @pinatacloud. Tinkering with a Farcaster native alternative to GoodReads: https://readcast.xyz \\ https://polluterofminds.com',
      display_name: 'Justin Hunter',
      pfp_url: 'https://i.seadn.io/gae/lhGgt7yK1JiBVYz_HBxcAmYLRtP03aw5xKX4FgmFT9Ai7kLD5egzlLvb0lkuRNl28shtjr07DC8IHzLUkTqlWUMndUzC9R5_MSxH3g?w=500&auto=format',
      username: 'polluterofminds'
    },
    content: "This is the signal! You know what to do. If you're playing  today or if you are a dev that wants to use the Pinata Farcaster API, like your thumbs off. 👍🏻❤️  This cast needs to get at least 624 likes to unlock the Farcaster API docs. https://pinatadrops.com/apps/farcaster-api",
    timestamp: '2024-03-07T16:10:48Z',
    embeds: [[Object]],
    reactions: { likes: [Array], recasts: [Array] },
    replies: { count: 8 },
    mentioned_profiles: [[Object]]
  }
]

export default async function Home() {

  const feed = await cronFeed("https://warpcast.com/~/channel/pinata", "", 100)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-12 mt-12">
      {feed.data.casts.map((cast: any) =>
        <div className="flex gap-4 w-[500px] flex-row items-start" key={cast.hash}>
          <Avatar>
            <AvatarImage src={cast.author.pfp_url} />
              <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <div className="flex gap-2">
              <p className="font-bold">{cast.author.display_name}</p>
              <p className="text-gray-600">@{cast.author.username}</p>
            </div>
            <p>{cast.content}</p>
          </div>
        </div>
      )}
    </main>
  );
}
