
{/** Card component to display details
  *   
  * title: Title of the card
  * desc: Description text
  * tags: Array of tags (strings)
  * date: Date string or Date object
  * images: Array of image URLs
  * 
  */}
export default function Card({ title, desc, tags = [], date, images = [] }) {

  // Pick up to 4 random images
  const imgSources = images.length > 4
    ? [...images].sort(() => 0.5 - Math.random()).slice(0, 4)
    : images;

  return (
    <div className="min-w-[220px] max-w-xs bg-gradient-to-br from-white via-blue-50 to-yellow-50 border border-blue-100 shadow-2xl rounded-2xl px-5 py-4 text-slate-800 z-30">
        {/* Div context wrapper for the card
          * 
          * min-w-[220px]: Ensure a minimum width for the card
          * max-w-xs: Limit the maximum width to a small size
          * bg-gradient-to-br from-white via-blue-50 to-yellow-50: Apply a subtle gradient background
          * border border-blue-100: Light blue border for definition
          * shadow-2xl: Prominent shadow for depth
          * rounded-2xl: Rounded corners for a softer look
          * px-5 py-4: Padding inside the card for spacing
          * text-slate-800: Dark text color for readability
          * z-30: Ensure the card appears above other elements when overlapping
          * 
          */}
      <div className="font-bold text-blue-800 mb-1 text-lg leading-tight tracking-tight">{title}</div>
      {/** Div context wrapper for the date
        *
        * font-bold: Bold text for emphasis
        * text-blue-800: Blue color for the title
        * mb-1: Margin bottom for spacing
        * text-lg: Larger text size for prominence
        * leading-tight: Tight line height for compactness
        * tracking-tight: Tight letter spacing for a refined look
        * 
        */}
      {date && (
        <div className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-0.5 inline-block mb-2 shadow-sm font-mono">
          {/* Div context wrapper for the date 
          * 
          * text-xs: Smaller text size for the date
          * text-blue-600: Blue color for the date text
          * bg-blue-50: Light blue background for contrast
          * rounded: Rounded corners for a softer look
          * px-2 py-0.5: Padding for spacing around the date
          * inline-block: Allow the date to size based on its content
          * mb-2: Margin bottom for spacing from the description
          * shadow-sm: Subtle shadow for slight depth
          * font-mono: Monospaced font for a techy feel
          *   
          */}
          {typeof date === "string" ? date : date.toLocaleDateString()}
        </div>
        
      )}
      <div className="mb-2 text-slate-700 leading-relaxed">{desc}</div>
      {/** Div context wrapper for the tags
       * 
       * mb-2: Margin bottom for spacing from the description
       * text-slate-700: Slightly lighter text color for the description
       * leading-relaxed: Relaxed line height for readability
       * 
       */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2 mt-1">
        {/** Div context wrapper for the tags  
          *    
          * flex flex-wrap: Use flexbox to layout tags and allow wrapping
          * gap-2: Gap between tags for spacing
          * mb-2: Margin bottom for spacing from images
          * mt-1: Margin top for slight spacing from description
          *  
          */}
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gradient-to-r from-blue-100 via-white to-yellow-100 text-blue-800 border border-blue-200 font-semibold px-2 py-0.5 rounded-full text-xs shadow-sm transition hover:bg-blue-200"
            >
            {/* Span context wrapper for each tag
              * 
              * bg-gradient-to-r from-blue-100 via-white to-yellow-100: Gradient background for visual interest
              * text-blue-800: Blue text color for readability
              * border border-blue-200: Light blue border for definition
              * font-semibold: Semi-bold text for emphasis
              * px-2 py-0.5: Padding for spacing around the tag text
              * rounded-full: Fully rounded corners for a pill shape
              * text-xs: Smaller text size for tags 
              * shadow-sm: Subtle shadow for slight depth
              * transition hover:bg-blue-200: Smooth background color change on hover for interactivity
              * 
              */}
              #{tag}
            </span>
          ))}
        </div>
      )}

      {imgSources.length > 0 && (
        <div className={`grid gap-2 mt-3 ${imgSources.length > 1 ? 'grid-cols-2' : ''}`}>
        {/** Div context wrapper for the images
         * 
         * grid: Use CSS grid for layout
         * gap-2: Gap between images for spacing
         * mt-3: Margin top for spacing from tags/description
         * grid-cols-2: Use two columns if there are multiple images
         * 
         */}
         {/** Img context wrapper for each image
              *
              * w-16 h-16: Fixed size for uniform thumbnails
              * object-cover: Ensure the image covers the area without distortion
              * rounded-lg: Rounded corners for a softer look
              * border border-blue-100: Light blue border for definition
              * shadow-sm: Subtle shadow for slight depth
              * hover:scale-105 hover:z-10: Slightly enlarge and bring to front on hover for interactivity
              * transition: Smooth transition for hover effects
              * 
              */}  
          {imgSources.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`event-img-${i}`}
              className="w-16 h-16 object-cover rounded-lg border border-blue-100 shadow-sm hover:scale-105 hover:z-10 transition"
            />
          ))}
        </div>
      )}
    </div>
  );
}