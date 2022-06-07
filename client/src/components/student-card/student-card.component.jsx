import React from "react";
import { Link } from "react-router-dom";

import { Avatar, Text, Button, Paper, Badge, Group } from "@mantine/core";

import "./student-card.styles.scss";

const StudentCard = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      m="sm"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
        width: "350px",
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text align="center" size="md" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {status} {company ? ` • ${company}` : null}{" "}
        {location ? ` • ${location}` : null}
      </Text>

      <Group mt="lg" position="center">
        {skills.slice(0, 5).map((skill, index) => (
          <Badge key={index}>{skill}</Badge>
        ))}
      </Group>

      <Link to={`/profile/${_id}`}>
        <Button variant="default" fullWidth mt="md">
          View full profile
        </Button>
      </Link>
    </Paper>
    // <div className="student-card mx-3 my-2">
    //   <img style={{ width: "100px" }} src={avatar} alt="" />
    //   <p className="name">{name}</p>
    //   <p>{status}</p>

    //   <div className="row mx-2 mb-3">
    //     {skills.slice(0, 4).map((skill, index) => (
    //       <span key={index} className="skill mx-1 mb-1 my-1">
    //         {skill.substring(0, 8)}
    //       </span>
    //     ))}
    //   </div>
    //   <Link className="mt-2 link" to={`/profile/${_id}`}>
    //     View Full Profile
    //   </Link>
    // </div>
  );
};

export default StudentCard;
