import { unfurl } from "unfurl.js";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

async function fetchData(url: any) {
  let content;
  try {
    const res = await fetch(url);
    if(!res.ok){
      return
    }
    const contentType = res.headers.get("content-type");
    if (contentType?.includes("text/html")) {
      const res = await unfurl(url);
      content = "website";
      return { res, content };
    } else if (contentType?.includes("image")) {
      content = "image";
      return { url, content };
    } else {
      content = "null"
      return {url, content }
    }
  } catch (error) {
    console.log("problem with url:", url)
    console.log(error);
  }
}
export async function Embed({ url }: any) {
  const result: any = await fetchData(url);
  if(!result){
    return null
  }
  if (result.content === "website") {
    const data = result.res
    return (
      <div className="flex flex-col rounded-lg border w-full">
        <Link href={url}>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={
                (data?.open_graph.images && data.open_graph.images[0].url) ||
                "/photo.svg"
              }
              width={400}
              height={209.5}
              alt="Image"
              className="object-cover rounded-tr rounded-tl w-full"
            />
          </AspectRatio>
          <div className="flex flex-col px-2 pb-2 gap-1">
            <p className="font-bold">{data?.title}</p>
            <p className="text-xs">{data?.description}</p>
            <p className="text-xs">{data?.open_graph.url || url}</p>
          </div>
        </Link>
      </div>
    );
  } else if(result.content === "image") {
    return (
        <Image 
        unoptimized
        src={url}
        className="rounded-lg w-full"
        alt="Image"
        width={600}
        height={200}
        />
    )
  } else {
    return null
  }
}
