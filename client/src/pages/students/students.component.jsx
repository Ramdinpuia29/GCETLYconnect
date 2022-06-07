import React, { useEffect, useState } from "react";

import { Autocomplete, Center, Stack, Group } from "@mantine/core";

import StudentCard from "../../components/student-card/student-card.component";
import Spinner from "../../components/Spinner/Spinner.component";

import { connect } from "react-redux";
import { getProfiles } from "../../redux/profile/profile-actions";

const SearchStudentsPage = ({
  getProfiles,
  auth: { user },
  profile: { profiles, loading },
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [search, setSearch] = useState("");

  //filter the profiles from the database with the search bar
  const filteredProfiles = profiles.filter((profile) =>
    profile.user.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = profiles.map((profile) => ({
    ...profile,
    value: profile.user.name,
  }));

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Center>
          <Stack>
            <Autocomplete
              radius="xl"
              mt={30}
              width="50vw"
              data={data.filter((profile) => profile.user.name !== user.name)}
              limit={5}
              value={search}
              onChange={setSearch}
              placeholder="Search for your colleagues or alumni"
            />

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {filteredProfiles.length > 0 ? (
                filteredProfiles.map((profile) => (
                  <Group spacing="xl">
                    {profile.user._id !== user._id ? (
                      <StudentCard key={profile._id} profile={profile} />
                    ) : null}
                  </Group>
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </Stack>
        </Center>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.user,
});

export default connect(mapStateToProps, { getProfiles })(SearchStudentsPage);
