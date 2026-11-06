/**
 * Flapboard
 *
 * Split-flap word board for a dashboard hero. Idles on `words[0]`. While the
 * nearest `<h1>` ancestor is hovered it spins each cell through random glyphs
 * and cycles through `words` (or re-flaps the single word), then settles back
 * on `words[0]` when the pointer leaves.
 *
 * `onWordChange` fires with the index of the word being shown, so the host
 * can retint the page (the portal copies a firm's token set into `--accent`).
 * The board's own color is `text-primary`; no color literals live here.
 *
 * Honors prefers-reduced-motion: glyphs swap in place instead of flipping.
 * Styles live in `src/styles/tailwind.css` under "Flapboard".
 *
 * Source: tlb-financial-tools `apps/web/src/shared/components/TlbFlapboard.tsx`,
 * decoupled from the portal's firm-theme registry.
 *
 * @example
 *   <h1 className="text-6xl">Welcome to <Flapboard words={["TLB"]} /></h1>
 */
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const INTERVAL_MS = 2200;
/** One fold of a flap; matches the .flap-char transition in tailwind.css. */
const FOLD_MS = 90;

function setChar(ch: HTMLElement, c: string) {
  ch.textContent = !c || c === " " ? " " : c;
}

interface FlapboardProps {
  /** Words to show, uppercase. The board idles on the first. */
  words: readonly string[];
  /** Called with the index of the word the board is settling on. */
  onWordChange?: (index: number) => void;
  className?: string;
}

function Flapboard({ words, onWordChange, className }: FlapboardProps) {
  const boardRef = useRef<HTMLSpanElement>(null);
  const onWordChangeRef = useRef(onWordChange);
  onWordChangeRef.current = onWordChange;
  const key = words.join("|");

  useEffect(() => {
    const board = boardRef.current;
    if (!board || words.length === 0) return;
    const idle = words[0] ?? "";
    const max = words.reduce((m, w) => Math.max(m, w.length), 0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gen = 0;
    let timer: number | null = null;
    let idx = 0;
    let hovering = false;

    board.textContent = "";
    const cells: HTMLSpanElement[] = [];
    for (let i = 0; i < max; i++) {
      const cell = document.createElement("span");
      cell.className = "flap-cell blank";
      const ch = document.createElement("span");
      ch.className = "flap-char";
      ch.setAttribute("aria-hidden", "true");
      ch.textContent = " ";
      cell.appendChild(ch);
      board.appendChild(cell);
      cells.push(cell);
    }

    // Size each cell to the glyph it settles on so condensed letters keep
    // the face's own spacing. The probe shares the board's font.
    const probe = document.createElement("span");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    board.appendChild(probe);
    const fit = (cell: HTMLSpanElement, c: string) => {
      if (!c || c === " ") {
        cell.style.width = c === " " ? "0.3em" : "";
        return;
      }
      probe.textContent = c;
      const fontSize = parseFloat(getComputedStyle(board).fontSize) || 1;
      cell.style.width = `${probe.getBoundingClientRect().width / fontSize + 0.04}em`;
    };

    const flip = (cell: HTMLSpanElement, c: string) => {
      const ch = cell.querySelector<HTMLElement>(".flap-char");
      if (!ch) return;
      if (reduce) {
        setChar(ch, c);
        return;
      }
      ch.style.transition = "";
      ch.style.transform = "rotateX(-90deg)";
      window.setTimeout(() => {
        setChar(ch, c);
        ch.style.transition = "none";
        ch.style.transform = "rotateX(90deg)";
        void ch.offsetWidth;
        ch.style.transition = "";
        ch.style.transform = "rotateX(0deg)";
      }, FOLD_MS);
    };

    const spin = (cell: HTMLSpanElement, target: string, steps: number, delay: number, g: number) => {
      window.setTimeout(() => {
        if (g !== gen) return;
        let k = 0;
        const step = () => {
          if (g !== gen) return;
          if (k < steps) {
            flip(cell, GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "A");
            k++;
            window.setTimeout(step, FOLD_MS * 2 + 20);
          } else {
            flip(cell, target);
          }
        };
        step();
      }, delay);
    };

    const paint = (word: string) => {
      cells.forEach((cell, i) => {
        const blank = i >= word.length;
        cell.classList.toggle("blank", blank);
        fit(cell, blank ? "" : word.charAt(i));
        const ch = cell.querySelector<HTMLElement>(".flap-char");
        if (!ch) return;
        ch.style.transform = "rotateX(0deg)";
        setChar(ch, blank ? "" : word.charAt(i));
      });
      board.setAttribute("aria-label", word);
    };

    const render = (word: string) => {
      if (reduce) {
        paint(word);
        return;
      }
      gen += 1;
      const g = gen;
      cells.forEach((cell, i) => {
        if (i < word.length) {
          cell.classList.remove("blank");
          const t = word.charAt(i);
          fit(cell, t);
          spin(cell, t, t === " " ? 0 : 1 + (i % 3), i * 60, g);
        } else {
          cell.classList.add("blank");
          fit(cell, "");
          flip(cell, "");
        }
      });
      board.setAttribute("aria-label", word);
    };

    paint(idle);
    void document.fonts?.ready.then(() => {
      if (!hovering) paint(idle);
    });
    onWordChangeRef.current?.(0);

    const title = board.closest("h1");
    if (!title) return;

    const advance = () => {
      idx = (idx + 1) % words.length;
      onWordChangeRef.current?.(idx);
      render(words[idx] ?? "");
    };
    const start = () => {
      if (hovering) return;
      hovering = true;
      idx = -1;
      board.classList.add("live");
      advance();
      timer = window.setInterval(advance, INTERVAL_MS);
    };
    const stop = () => {
      hovering = false;
      if (timer) window.clearInterval(timer);
      timer = null;
      onWordChangeRef.current?.(0);
      render(idle);
      window.setTimeout(() => {
        if (!hovering) board.classList.remove("live");
      }, 700);
    };

    title.addEventListener("mouseenter", start);
    title.addEventListener("mouseleave", stop);
    return () => {
      gen += 1;
      title.removeEventListener("mouseenter", start);
      title.removeEventListener("mouseleave", stop);
      if (timer) window.clearInterval(timer);
    };
    // `key` stands in for `words`, so a new array holding the same words
    // does not rebuild the board.
  }, [key]);

  return (
    <span
      ref={boardRef}
      data-slot="flapboard"
      role="img"
      aria-label={words[0] ?? ""}
      className={cn("flapboard", className)}
    >
      {words[0]}
    </span>
  );
}

export { Flapboard };
export type { FlapboardProps };
