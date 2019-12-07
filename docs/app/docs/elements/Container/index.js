import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import ContainerInfo from '../../component-info/Container.info.json';

import { Container, Header, Button, Image, Icon, Spacer } from '../../../../../src/react';

import Img from '../Image/short-paragraph.png';

export default {

  path: '/container',

  icon: 'box',

  hero: {
    header  : 'Container',
    content : 'A container limits content to a maximum width'
  },

  props: {
    Container: {
      ...loadComponentInfo(ContainerInfo)
    }

  },

  examples: {

    background: {
      header    : 'Background',
      subhedaer : 'It is possible to manage the background color',
      content   : (
        <React.Fragment>
          <Container background='grey-lightest' padding='5'>
            <Header content='Section' />
            <Header content='This is a grey container' />
          </Container>
        </React.Fragment>
      )
    },

    shadow: {
      header    : 'Box Shadow',
      subheader : 'A Container can be formatted with different box shadow, from 1 to 24',
      content   : (
        <React.Fragment>
          <Container dpElevation='2' background='grey-light'>
            <Spacer height='8' />
            <Spacer height='8' />
          </Container>
          <Spacer />
          <Container dpElevation='10' background='grey-light'>
            <Spacer height='8' />
            <Spacer height='8' />
          </Container>
          <Spacer />
          <Container dpElevation='18' background='grey-light'>
            <Spacer height='8' />
            <Spacer height='8' />
          </Container>
          <Spacer />
          <Container dpElevation='24' background='grey-light'>
            <Spacer height='8' />
            <Spacer height='8' />
          </Container>
        </React.Fragment>
      )
    },

    flex: {
      header    : 'Flex',
      subheader : 'A Container can be formatted as flex container',
      content   : (
        <React.Fragment>
          <Container flex='on desktop'>
            <Image src={Img} />
            <Image src={Img} />
          </Container>
        </React.Fragment>
      )
    },

    transform: {
      header    : 'Text Transform',
      subheader : 'It is possible to format the text inside the container',
      content   : (
        <React.Fragment>
          <Container textTransform='capitalize' content='This content is capitalize' fontSize='large' />
          <Spacer />
          <Container textTransform='uppercase' content='This content is uppercase' fontSize='large' />
          <Spacer />
          <Container textColor='danger' content='This content has text color red' fontSize='large' />
          <Spacer />
          <Container fontWeight='bold' content='this content is bold' fontSize='large' />
          <Spacer />
          <Container textAlign='center' content='This content is centered' fontSize='large' />
        </React.Fragment>
      )
    },

    padding: {
      header    : 'Padding',
      subheader : 'A Container can be formatted with different padding, from 1 to 8',
      content   : (
        <React.Fragment>
          <Container background='grey-lightest' content='This container has padding 2' padding='2' fontSize='large' />
          <Spacer />
          <Container background='grey-lightest' content='This container has padding 5' padding='5' fontSize='large' />
          <Spacer />
          <Container background='grey-lightest' content='This container has padding 8' padding='8' fontSize='large' />
        </React.Fragment>
      )
    }

  }

};
