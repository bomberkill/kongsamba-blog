import NextImage from 'next/legacy/image';
import { motion } from 'framer-motion';
import { Box, Center, Image } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import animLogo from '@/public/images/anim-logo.png';
import { theme } from '@/theme';

export default function LoadingAnimation() {
  const extraSmallScreen = useMediaQuery('(max-width: 575px)');
  return (
    <Center pos="relative" w="100vw" h="100vh">
      <motion.div
        style={{
          width: extraSmallScreen ? 50 : 75,
          height: extraSmallScreen ? 50 : 75,
          borderRadius: '50%',
          position: 'absolute',
          backgroundColor: theme.colors?.orange?.[9],
        }}
        animate={{ scale: [0.5, 1.5, 0.5] }}
        transition={{
          duration: 1.5,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
      {/* </motion.div> */}
      <Box w={extraSmallScreen ? 50 : 75} h={extraSmallScreen ? 50 : 75}>
        <Image
          style={{ position: 'relative' }}
          w="100%"
          h="100%"
          component={NextImage}
          src={animLogo}
          alt="anim logo"
        />
      </Box>
    </Center>
  );
}
