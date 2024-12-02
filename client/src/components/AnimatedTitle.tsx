import { useEffect } from "react";
import styled from "styled-components";
import { useAnimation, motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
// Define styled components
const Title = styled.h2`
  font-size: 1rem;
  font-weight: 600;
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.25em;
  white-space: nowrap;
  
`;

const Character = styled(motion.span)`
  display: inline-block;
  margin-right: -0.05em;
  
`;

// Define the props type
interface AnimatedTitleProps {
  text: string;
  className:string;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text,className }) => {
  const ctrls = useAnimation();
  
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  
  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    } else {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);
  
  // Define animation variants
  const wordAnimation: Variants = {
    hidden: {},
    visible: {},
  };
  
  const characterAnimation: Variants = {
    hidden: {
      opacity: 0,
      y: `0.25em`,
    },
    visible: {
      opacity: 1,
      y: `0.25em`,
      transition: {
        duration: 1,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };
  
  return (
    <Title aria-label={text} role="heading">
      {text.split(" ").map((word, index) => (
        <Word
          ref={ref}
          aria-hidden="true"
          key={index}
          initial="hidden"
          animate={ctrls}
          variants={wordAnimation}
          transition={{
            delayChildren: index * 0.25,
            staggerChildren: 0.05,
          }}
        >
          {word.split("").map((character, index) => (
            <Character
              aria-hidden="true"
              key={index}
              variants={characterAnimation}
            >
              <p className={clsx("leading-none ", className)}>{character}</p>
            </Character>
          ))}
        </Word>
      ))}
    </Title>
  );
};

export default AnimatedTitle;
