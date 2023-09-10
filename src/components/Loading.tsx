import { motion } from 'framer-motion';
import styled from 'styled-components';
import { buttonColor } from '../popup/styleMixins';

const ScreenContainer = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled(motion.div)`
  width: 4rem;
  height: 4rem;
  display: flex;
  justify-content: space-around;
`;

const LoadingCircle = styled(motion.span)`
  display: block;
  width: 1rem;
  height: 1rem;
  background-color: ${buttonColor};
  border-radius: 0.5rem;
`;

const Loading = () => (
  <ScreenContainer>
    <LoadingContainer
      variants={{
        start: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        end: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      initial="start"
      animate="end"
    >
      {[null, null, null].map((_, i) => (
        <LoadingCircle
          // There is nothing else I can use as a key ¯\_(ツ)_/¯
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          variants={{
            start: {
              y: '0%',
            },
            end: {
              y: '60%',
            },
          }}
          transition={{
            duration: 0.4,
            yoyo: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </LoadingContainer>
  </ScreenContainer>
);

export default Loading;
