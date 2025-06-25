import React from 'react';
import Image from 'next/image';
import { cva } from "class-variance-authority";
import { LightBulbIcon, ScissorsIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { VideoPlayer } from "../video/video";

export interface CardProps {
  children?: React.ReactNode;
  /** title of card */
  title?: string;
  /** image or video url; placed at top of card */
  media_url?: string;
  /** supplied by heroicons */
  icon?: "lightBulb" | "scissors" | "wrench";
  size?: "standard" | "small";
}

export function Card({
  children,
  title,
  media_url,
  icon,
  size = "standard"
}: CardProps): JSX.Element {
  const cardVariants = cva(['border', 'rounded-lg', 'border-gray-200', 'flex', 'flex-col', 'overflow-hidden'])
  const mediaVariants = cva([])
  const titleVariants = cva(['border-b', 'text-md', 'font-bold', 'uppercase', 'flex', 'gap-2'], {
    variants: {
      size: {
        standard: ['p-4'],
        small: ['p-2']
      }
    }
  })
  const bodyVariants = cva([], {
    variants: {
      size: {
        standard: ['p-4'],
        small: ['p-2']
      }
    }
  })

  return (
    <div
      className={cardVariants({})}
    >
      {media_url && (
        <div className={mediaVariants()}>
          {isVideoUrl(media_url) ? (
            <VideoPlayer src={media_url} />
          ) : (
            <Image src={media_url} width={600} height={400} className="aspect-video object-cover" alt="" />
          )}
        </div>
      )}
      {title && (
        <div className={titleVariants({ size })}>
          {icon == "lightBulb" && (<LightBulbIcon className="size-6 text-blue" />)}
          {icon == "scissors" && (<ScissorsIcon className="size-6 text-blue" />)}
          {icon == "wrench" && (<WrenchIcon className="size-6 text-blue" />)}
          <span>{title}</span>
        </div>
      )}
      <div className={bodyVariants({ size })}>
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