import apolloClient from "@/lib/apolloClient";
import { GET_ALL_ARTICLES } from "@/queries";
import { Badge, Box, Button, Card, Center, Container, Divider, Group, Image, Stack, Text, Title } from "@mantine/core";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { ApolloPayloadResult, ApolloQueryResult } from "@apollo/client";
import { useEffect, useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation/LoadingAnimation";
import { theme } from "@/theme";
import NextImage from "next/legacy/image";
import empty from '@/public/images/message.png';
import Link from "next/link";

export default function Posts ({articles} : {articles: ApolloQueryResult<{ getAllArticles: Article[] }>}) {
    const {t} = useTranslation("posts")
    const [delayOver, setDelayOver] = useState(true);
    const article = articles.data ? articles.data.getAllArticles.filter((item, index) => item.articleInput.type === "article") : []
    const breve = articles.data ? articles.data.getAllArticles.filter((item, index) => item.articleInput.type === "breve") : []
    const cover = articles.data ? articles.data.getAllArticles.filter((item, index) => item.articleInput.type === "cover") : []
    const news = articles.data ? articles.data.getAllArticles.filter((item, index) => item.articleInput.type === "news") : []
    const sport = articles.data ? articles.data.getAllArticles.filter((item, index) => item.articleInput.type === "sports") : []
    useEffect(() => {
        setTimeout(() => {
            setDelayOver(false)
        }, 3000);
    },[])
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
            {articles.loading || delayOver ? (
                <LoadingAnimation/>
            ) : (
                <Box pt="10vh">
                    <Container size="85%">
                        <Box>
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
                        </Box>
                        <Box w="100%" id="articles" pt={theme.spacing?.lg}>
                            <Group gap={5} align="center">
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
                                <Divider/>
                            </Group>
                            <Center>
                                <Box mih={300} w="90%">
                                    <Text mt={theme.spacing?.sm} ta="center">
                                        {t('slogan-text')}
                                    </Text>
                                    { article.length > 1 ? (
                                        article.map((article, index) => (
                                            <Card
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
                                    )
                                    }
                                </Box>
                            </Center>
                        </Box>
                        <Box id="news" pt={theme.spacing?.lg}>
                            <Group gap={5} align="center">
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
                                <Divider/>
                            </Group>
                            <Center>
                                <Box mih={300} w="90%">
                                    <Text mt={theme.spacing?.sm} ta="center">
                                        {t('slogan-text')}
                                    </Text>
                                    { news.length > 1 ? (
                                        news.map((article, index) => (
                                            <Card
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
                                    )
                                    }
                                </Box>
                            </Center>
                        </Box>
                        <Box id="covers" pt={theme.spacing?.lg}>
                            <Group gap={5} align="center">
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
                                <Divider/>
                            </Group>
                            <Center>
                                <Box mih={300} w="90%">
                                    <Text mt={theme.spacing?.sm} ta="center">
                                        {t('slogan-text')}
                                    </Text>
                                    { cover.length > 1 ? (
                                        cover.map((article, index) => (
                                            <Card
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
                                    )
                                    }
                                </Box>
                            </Center>
                        </Box>
                        <Box id="breves" pt={theme.spacing?.lg}>
                            <Group gap={5} align="center">
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
                                <Divider/>
                            </Group>
                            <Center>
                                <Box mih={300} w="90%">
                                    <Text mt={theme.spacing?.sm} ta="center">
                                        {t('slogan-text')}
                                    </Text>
                                    { breve.length > 1 ? (
                                        breve.map((article, index) => (
                                            <Card
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
                                    )
                                    }
                                </Box>
                            </Center>
                        </Box>
                        <Box id="sports" pt={theme.spacing?.lg}>
                            <Group gap={5} align="center">
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
                                <Divider/>
                            </Group>
                            <Center>
                                <Box mih={300} w="90%">
                                    <Text mt={theme.spacing?.sm} ta="center">
                                        {t('slogan-text')}
                                    </Text>
                                    { sport.length > 1 ? (
                                        sport.map((article, index) => (
                                            <Card
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
                                    )
                                    }
                                </Box>
                            </Center>
                        </Box>
                    </Container>
                </Box>
            )
            }
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({locale = "fr"}) => {
    try {
        const articles = await apolloClient.query({query: GET_ALL_ARTICLES});
        return {
            props: {
                articles,
                ...(await serverSideTranslations(locale, ["common", "posts"]))
            },
            revalidate: 60
        }
    } catch (error) {
        
    }
    return {
        articles: [],
        props: {
            ...(await serverSideTranslations(locale, ["common", "posts"]))
        },
    }
}