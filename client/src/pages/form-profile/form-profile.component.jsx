import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  createProfile,
  getCurrentProfile,
} from '../../redux/profile/profile-actions';

import {
  Button,
  Center,
  createStyles,
  Divider,
  Grid,
  Group,
  MultiSelect,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/hooks';

const initialState = {
  company: '',
  website: '',
  location: '',
  phone: '',
  email: '',
  status: '',
  mentoring: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const FormProfile = ({
  auth: { user },
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      ...initialState,
      email: user.email,
    },
  });
  useEffect(() => {
    if (!profile) {
      getCurrentProfile();
    }
    if (!loading && profile) {
      const profileData = { ...initialState };
      // Check if there is a key for each element of profileData, if so it'll receive the value from redux(profile)
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      // same thing here with social profile
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }

      //Check if is the obj is an array, if so it'll split the code by a comma.
      // if (Array.isArray(profileData.skills))
      //   profileData.skills = profileData.skills.join(", ");

      // updated inputs with profileData
      form.setValues(profileData);
      setData(profileData.skills);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, getCurrentProfile, profile]);

  const { classes } = useStyles();
  const [data, setData] = useState([]);

  const handleSubmit = (values) => {
    createProfile(values, history, profile ? true : false);
    navigate(`/profile/${user._id}`);
  };

  return (
    <Center px={40}>
      <Group position="center">
        <Stack>
          <Center mt={20}>
            <Title order={2}>
              {profile ? 'Edit your profile' : 'Create your profile'}
            </Title>
          </Center>
          <Divider my="xs" label="Profile Details" />
          <Center>
            <form
              onSubmit={form.onSubmit((values) => {
                handleSubmit(values);
              })}
            >
              <Grid>
                <Grid.Col xs={2}>
                  <Select
                    data={['Student', 'Alumni']}
                    placeholder="Status"
                    label="Status"
                    classNames={classes}
                    {...form.getInputProps('status')}
                  />
                </Grid.Col>
                <Grid.Col xs={2}>
                  <Select
                    data={[
                      'Looking for mentor',
                      'Looking for mentee',
                      'Unavailable',
                    ]}
                    placeholder="Mentoring"
                    label="Mentoring"
                    classNames={classes}
                    {...form.getInputProps('mentoring')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    label="Company"
                    placeholder="Your current company"
                    classNames={classes}
                    {...form.getInputProps('company')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    label="Website"
                    placeholder="Your website link"
                    classNames={classes}
                    {...form.getInputProps('website')}
                  />
                </Grid.Col>
                <Grid.Col xs={6}>
                  <TextInput
                    label="Location"
                    placeholder="Your location"
                    classNames={classes}
                    {...form.getInputProps('location')}
                  />
                </Grid.Col>
                <Grid.Col xs={2}>
                  <TextInput
                    label="Phone"
                    placeholder="Your phone number"
                    classNames={classes}
                    {...form.getInputProps('phone')}
                  />
                </Grid.Col>
                <Grid.Col xs={4}>
                  <TextInput
                    label="Email"
                    placeholder="Your email"
                    classNames={classes}
                    {...form.getInputProps('email')}
                  />
                </Grid.Col>
                <Grid.Col xs={12}>
                  <MultiSelect
                    label="Skills and Interests"
                    data={data}
                    placeholder="Select items"
                    searchable
                    creatable
                    getCreateLabel={(query) => `+ Add ${query}`}
                    onCreate={(query) =>
                      setData((current) => [...current, query])
                    }
                    {...form.getInputProps('skills')}
                  />
                </Grid.Col>
              </Grid>
              <Divider my="xs" label="Social network handles" />
              <Group position="center">
                <TextInput
                  label="LinkedIn"
                  placeholder="Your LinkedIn URL"
                  classNames={classes}
                  {...form.getInputProps('linkedin')}
                />

                <TextInput
                  label="Twitter"
                  placeholder="Your Twitter URL"
                  classNames={classes}
                  {...form.getInputProps('twitter')}
                />

                <TextInput
                  label="YouTube"
                  placeholder="Your YouTube URL"
                  classNames={classes}
                  {...form.getInputProps('youtube')}
                />

                <TextInput
                  label="Facebook"
                  placeholder="Your Facebook URL"
                  classNames={classes}
                  {...form.getInputProps('facebook')}
                />

                <TextInput
                  label="Instagram"
                  placeholder="Your Instagram URL"
                  classNames={classes}
                  {...form.getInputProps('instagram')}
                />
              </Group>
              <Divider my="xs" label="Bio" />
              <Textarea
                label="Bio"
                placeholder="Tell us about yourself"
                {...form.getInputProps('bio')}
              />
              <Divider my="xs" label="Submit" />
              <Group position="right">
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => {
                    navigate(`/profile/${user._id}`);
                  }}
                >
                  Discard Changes
                </Button>
                <Button type="submit">Save Changes</Button>
              </Group>
            </form>
          </Center>
        </Stack>
      </Group>
    </Center>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.user,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  FormProfile
);
