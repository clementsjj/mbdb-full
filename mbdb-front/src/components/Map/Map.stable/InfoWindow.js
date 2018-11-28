import React, { Component } from 'react';
import { Pane, Heading, Card, Paragraph } from 'evergreen-ui';

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
};

function InfoWindow(props) {
  console.log('Props: ', props);
  return (
    <Pane flex="1" padding={16}>
      <Card
        backgroundColor="#f3f6f2"
        elevation={10}
        height={50}
        minWidth={50}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Paragraph margin={10}>{props.message}</Paragraph>
      </Card>
    </Pane>
  );
}

export default InfoWindow;
