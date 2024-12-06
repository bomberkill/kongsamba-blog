import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { theme } from '@/theme';

export default function Contact() {
  const { t } = useTranslation('contact');
  const initialsValues = {
    name: '',
    email: '',
    message: '',
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email().required(),
    message: Yup.string().required(),
  });
  const contactForm = useForm({
    initialValues: initialsValues,
    validate: yupResolver(validationSchema),
  });

  return (
    <Box pt="12vh">
      <Container pb={theme.spacing?.xl} size="80%">
        <Paper w="50%" withBorder shadow="md" p={30} mt={30} radius="md">
          <Title mb={theme.spacing?.sm} ta="center">
            <Text fw={700} size="lg" variant="gradient" gradient={{ from: 'pink', to: 'yellow' }}>
              {t('playlist-section')}
            </Text>
          </Title>
          <form>
            <TextInput
              {...contactForm.getInputProps('name')}
              label={t('name')}
              placeholder="John Doe"
            />
            <TextInput
              {...contactForm.getInputProps('email')}
              label={t('email')}
              placeholder="johndoe@kongsamba.com"
              withAsterisk
            />
            <Textarea
              autosize
              minRows={6}
              {...contactForm.getInputProps('message')}
              label={t('message')}
              placeholder="Message"
              withAsterisk
            />
            <Group mt={theme.spacing?.xl} justify="flex-end">
              <Button variant="light" gradient={{ from: 'pink', to: 'yellow' }} type="submit">
                {t('submit')}
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale = 'fr' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'contact'])),
    // Will be passed to the page component as props
  },
});
