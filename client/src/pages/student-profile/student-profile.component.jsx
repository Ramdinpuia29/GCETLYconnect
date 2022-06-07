import React, { useEffect, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  BrandYoutube,
  EditCircle,
  View360,
} from "tabler-icons-react";

import Experience from "../../components/experience/experience.component";
import Education from "../../components/education/education.component";

import { getProfileById } from "../../redux/profile/profile-actions";

import {
  Anchor,
  Avatar,
  Badge,
  Blockquote,
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

const StudentProfile = ({ getProfileById, auth, profile: { profile } }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  const navigate = useNavigate();
  const { width } = useViewportSize();

  return (
    <>
      {profile === null ? (
        <>
          {/* <Spinner /> */}
          <Center>
            {
              <Text>
                You might have not create a profile yet. Click{" "}
                <Link to="/create-profile">here</Link> to create.
              </Text>
            }
          </Center>
        </>
      ) : (
        <>
          <Stack mx={40} my={20}>
            <Group position="center">
              <Avatar src={profile.user.avatar} radius={"50%"} size={200} />
              <Stack>
                <Title>
                  {profile.user.name.charAt(0).toUpperCase() +
                    profile.user.name.slice(1)}
                </Title>
                <Group>
                  <Text>Works at {profile.company && profile.company}</Text>
                </Group>
                <Group>
                  {profile.status && (
                    <Badge color="blue" variant="dot" size="md">
                      {profile.status}
                    </Badge>
                  )}
                  {profile.location && (
                    <Badge size="md">{profile.location}</Badge>
                  )}
                </Group>
                {profile.bio && <Blockquote>{profile.bio}</Blockquote>}
              </Stack>
            </Group>
            <Group mt={20} position="center">
              {profile.website && (
                <Anchor variant="link" href={profile.website} target="_blank">
                  <View360 />
                </Anchor>
              )}
              {profile.social.linkedin && (
                <Anchor
                  variant="link"
                  href={profile.social.linkedin}
                  target="_blank"
                >
                  <BrandLinkedin />
                </Anchor>
              )}
              {profile.social.twitter && (
                <Anchor
                  variant="link"
                  href={profile.social.twitter}
                  target="_blank"
                >
                  <BrandTwitter />
                </Anchor>
              )}
              {profile.social.youtube && (
                <Anchor
                  variant="link"
                  href={profile.social.youtube}
                  target="_blank"
                >
                  <BrandYoutube />
                </Anchor>
              )}
              {profile.social.facebook && (
                <Anchor
                  variant="link"
                  href={profile.social.facebook}
                  target="_blank"
                >
                  <BrandFacebook />
                </Anchor>
              )}
              {profile.social.instagram && (
                <Anchor
                  variant="link"
                  href={profile.social.instagram}
                  target="_blank"
                >
                  <BrandInstagram />
                </Anchor>
              )}
            </Group>

            <Group position="center">
              {auth.user._id !== profile.user._id && (
                <Button variant="outline" mt={20}>
                  Message {profile.user.name}
                </Button>
              )}
            </Group>
            <Group position="right">
              {auth.user._id === profile.user._id && (
                <Button
                  variant="outline"
                  mt={20}
                  onClick={() => {
                    navigate("/edit-profile");
                  }}
                >
                  <EditCircle /> {width > 768 && "Edit profile"}
                </Button>
              )}
            </Group>
            <Divider my="lg" size="md" />
            <Grid>
              <Grid.Col span={width > 768 ? 4 : 12}>
                <Stack>
                  <Title order={4}>Skills and Interests</Title>
                  <Group>
                    {profile.skills.map((skill) => (
                      <Badge size="md" key={skill}>
                        {skill}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </Grid.Col>

              <Grid.Col span={width > 768 ? 4 : 12}>
                <Title order={4}>Experiences</Title>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((experience) => (
                      <Experience
                        key={experience._id}
                        experience={experience}
                        currentUser={auth.user._id}
                      />
                    ))}
                  </Fragment>
                ) : (
                  <Text color="dimmed">No experience credentials</Text>
                )}
              </Grid.Col>
              <Grid.Col span={width > 768 ? 4 : 12}>
                <Title order={4}>Educations</Title>
                {profile.education.length > 0 ? (
                  <>
                    {profile.education.map((education) => (
                      <Education
                        key={education._id}
                        education={education}
                        currentUser={auth.user._id}
                      />
                    ))}
                  </>
                ) : (
                  <Text color="dimmed">No education credentials</Text>
                )}
              </Grid.Col>
            </Grid>
          </Stack>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(StudentProfile);
