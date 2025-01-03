import { useEffect, useRef, useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import NextImage from 'next/image';
import Link from 'next/link';
import { ApolloQueryResult } from '@apollo/client';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  Image,
  px,
  Skeleton,
  Stack,
  Text,
  Title,
  Transition,
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import LoadingAnimation from '@/components/LoadingAnimation/LoadingAnimation';
import apolloClient from '@/lib/apolloClient';
import classes from '@/pages/style.module.css';
import empty from '@/public/images/message.png';
// import { getClient } from '@/lib/apolloclient';
import { GET_ALL_ARTICLES, GET_ALL_EVENTS, GET_ALL_PLAYLISTS } from '@/queries';
import { theme } from '@/theme';

// import classes from '../components/Welcome/Welcome.module.css';

export default function HomePage({
  events,
  articles,
  playlists,
}: {
  events: ApolloQueryResult<{ getAllEvents: Event[] }>;
  articles: ApolloQueryResult<{ getAllArticles: Article[] }>;
  playlists: ApolloQueryResult<{ getAllPlaylists: Playlist[] }>;
}) {
  const { t } = useTranslation('home');
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const [delayOver, setDelayOver] = useState(false);
  const [imageFetching, setImageFetching] = useState(true);
  // const smallScreen = useMediaQuery('(max-width: 793px)');
  // const extraSmallScreen = useMediaQuery('(max-width: 575px)');
  const { ref: sloganRef, entry: containerEntry } = useIntersection({
    root: null,
    threshold: 1,
  });
  const { ref: articleRef, entry: articleEntry } = useIntersection({
    root: null,
    threshold: 0.2,
  });
  const { ref: coverRef, entry: coverEntry } = useIntersection({
    root: null,
    threshold: 1,
  });
  const { ref: playlistRef, entry: playlistEntry } = useIntersection({
    root: null,
    threshold: 0.2,
  });
  const [articleTransition, setArticleTransition] = useState(false);
  const [coverTransition, setCoverTransition] = useState(false);
  const [playlistTransition, setPlaylistTransition] = useState(false);
  useEffect(() => {
    if (containerEntry?.isIntersecting) {
      setArticleTransition(false);
    }
    if (articleEntry?.isIntersecting) {
      setArticleTransition(true);
      setCoverTransition(false);
    }
    if (coverEntry?.isIntersecting) {
      setCoverTransition(true);
      setPlaylistTransition(false);
    }
    if (playlistEntry?.isIntersecting) {
      setPlaylistTransition(true);
    }
  }, [articleEntry, coverEntry, playlistEntry, containerEntry]);
  const [innerHeight, setInnerHeight] = useState<number>(0);

  useEffect(() => {
    setInnerHeight(window.innerHeight - (px(65) as number));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setDelayOver(true);
    }, 3000);
  }, []);
  const handleImageLoad = () => {
    setImageFetching(false);
  };
  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={t('meta.description')} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        {/* <meta property="og:image" content=""/> */}
        {/* <meta property="og:url" content="https://example.com/article"/> */}
        {/* <meta name="twitter:card" content="summary_large_image"/> */}
        <meta name="twitter:title" content={t('meta.title')} />
        <meta name="twitter:description" content={t('meta.description')} />
        {/* <meta name="twitter:image" content=""/> */}
        {/* <link hrefLang="fr" rel="alternate" href="https://example.com/" />
        <link hrefLang="en" rel="alternate" href="https://example.com/en" /> */}
      </Head>
      {events.loading || !delayOver ? (
        <LoadingAnimation />
      ) : (
        <Box pt="10vh">
          <Carousel
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
            plugins={[autoplay.current]}
            h={innerHeight}
            // h={extraSmallScreen? "84vh" : "90vh"}
            align="start"
            w="100%"
            loop
            slidesToScroll={1}
            slideSize="100%"
            withControls={false}
            withIndicators
          >
            {events.data !== undefined && events.data.getAllEvents.length > 0 && imageFetching && (
              <CarouselSlide>
                <Skeleton w="100%" animate h="100%" />
              </CarouselSlide>
            )}
            {events.data !== undefined &&
              events.data.getAllEvents.length > 0 &&
              events.data.getAllEvents.map((event, index) => (
                <CarouselSlide
                  w="100%"
                  h="100%"
                  style={event.eventInput.link !== '' ? { cursor: 'pointer' } : {}}
                  pos="relative"
                  key={index}
                >
                  <Image
                    w="100%"
                    h={innerHeight}
                    onLoad={handleImageLoad}
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    alt="event image"
                    src={event.eventInput.image}
                  />
                  <Title
                    order={4}
                    bottom={10}
                    style={{ zIndex: 10 }}
                    pos="absolute"
                    title={event.eventInput.title}
                  />
                </CarouselSlide>
              ))}
            {events.error && (
              <CarouselSlide>
                <Title ta="center" c="gray" order={3} title="Something went wrong!" />
              </CarouselSlide>
            )}
            {events.data !== undefined && events.data.getAllEvents.length < 1 && (
              <CarouselSlide>
                <Box
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  pos="relative"
                  w="100%"
                  mih={innerHeight}
                  // mih={extraSmallScreen? "84vh" : "90vh"}
                >
                  <Skeleton pos="absolute" animate width="100%" height="100%" />
                  <Title
                    pos="relative"
                    w="90%"
                    style={{ zIndex: 10 }}
                    ta="center"
                    c={theme.colors?.orange?.[5]}
                    order={1}
                  >
                    {t('no-event')}
                  </Title>
                </Box>
              </CarouselSlide>
            )}
            {events.data === undefined && (
              <CarouselSlide>
                <Box
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  pos="relative"
                  w="100%"
                  mih={innerHeight}
                  // mih={extraSmallScreen? "84vh" : "90vh"}
                >
                  <Skeleton pos="absolute" animate width="100%" height="100%" />
                  <Title
                    pos="relative"
                    w="90%"
                    style={{ zIndex: 10 }}
                    ta="center"
                    c={theme.colors?.orange?.[5]}
                    order={1}
                  >
                    {t('no-event')}
                  </Title>
                </Box>
              </CarouselSlide>
            )}
          </Carousel>
          <Box ref={sloganRef} py={theme.spacing?.xl} w="100%">
            <Container size="90%">
              <Title ta="center">
                <Text
                  fw={700}
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                >
                  {t('slogan')}
                </Text>
              </Title>
              <Text mt={theme.spacing?.sm} ta="center">
                {t('slogan-text')}
              </Text>
            </Container>
          </Box>
          <Box py={theme.spacing?.xl}>
            <Container ref={articleRef} size="90%">
              <Title mb={theme.spacing?.sm} ta="center">
                <Text
                  fw={700}
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                >
                  {t('articles-section')}
                </Text>
              </Title>
              <Group mih={400} align="center" gap={theme.spacing?.lg} justify="center">
                {articles.loading ||
                  (articles.error && (
                    <>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Skeleton animate>
                          <Card.Section>
                            <Image src="" height={160} alt="Norway" />
                          </Card.Section>
                        </Skeleton>

                        <Group justify="space-between" mt="md" mb="xs">
                          <Skeleton>
                            <Text fw={500}>titre</Text>
                          </Skeleton>
                          <Skeleton>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              Badge
                            </Badge>
                          </Skeleton>
                        </Group>
                        <Skeleton animate>
                          <Text size="sm" c="dimmed">
                            text du texte
                          </Text>
                        </Skeleton>

                        <Center mt={theme.spacing?.xl}>
                          <Link style={{ textDecoration: 'none' }} href="/articles">
                            <Skeleton>
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Skeleton>
                          </Link>
                        </Center>
                      </Card>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Skeleton animate>
                          <Card.Section>
                            <Image src="" height={160} alt="Norway" />
                          </Card.Section>
                        </Skeleton>

                        <Group justify="space-between" mt="md" mb="xs">
                          <Skeleton>
                            <Text fw={500}>titre</Text>
                          </Skeleton>
                          <Skeleton>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              Badge
                            </Badge>
                          </Skeleton>
                        </Group>
                        <Skeleton animate>
                          <Text size="sm" c="dimmed">
                            text du texte
                          </Text>
                        </Skeleton>

                        <Center mt={theme.spacing?.xl}>
                          <Link style={{ textDecoration: 'none' }} href="/articles">
                            <Skeleton>
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Skeleton>
                          </Link>
                        </Center>
                      </Card>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Skeleton animate>
                          <Card.Section>
                            <Image src="" height={160} alt="Norway" />
                          </Card.Section>
                        </Skeleton>

                        <Group justify="space-between" mt="md" mb="xs">
                          <Skeleton>
                            <Text fw={500}>titre</Text>
                          </Skeleton>
                          <Skeleton>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              Badge
                            </Badge>
                          </Skeleton>
                        </Group>
                        <Skeleton animate>
                          <Text size="sm" c="dimmed">
                            text du texte
                          </Text>
                        </Skeleton>

                        <Center mt={theme.spacing?.xl}>
                          <Link style={{ textDecoration: 'none' }} href="/articles">
                            <Skeleton>
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Skeleton>
                          </Link>
                        </Center>
                      </Card>
                    </>
                  ))}
                {articles.data !== undefined && articles.data.getAllArticles.length > 0 ? (
                  articles.data.getAllArticles.map((article, index) => (
                    <Transition
                      keepMounted={false}
                      mounted={articleTransition}
                      duration={2000}
                      transition={
                        index === 0 ? 'fade-right' : index === 1 ? 'fade-down' : 'fade-left'
                      }
                    >
                      {(styles) => (
                        <Card
                          style={styles}
                          w={305}
                          h={442}
                          key={index}
                          shadow="sm"
                          padding="lg"
                          radius="md"
                          withBorder
                        >
                          <Card.Section>
                            <Image
                              // component={NextImage}
                              src={article.articleInput.image}
                              height={160}
                              alt="Norway"
                              fit="cover"

                              // fallbackSrc={}
                            />
                          </Card.Section>

                          <Stack justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>{article.articleInput.title}</Text>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              {article.articleInput.type}
                            </Badge>
                          </Stack>

                          <Text lineClamp={3} size="sm" c="dimmed">
                            {article.articleInput.message}
                          </Text>

                          <Center mt={theme.spacing?.xl}>
                            <Link style={{ textDecoration: 'none' }} href="/articles">
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Link>
                          </Center>
                        </Card>
                      )}
                    </Transition>
                  ))
                ) : (
                  <Stack align="center" gap={3}>
                    <NextImage alt="" width={150} height={150} src={empty} />
                    <Title
                      pos="relative"
                      w="90%"
                      style={{ zIndex: 10 }}
                      ta="center"
                      c={theme.colors?.orange?.[5]}
                      order={3}
                    >
                      {t('no-article')}
                    </Title>
                  </Stack>
                )}
              </Group>
              <Center mt={theme.spacing?.xl}>
                <Link style={{ textDecoration: 'none' }} href="/posts">
                  <Button variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                    {t('see-more')}
                  </Button>
                </Link>
              </Center>
            </Container>
          </Box>
          <Box bg={theme.colors?.dark?.[0]} py={theme.spacing?.xl} w="100%">
            <Container size="80%">
              <Title ta="center">
                <Text fw={700} size="lg" c={theme.colors?.white?.[0]}>
                  {t('contact-section')}
                </Text>
              </Title>
              {/* <Text mt={theme.spacing?.sm} ta="center">{t("contact-section")}</Text> */}
              <Center mt={theme.spacing?.sm}>
                <Link style={{ textDecoration: 'none' }} href="/contact">
                  <Button variant="outline" gradient={{ from: 'pink', to: 'yellow' }}>
                    {t('contact-button')}
                  </Button>
                </Link>
              </Center>
            </Container>
          </Box>
          <Box h="50vh" w="100%" className={classes.playlist}>
            <Container
              ref={coverRef}
              h="100%"
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              size="80%"
            >
              <Transition
                keepMounted={false}
                mounted={coverTransition}
                duration={1000}
                transition="fade-up"
              >
                {(styles) => (
                  <Box style={styles}>
                    <Title ta="center">
                      <Text fw={700} size="lg" c={theme.colors?.white?.[0]}>
                        {t('cover-section')}
                      </Text>
                    </Title>
                    <Center mt={theme.spacing?.sm}>
                      <Link style={{ textDecoration: 'none' }} href="/contact">
                        <Button variant="outline" gradient={{ from: 'pink', to: 'yellow' }}>
                          {t('cover-button')}
                        </Button>
                      </Link>
                    </Center>
                  </Box>
                )}
              </Transition>
            </Container>
          </Box>
          <Box py={theme.spacing?.xl}>
            <Container ref={playlistRef} size="90%">
              <Title mb={theme.spacing?.sm} ta="center">
                <Text
                  fw={700}
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'yellow' }}
                >
                  {t('playlist-section')}
                </Text>
              </Title>
              <Group mih={400} align="center" gap={theme.spacing?.lg} justify="center">
                {playlists.loading ||
                  (playlists.error && (
                    <>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Skeleton animate>
                          <Card.Section>
                            <Image src="" height={160} alt="Norway" />
                          </Card.Section>
                        </Skeleton>

                        <Group justify="space-between" mt="md" mb="xs">
                          <Skeleton>
                            <Text fw={500}>titre</Text>
                          </Skeleton>
                          <Skeleton>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              Badge
                            </Badge>
                          </Skeleton>
                        </Group>
                        <Skeleton animate>
                          <Text size="sm" c="dimmed">
                            text du texte
                          </Text>
                        </Skeleton>

                        <Center mt={theme.spacing?.xl}>
                          <Link style={{ textDecoration: 'none' }} href="/articles">
                            <Skeleton>
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Skeleton>
                          </Link>
                        </Center>
                      </Card>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Skeleton animate>
                          <Card.Section>
                            <Image src="" height={160} alt="Norway" />
                          </Card.Section>
                        </Skeleton>

                        <Group justify="space-between" mt="md" mb="xs">
                          <Skeleton>
                            <Text fw={500}>titre</Text>
                          </Skeleton>
                          <Skeleton>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              Badge
                            </Badge>
                          </Skeleton>
                        </Group>
                        <Skeleton animate>
                          <Text size="sm" c="dimmed">
                            text du texte
                          </Text>
                        </Skeleton>

                        <Center mt={theme.spacing?.xl}>
                          <Link style={{ textDecoration: 'none' }} href="/articles">
                            <Skeleton>
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Skeleton>
                          </Link>
                        </Center>
                      </Card>
                      <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Skeleton animate>
                          <Card.Section>
                            <Image src="" height={160} alt="Norway" />
                          </Card.Section>
                        </Skeleton>

                        <Group justify="space-between" mt="md" mb="xs">
                          <Skeleton>
                            <Text fw={500}>titre</Text>
                          </Skeleton>
                          <Skeleton>
                            <Badge
                              radius={5}
                              variant="light"
                              gradient={{ from: 'pink', to: 'yellow' }}
                            >
                              Badge
                            </Badge>
                          </Skeleton>
                        </Group>
                        <Skeleton animate>
                          <Text size="sm" c="dimmed">
                            text du texte
                          </Text>
                        </Skeleton>

                        <Center mt={theme.spacing?.xl}>
                          <Link style={{ textDecoration: 'none' }} href="/articles">
                            <Skeleton>
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Skeleton>
                          </Link>
                        </Center>
                      </Card>
                    </>
                  ))}
                {playlists.data !== undefined && playlists.data.getAllPlaylists.length > 0 ? (
                  playlists.data.getAllPlaylists.map((playlist, index) => (
                    <Transition
                      keepMounted={false}
                      mounted={playlistTransition}
                      duration={2000}
                      transition={
                        index === 0 ? 'fade-right' : index === 1 ? 'fade-down' : 'fade-left'
                      }
                    >
                      {(styles) => (
                        <Card
                          style={styles}
                          h={410}
                          maw={305}
                          key={index}
                          shadow="sm"
                          padding="lg"
                          radius="md"
                          withBorder
                        >
                          <Card.Section>
                            <Image
                              src={playlist.playlistInput.image}
                              height={160}
                              fit="cover"
                              alt="Norway"
                            />
                          </Card.Section>

                          <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>{playlist.playlistInput.title}</Text>
                            {/* <Badge radius={5} variant="light" gradient={{ from: 'pink', to: 'yellow' }}>{article.articleInput.type}</Badge> */}
                          </Group>

                          <Text mih={84} size="sm" c="dimmed">
                            {playlist.playlistInput.description}
                          </Text>

                          <Center mt={theme.spacing?.xl}>
                            <Link style={{ textDecoration: 'none' }} href="/playlist">
                              <Button variant="default" gradient={{ from: 'pink', to: 'yellow' }}>
                                {t('read')}
                              </Button>
                            </Link>
                          </Center>
                        </Card>
                      )}
                    </Transition>
                  ))
                ) : (
                  <Stack align="center" gap={5}>
                    <NextImage alt="" width={150} height={150} src={empty} />
                    <Title
                      pos="relative"
                      w="90%"
                      style={{ zIndex: 10 }}
                      ta="center"
                      c={theme.colors?.orange?.[5]}
                      order={3}
                    >
                      {t('no-playlist')}
                    </Title>
                  </Stack>
                )}
              </Group>
              <Center mt={theme.spacing?.xl}>
                <Link style={{ textDecoration: 'none' }} href="/playlists">
                  <Button variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
                    {t('see-more')}
                  </Button>
                </Link>
              </Center>
            </Container>
          </Box>
        </Box>
      )}
    </>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale = 'fr' }) => {
  try {
    // console.log('start');
    const events = await apolloClient.query({ query: GET_ALL_EVENTS, variables: { posted: true } });
    const articles = await apolloClient.query({
      query: GET_ALL_ARTICLES,
      variables: { posted: true, number: 3 },
    });
    const playlists = await apolloClient.query({
      query: GET_ALL_PLAYLISTS,
      variables: { posted: true, number: 3 },
    });
    // const events = data?.getAllEvents || [];
    // const articles = articlesData.data?.getAllArticles || [];
    // const playlists = playlistData.data?.getAllPlaylists || [];
    // console.log('fin result events: ', events);
    // console.log('fin result articles: ', articles);
    // console.log('fin result playlists: ', playlists);
    return {
      props: {
        events,
        articles,
        playlists,
        ...(await serverSideTranslations(locale, ['common', 'home'])),
      },
      revalidate: 60,
    };
  } catch (error) {
    // console.error('Error fetching events:', error);
  }
  return {
    props: {
      events: [],
      articles: [],
      playlists: [],
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
};
