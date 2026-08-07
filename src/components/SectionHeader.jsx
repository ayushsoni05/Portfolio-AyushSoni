import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SectionHeader({ label, headingLines = [], description, inView = false }) {
  const reducedMotion = useReducedMotion();
  const animateState = inView || reducedMotion ? 'visible' : 'hidden';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-end justify-start gap-10 md:gap-20 lg:gap-32">
      {/* Left Column: Horizontal line + Label + Stacked H2 */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
        }}
        initial="hidden"
        animate={animateState}
      >
        {label && (
          <p
            className="text-[16px] md:text-[18px] tracking-widest uppercase font-[Space_Grotesk,sans-serif] font-semibold flex items-center gap-3 mb-3 md:mb-5"
            style={{ color: 'var(--text-primary)' }}
          >
            <span
              className="inline-block w-[14%] h-[2.5px] md:w-[12%]"
              style={{ background: 'var(--text-primary)' }}
            />
            {label}
          </p>
        )}

        {headingLines.length > 0 && (
          <h2
            className="font-[Space_Grotesk,sans-serif] font-extrabold text-5xl md:text-7xl lg:text-[72px] tracking-wider uppercase leading-none"
            style={{ color: 'var(--text-primary)' }}
          >
            {headingLines.map((line, idx) => (
              <span key={idx} className="block mb-1">
                {line}
              </span>
            ))}
          </h2>
        )}
      </motion.div>

      {/* Right Column: Description Paragraph */}
      {description && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.4, 0, 0.2, 1] } },
          }}
          initial="hidden"
          animate={animateState}
          className="text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed font-[Space_Grotesk,sans-serif] max-w-[620px] tracking-wide [word-spacing:2px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
