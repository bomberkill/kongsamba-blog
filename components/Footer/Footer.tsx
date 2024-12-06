import NextImage from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import facebook from '@/public/images/facebook.png';
import instagram from '@/public/images/instagram.png';
import logo from '@/public/images/logo.png';
import tiktok from '@/public/images/tiktok.png';
import twitter from '@/public/images/twitter.png';
import { theme } from '@/theme';
import classes from './Footer.module.css';

export default function Footer() {
  const extraSmallScreen = useMediaQuery('(max-width: 575px)');
  const { t } = useTranslation();
  const data = [
    {
      text: t('header.sections.home'),
      link: '/',
    },
    // {
    //     text:t("header.sections.section.title"),
    //     link:"",
    // },
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
      link: '/articles',
    },
    {
      text: t('header.sections.section.subLinks.news'),
      link: '/news',
    },
    {
      text: t('header.sections.section.subLinks.breve'),
      link: '/breve',
    },
    {
      text: t('header.sections.section.subLinks.cover'),
      link: '/cover',
    },
    {
      text: t('header.sections.section.subLinks.playlist'),
      link: '/playlists',
    },
    {
      text: t('header.sections.section.subLinks.other'),
      link: '/sports',
    },
  ];
  const socials = [
    {
      icon: facebook,
      link: '',
    },
    {
      icon: twitter,
      link: '',
    },
    {
      icon: tiktok,
      link: '',
    },
    {
      icon: instagram,
      link: '',
    },
  ];

  const sections = data.map((link, linkIndex) => (
    <Box w="100%">
      <Link style={{ textDecoration: 'none' }} href={link.link} key={linkIndex}>
        <Text ta="center" className={classes.link} size="xs" fw={500}>
          {link.text}
        </Text>
      </Link>
    </Box>
  ));
  const links = subLinks.map((sublink, linkIndex) => (
    <Box w="100%">
      <Link style={{ textDecoration: 'none' }} href={sublink.link} key={linkIndex}>
        <Text ta="center" className={classes.link} size="xs" fw={500}>
          {sublink.text}
        </Text>
      </Link>
    </Box>
  ));
  return (
    <Box bg="#808080" pt={theme.spacing?.xl}>
      <footer>
        <Container size="90%">
          <Grid grow align="start">
            <GridCol span={!extraSmallScreen ? 4 : 12}>
              <Stack w="100%" align="center" gap={0}>
                <AspectRatio maw={150} ratio={16 / 9}>
                  <Link href="/">
                    <NextImage
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      alt="logo"
                      src={logo}
                    />
                  </Link>
                </AspectRatio>
                {/* <Divider w={100} my="xs"/> */}
                <Text c="white" ta="center" size="xs">
                  {t('header.follow')}
                </Text>
                <Group gap={theme.spacing?.xs} align="center" justify="center">
                  {socials.map((social, index) => (
                    <Link key={index} href={social.link}>
                      <NextImage alt="icon" src={social.icon} width={25} height={25} />
                    </Link>
                  ))}
                </Group>
              </Stack>
            </GridCol>
            <GridCol span={!extraSmallScreen ? 4 : 6}>
              <Stack gap={theme.spacing?.xs} align="center" justify="start">
                <Text c="white" ta="center" size="sm" fw={500}>
                  {t('header.sections.link')}
                </Text>
                {sections}
              </Stack>
            </GridCol>
            <GridCol span={!extraSmallScreen ? 4 : 6}>
              <Stack gap={theme.spacing?.xs} align="center" justify="start">
                <Text c="white" ta="center" size="sm" fw={500}>
                  {t('header.sections.section.title')}
                </Text>
                {links}
              </Stack>
            </GridCol>
          </Grid>
          <Divider my="xs" />
          <Text c="white" ta="center" size="xs" fw={500}>
            © {new Date().getFullYear()} Kongsamba Hip-Hip Magazine.{t('header.rights')}
          </Text>
          <Text c="white" ta="center" size="xs" fw={500}>
            made by{' '}
            <Text
              style={{ textDecorationLine: 'underline' }}
              c="white"
              component="a"
              href="https://portfolio-237aa.web.app/"
            >
              Ronald
            </Text>
            .
          </Text>
        </Container>
      </footer>
    </Box>
  );
}
