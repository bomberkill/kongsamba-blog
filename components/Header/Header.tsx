import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  AspectRatio,
  Box,
  Burger,
  Button,
  Container,
  Divider,
  Drawer,
  Group,
  HoverCard,
  rem,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import logo from '@/public/images/logo.png';
import { theme } from '@/theme';
import classes from './Header.module.css';

export default function Header() {
  const { t, i18n } = useTranslation('common');
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const smallScreen = useMediaQuery('(max-width: 793px)');
  const extraSmallScreen = useMediaQuery('(max-width: 575px)');
  const [opened, { open, close }] = useDisclosure();
  const changeLanguage = (lang: 'en' | 'fr') => {
    i18n.changeLanguage(lang === 'en' ? 'fr' : 'en');
    router.push(router.pathname, router.asPath, { locale: lang });
  };
  // useEffect(() => {
  //     console.log("router pathname", router.pathname);
  // }, [])
  const sections = () => {
    const data = [
      {
        text: t('header.sections.home'),
        link: '/',
      },
      {
        text: t('header.sections.section.title'),
        link: '',
      },
      {
        text: t('header.sections.about'),
        link: '/about',
      },
      {
        text: t('header.sections.contact'),
        link: '/contact',
      },
    ];
    const subLinks = [
      {
        text: t('header.sections.section.subLinks.article'),
        link: '/posts#articles',
      },
      {
        text: t('header.sections.section.subLinks.news'),
        link: '/posts#news',
      },
      {
        text: t('header.sections.section.subLinks.breve'),
        link: '/posts#breves',
      },
      {
        text: t('header.sections.section.subLinks.cover'),
        link: '/posts#covers',
      },
      {
        text: t('header.sections.section.subLinks.playlist'),
        link: '/playlists',
      },
      {
        text: t('header.sections.section.subLinks.other'),
        link: '/posts#sports',
      },
    ];
    const links = subLinks.map((sublink, linkIndex) => (
      <Box key={linkIndex} w="100%">
        <Link style={{ textDecoration: 'none' }} href={sublink.link} key={linkIndex}>
          <Text className={classes.link} size="sm" fw={500}>
            {sublink.text}
          </Text>
        </Link>
        {linkIndex !== subLinks.length - 1 && <Divider my="xs" variant="dotted" />}
      </Box>
    ));
    return (
      <>
        {!smallScreen ? (
          <Group align="center" justify="space-between" gap={theme.spacing?.xl}>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                {index === 1 ? (
                  <HoverCard key={index} shadow="sm">
                    <HoverCard.Target>
                      <Text
                        style={{ cursor: 'pointer' }}
                        size="sm"
                        c={theme.colors?.dark?.[0]}
                        fw={700}
                      >
                        {item.text}
                      </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>{links}</HoverCard.Dropdown>
                  </HoverCard>
                ) : (
                  <Link style={{ textDecoration: 'none' }} href={item.link} key={index}>
                    <Text
                      c={router.pathname === item.link ? theme.colors?.orange?.[0] : undefined}
                      className={classes.link}
                      size="sm"
                      fw={700}
                    >
                      {item.text}
                    </Text>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </Group>
        ) : (
          <Stack align="center" gap={theme.spacing?.xs}>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                {index === 1 ? (
                  <HoverCard key={index} shadow="sm">
                    <HoverCard.Target>
                      <Text
                        style={{ cursor: 'pointer' }}
                        size="sm"
                        c={theme.colors?.dark?.[0]}
                        fw={700}
                      >
                        {item.text}
                      </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>{links}</HoverCard.Dropdown>
                  </HoverCard>
                ) : (
                  <Link style={{ textDecoration: 'none' }} href={item.link} key={index}>
                    <Text
                      c={router.pathname === item.link ? theme.colors?.orange?.[0] : undefined}
                      className={classes.link}
                      size="sm"
                      fw={700}
                    >
                      {item.text}
                    </Text>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </Stack>
        )}
      </>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
        // console.log("scroll");
      } else {
        setScrolled(false);
        // console.log("no scroll");
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box style={{ zIndex: 10 }} w="100%" pos="fixed">
      <header
        style={
          scrolled
            ? {
                background: 'white',
                boxShadow: '2px 2px 2px 0 rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
              }
            : { background: 'transparent' }
        }
      >
        <Container
          py={!extraSmallScreen ? rem(5) : rem(0)}
          size={!extraSmallScreen ? '95%' : '100%'}
        >
          {!smallScreen ? (
            <Group align="center" justify="space-between">
              <AspectRatio maw={150} ratio={16 / 9}>
                <Link href="/">
                  <NextImage
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    alt="logo"
                    src={logo}
                  />
                </Link>
              </AspectRatio>
              {sections()}
              <Group>
                <Group gap={5} align="center" justify="space-between">
                  <Text
                    size="sm"
                    style={{ cursor: 'pointer' }}
                    fw={600}
                    c={i18n.language === 'fr' ? 'orange.0' : 'dark'}
                    onClick={() => changeLanguage('fr')}
                  >
                    FR
                  </Text>
                  <Text size="sm">|</Text>
                  <Text
                    size="sm"
                    style={{ cursor: 'pointer' }}
                    fw={600}
                    c={i18n.language === 'en' ? 'orange.0' : 'dark'}
                    onClick={() => changeLanguage('en')}
                  >
                    EN
                  </Text>
                </Group>
                <Button w={114.65} variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                  <Text size="sm" fw={700} c="white.0">
                    {t('header.button')}
                  </Text>
                </Button>
              </Group>
            </Group>
          ) : (
            <Group align="center" justify="space-between">
              <AspectRatio maw={150} ratio={16 / 9}>
                <Link href="/">
                  <NextImage
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    alt="logo"
                    src={logo}
                  />
                </Link>
              </AspectRatio>
              <Box
                p={5}
                style={{
                  border: 'solid',
                  borderColor: '#808080',
                  borderWidth: 0.25,
                  justifyContent: 'center',
                  display: 'flex',
                  borderRadius: 5,
                }}
              >
                <Burger color={theme.colors?.orange?.[0]} opened={opened} onClick={open} />
              </Box>
            </Group>
          )}
          <Drawer
            style={{ zIndex: 1000 }}
            position="right"
            onClose={close}
            size={rem(250)}
            opened={opened}
            overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          >
            <Stack gap={theme.spacing?.xs} align="center">
              {sections()}
              <Group gap={5} align="center" justify="space-between">
                <Text
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  fw={600}
                  c={i18n.language === 'fr' ? 'orange.0' : 'dark'}
                  onClick={() => changeLanguage('fr')}
                >
                  FR
                </Text>
                <Text size="sm">|</Text>
                <Text
                  size="sm"
                  style={{ cursor: 'pointer' }}
                  fw={600}
                  c={i18n.language === 'en' ? 'orange.0' : 'dark'}
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </Text>
              </Group>
              <Button w={114.65} variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                <Text size="sm" fw={700} c="white.0">
                  {t('header.button')}
                </Text>
              </Button>
            </Stack>
          </Drawer>
        </Container>
      </header>
    </Box>
  );
}
