import React from "react";
import { CardImage } from "./CardImage.jsx";

export function repetitionsForWidth(viewport, stride, count) {
  return Math.max(1, Math.ceil((viewport + stride * 2) / (stride * count)));
}

export function GalleryRow({ cards, reverse = false, hiddenLabels = [] }) {
  const rowRef = React.useRef(null);
  const [repeats, setRepeats] = React.useState(4);
  const [duration, setDuration] = React.useState(46);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    const row = rowRef.current;
    const measure = () => {
      const card = row.querySelector(".gallery-mini-card");
      const group = row.querySelector(".gallery-group");
      if (!card || !group) return;
      const stride = card.offsetWidth + parseFloat(getComputedStyle(group).columnGap || "16");
      if (!stride) return;
      const count = repetitionsForWidth(row.clientWidth, stride, cards.length);
      setRepeats(count);
      setDuration(stride * cards.length * count / 24);
    };
    measure();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    observer?.observe(row);
    window.addEventListener("resize", measure);
    // A tab change must not leave a pointer/focus pause latched on return.
    const resume = () => setPaused(false);
    window.addEventListener("blur", resume);
    window.addEventListener("focus", resume);
    document.addEventListener("visibilitychange", resume);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("blur", resume);
      window.removeEventListener("focus", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [cards]);

  return <div ref={rowRef} className="gallery-wave" onPointerEnter={event => {
    if (event.pointerType !== "touch") setPaused(true);
  }} onPointerLeave={() => setPaused(false)}>
    <div className={`gallery-track${reverse ? " gallery-track--reverse" : ""}`}
      data-paused={paused} style={{ "--gallery-duration": `${duration}s` }}>
      {[0, 1].map(copy => <div key={copy} className="gallery-group" aria-hidden={copy ? true : undefined}>
        {Array.from({ length: repeats }, (_, repeat) => cards.map((card, index) => {
          const duplicate = copy > 0 || repeat > 0 || hiddenLabels.includes(card.label);
          const Tag = card.url ? "a" : "div";
          return <Tag key={`${repeat}-${index}`} aria-hidden={duplicate ? true : undefined}
            tabIndex={card.url && duplicate ? -1 : undefined}
            {...(card.url ? { href: card.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Visit ${card.company || card.label}` } : {})}
            className={`gallery-mini-card${card.url ? " gallery-mini-card--linked" : ""}`}
            style={{ background: card.background, "--wave-offset": card.offset, "--wave-delay": `-${parseFloat(card.delay)}s` }}>
            <span className={`gallery-hover-pill${reverse ? " gallery-hover-pill--bottom" : ""}`}>{card.company || card.label}</span>
            <span className="gallery-mini-card-art" aria-hidden="true">
              {card.image ? <CardImage src={card.image} alt="" className="gallery-mini-card-image" /> : <>
                <span className="gallery-mini-card-grid" /><span className="gallery-mini-card-line" />
                <span className="gallery-mini-card-circle" /><span className="gallery-mini-card-label">{card.label}</span>
              </>}
            </span>
          </Tag>;
        }))}
      </div>)}
    </div>
  </div>;
}
