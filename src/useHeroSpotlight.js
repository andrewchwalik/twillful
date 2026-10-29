import React from "react";

export function useHeroSpotlight({ keys, settled, reducedMotion, heroRef }) {
  const [hovered, setHovered] = React.useState(null);
  const [focused, setFocused] = React.useState(null);
  const [index, setIndex] = React.useState(0);
  const [raised, setRaised] = React.useState(true);
  const [inView, setInView] = React.useState(true);
  const [visible, setVisible] = React.useState(true);
  const manual = hovered ?? focused;
  const cycling = settled && !reducedMotion && inView && visible;

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(heroRef.current);
    const updateVisibility = () => setVisible(document.visibilityState !== "hidden");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [heroRef]);

  // Hand control back to the next card, rather than jumping to the old automatic one.
  React.useEffect(() => {
    if (manual === null) return;
    const current = keys.indexOf(manual);
    if (current >= 0) setIndex(current);
    setRaised(false);
  }, [manual, keys]);

  React.useEffect(() => {
    if (!cycling || manual !== null) return;
    const timer = window.setTimeout(() => {
      if (raised) setRaised(false);
      else {
        setIndex(current => (current + 1) % keys.length);
        setRaised(true);
      }
    }, raised ? 2000 : 300);
    return () => window.clearTimeout(timer);
  }, [cycling, manual, raised, index, keys]);

  return {
    activeKey: settled ? manual ?? (cycling && raised ? keys[index] : null) : null,
    pointerEnter: (key, event) => { if (event.pointerType !== "touch") setHovered(key); },
    pointerLeave: key => setHovered(current => current === key ? null : current),
    focus: (key, event) => {
      if (event.currentTarget.matches(":focus-visible")) {
        setHovered(null);
        setFocused(key);
      }
    },
    blur: key => setFocused(current => current === key ? null : current)
  };
}
