import { ExternalLink } from "lucide-react";

interface PreviewSelectorProps {
  imgA: string | null;
  imgB: string | null;
  linkA: string | null;
  linkB: string | null;
  selected: "A" | "B" | null;
  onSelect: (preview: "A" | "B") => void;
  showError?: boolean;
}

const PreviewSelector = ({ imgA, imgB, linkA, linkB, selected, onSelect, showError }: PreviewSelectorProps) => {
  const hasCards = imgA || imgB || linkA || linkB;
  if (!hasCards) return null;

  const cards: { label: string; id: "A" | "B"; img: string | null; link: string | null }[] = [
    { label: "Preview A", id: "A", img: imgA, link: linkA },
    { label: "Preview B", id: "B", img: imgB, link: linkB },
  ];

  return (
    <div className="rounded-2xl border-2 border-border bg-background p-5 shadow-sm space-y-4">
      <h3 className="text-base font-bold text-foreground font-display">
        Choose the preview you want us to build <span className="text-destructive text-xs font-semibold">*</span>
      </h3>
      {showError && !selected && (
        <p className="text-sm text-destructive font-medium">Please select a preview direction before continuing.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => onSelect(card.id)}
            className={`rounded-xl border-2 cursor-pointer transition-all overflow-hidden flex flex-col ${
              selected === card.id
                ? "border-primary ring-2 ring-primary/30"
                : "border-border hover:border-muted-foreground/40"
            }`}
          >
            {/* Radio + Label — always on top */}
            <div className="p-4 pb-2 flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  selected === card.id
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/40"
                }`}
              >
                {selected === card.id && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
              <span className="text-sm font-semibold text-foreground">Build {card.label}</span>
            </div>

            {/* Thumbnail — always in the middle */}
            <div className="mx-4 aspect-video bg-muted rounded-lg overflow-hidden relative">
              {card.img && (
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover absolute inset-0"
                />
              )}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm relative z-10">
                {!card.img && card.label}
              </div>
            </div>

            {/* Open link — always at the bottom */}
            <div className="p-4 pt-2">
              {card.link ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  <ExternalLink size={12} />
                  Open {card.label}
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">No link provided</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewSelector;
