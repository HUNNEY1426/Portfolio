"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

interface QuoteItem {
  quote: string;
  author: string;
}

const POPULAR_QUOTES: QuoteItem[] = [
  {
    quote: "A ship in harbor is safe, but that is not what ships are built for.",
    author: "JOHN A. SHEDD",
  },
  {
    quote: "The people who are crazy enough to think they can change the world are the ones who do.",
    author: "STEVE JOBS",
  },
  {
    quote: "The best way to predict the future is to invent it.",
    author: "ALAN KAY",
  },
  {
    quote: "Imagination is more important than knowledge. Knowledge is limited, whereas imagination embraces the entire world.",
    author: "ALBERT EINSTEIN",
  },
  {
    quote: "The soul becomes dyed with the color of its thoughts.",
    author: "MARCUS AURELIUS",
  },
  {
    quote: "Simplicity is the ultimate sophistication.",
    author: "LEONARDO DA VINCI",
  },
  {
    quote: "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.",
    author: "ANTOINE DE SAINT-EXUPÉRY",
  },
  {
    quote: "Somewhere, something incredible is waiting to be known.",
    author: "CARL SAGAN",
  },
  {
    quote: "Luck is what happens when preparation meets opportunity.",
    author: "SENECA",
  },
  {
    quote: "The present is theirs; the future, for which I really worked, is mine.",
    author: "NIKOLA TESLA",
  },
  {
    quote: "The journey of a thousand miles begins with a single step.",
    author: "LAO TZU",
  },
  {
    quote: "He who has a why to live can bear almost any how.",
    author: "FRIEDRICH NIETZSCHE",
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "OSCAR WILDE",
  },
  {
    quote: "You can't use up creativity. The more you use, the more you have.",
    author: "MAYA ANGELOU",
  },
  {
    quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "RALPH WALDO EMERSON",
  },
  {
    quote: "The only way of discovering the limits of the possible is to venture a little way past them into the impossible.",
    author: "ARTHUR C. CLARKE",
  },
  {
    quote: "I would rather have questions that can't be answered than answers that can't be questioned.",
    author: "RICHARD FEYNMAN",
  },
  {
    quote: "It always seems impossible until it is done.",
    author: "NELSON MANDELA",
  },
  {
    quote: "Life can only be understood backwards; but it must be lived forwards.",
    author: "SØREN KIERKEGAARD",
  },
  {
    quote: "Be like water making its way through cracks. Adjust to the object, and you shall find a way around or through it.",
    author: "BRUCE LEE",
  },
  {
    quote: "What you seek is seeking you.",
    author: "RUMI",
  },
  {
    quote: "The world always seems brighter when you've just made something that wasn't there before.",
    author: "NEIL GAIMAN",
  },
  {
    quote: "Far and away the best prize that life has to offer is the chance to work hard at work worth doing.",
    author: "THEODORE ROOSEVELT",
  },
  {
    quote: "It is not the brains that matter most, but that which guides them — the character and the heart.",
    author: "FYODOR DOSTOEVSKY",
  },
  {
    quote: "Waste no more time arguing about what a good person should be. Be one.",
    author: "MARCUS AURELIUS",
  },
  {
    quote: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    author: "HENRY DAVID THOREAU",
  },
  {
    quote: "Keep your face always toward the sunshine, and shadows will fall behind you.",
    author: "WALT WHITMAN",
  },
];

const randomQuoteIndex = () => Math.floor(Math.random() * POPULAR_QUOTES.length);

export function QuoteSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.25, once: false });

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const wasInViewRef = useRef(false);

  const selectedQuote = POPULAR_QUOTES[quoteIndex];

  // A fresh quote is rolled whenever the section enters the viewport. The
  // roll happens in a deferred callback rather than during render, so the
  // value is never an unstable render-time input.
  useEffect(() => {
    if (!isInView) {
      wasInViewRef.current = false;
      return;
    }
    if (wasInViewRef.current) return;
    wasInViewRef.current = true;

    const id = setTimeout(() => {
      setQuoteIndex(randomQuoteIndex());
      setDisplayedText("");
      setIsTypingComplete(false);
    }, 0);
    return () => clearTimeout(id);
  }, [isInView]);

  // Typing animation, triggered when the section scrolls into view.
  useEffect(() => {
    if (!isInView) return;

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout>;
    const fullText = selectedQuote.quote;
    let charIndex = 0;

    const typeNextChar = () => {
      if (!isMounted) return;
      if (charIndex < fullText.length) {
        charIndex++;
        setDisplayedText(fullText.slice(0, charIndex));

        const char = fullText[charIndex - 1];
        // Human-like typing cadence: brief rest at punctuation
        const delay =
          char === ","
            ? 140
            : char === "." || char === ";" || char === "!" || char === "?"
            ? 220
            : 20 + Math.random() * 10;

        timerId = setTimeout(typeNextChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    const initialDelay = setTimeout(typeNextChar, 250);
    return () => {
      isMounted = false;
      clearTimeout(initialDelay);
      clearTimeout(timerId);
    };
  }, [isInView, selectedQuote]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[50vh] sm:min-h-[55vh] flex flex-col justify-center items-center px-gutter lg:px-gutter-desktop py-24 sm:py-32 bg-background overflow-hidden text-center select-none"
      id="quote"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl mx-auto flex flex-col items-center justify-center px-4"
      >
        {/* Typewritten Quote Statement */}
        <blockquote className="font-sans italic text-2xl sm:text-3xl md:text-4xl text-on-surface font-normal leading-[1.38] sm:leading-[1.42] tracking-tight min-h-[4em] sm:min-h-[3.2em] flex items-center justify-center flex-wrap">
          <span>
            &ldquo;{displayedText}
            {!isTypingComplete && (
              <span className="inline-block w-[2.5px] h-[0.9em] bg-on-surface ml-1 animate-pulse align-baseline" />
            )}
            {isTypingComplete && <>&rdquo;</>}
          </span>
        </blockquote>

        {/* Author Attribution with matching side lines - reveals upon typing completion */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 flex items-center justify-center gap-3 sm:gap-4"
        >
          <div className="w-8 sm:w-12 h-[1px] bg-hairline-border" />
          <cite className="font-mono text-xs sm:text-[13px] tracking-[0.25em] uppercase not-italic font-medium text-muted-subtle">
            {selectedQuote.author}
          </cite>
          <div className="w-8 sm:w-12 h-[1px] bg-hairline-border" />
        </motion.div>
      </motion.div>
    </section>
  );
}
