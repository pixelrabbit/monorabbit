import Image from 'next/image';
import { cva } from "class-variance-authority";
import { LightBulbIcon } from "@heroicons/react/24/outline";

export interface CardProps {
  children: React.ReactNode;
  /** title of card */
  title?: string;
  /** image or video url; placed at top of card */
  media_url?: string;
}

export function Card({
  children,
  title,
  media_url
}: CardProps): JSX.Element {


  // const buttonVariants = cva(['leading-none'], {
  //   variants: {
  //     intent: {
  //       primary: ['bg-orange-400', 'text-white'],
  //       secondary: ['bg-gray-200', 'text-gray-800'],
  //     },
  //     size: {
  //       sm: ['p-1'],
  //       md: ['p-2'],
  //       lg: ['px-4', 'py-2'],
  //     }
  //   },
  //   defaultVariants: {
  //     intent: "primary",
  //     size: "md",
  //   }
  // });
  const cardVariants = cva(['border', 'rounded-lg', 'border-gray-200', 'flex', 'flex-col', 'overflow-hidden'], {})
  const mediaVariants = cva([])
  const titleVariants = cva(['border-b', 'p-4', 'text-md', 'font-bold', 'uppercase', 'flex', 'gap-2'], {})
  const bodyVariants = cva(['p-4'])

  return (
    <div
      className={cardVariants({})}
    >
      {media_url && (
        <div className={mediaVariants()}>
          {isVideoUrl(media_url) ? (
            <video autoPlay muted loop className="aspect-video object-cover">
              <source src={media_url} />
            </video>
          ) : (
            <Image src={media_url} width={600} height={400} className="aspect-video object-cover" />
          )}
        </div>
      )}
      {title && (
        <div className={titleVariants()}>
          <LightBulbIcon className="size-6 text-blue" />
          <span>{title}</span>
        </div>
      )}
      <div className={bodyVariants({})}>
        {children}
      </div>
    </div>
  );
}

function isVideoUrl(url: string): boolean {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
  try {
    const urlObj = new URL(url); // Validate if it's a valid URL
    const extension = urlObj.pathname.split('.').pop()?.toLowerCase();
    return extension ? videoExtensions.includes(`.${extension}`) : false;
  } catch {
    return false; // Return false if the URL is invalid
  }
}