import React from "react";
import { cva } from "class-variance-authority";

export interface PanelProps {
  /** single child will be placed in body, array of children will be place in body without layout */
  children?: React.ReactNode;
  /** heading of panel */
  heading?: string;
  headingElement: "h1" | "h2" | "h3" | "h4";
  backgroundUrl?: string;
  /** color scheme: background, text color, border, etc. */
  palette?: "light" | "dark" | "accent";
  /** grid layout; only applicable when using array of React children */
  layout?: "grid-1" | "grid-2" | "grid-3" | "grid-4" | "grid-3-9" | "grid-4-8" | "grid-8-4" | "grid-9-3";
}

export function Panel({
  children,
  heading,
  headingElement = "h2",
  backgroundUrl,
  palette,
  layout = "grid-3"
}: PanelProps): JSX.Element {

  const panelVariants = cva(['relative', 'border', 'rounded-lg'], {
    variants: {
      palette: {
        light: [
          'border-gray-300',
          'bg-linear-to-br',
          'from-white',
          'to-stone-100'],
        dark: [
          'text-white',
          'border-black-800',
          'bg-linear-to-br',
          'from-slate-700',
          'to-stone-700'
        ],
        accent: []
      }
    }
  })
  const headingVariants = cva(['border-b', 'text-md', 'font-bold', 'uppercase', 'flex', 'gap-2', 'p-4'], {
    variants: {
      palette: {
        light: ['border-gray-300'],
        dark: ['border-gray-800'],
        accent: []
      }
    }
  })
  const hasLayout = Array.isArray(children) ? ['grid', 'sm:grid-cols-12', 'gap-4'] : [];
  const bodyVariants = cva(['p-4', ...hasLayout], {
    variants: {
      layout: {
        'grid-1': ['sm:[&>div]:col-span-12'],
        'grid-2': ['sm:[&>div]:col-span-6'],
        'grid-3': ['sm:[&>div]:col-span-4'],
        'grid-4': ['sm:[&>div]:col-span-3'],
        'grid-3-9': ['sm:[&>div:nth-child(odd)]:col-span-3', 'sm:[&>div:nth-child(even)]:col-span-9'],
        'grid-4-8': ['sm:[&>div:nth-child(odd)]:col-span-4', 'sm:[&>div:nth-child(even)]:col-span-8'],
        'grid-8-4': ['sm:[&>div:nth-child(odd)]:col-span-8', 'sm:[&>div:nth-child(even)]:col-span-4'],
        'grid-9-3': ['sm:[&>div:nth-child(odd)]:col-span-9', 'sm:[&>div:nth-child(even)]:col-span-3']
      }
    }
  })


  return (
    <div
      className={panelVariants({ palette })}
    >
      {backgroundUrl && (
        <img src={backgroundUrl} alt="" className="absolute size-full -z-1 object-cover opacity-5" />
      )}
      {heading &&
        React.createElement(
          headingElement, // Dynamically render the heading element
          { className: headingVariants({ palette }) }, // Pass className as props
          heading // Render the heading text
        )}
      <div className={bodyVariants({ layout })}>
        {Array.isArray(children) ? (
          React.Children.map(children, (child) => (
            <div>{child}</div>
          ))
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
}