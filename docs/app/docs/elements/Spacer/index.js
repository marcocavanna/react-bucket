import React from 'react';

import loadComponentInfo from '../../util/loadComponentInfo';
import SpacerInfo from '../../component-info/Spacer.info.json';

import { Spacer, Image, Divider, Header } from '../../../../../src/react';

import Img from '../Image/short-paragraph.png';

export default {
  path: '/spacer',

  icon: 'align center',

  hero: {
    header  : 'Spacer',
    content : 'A Spacer divides two contents with a blank space'
  },

  props: {
    Spacer: {
      ...loadComponentInfo(SpacerInfo)
    }

  },

  examples: {

    standard: {
      header    : 'Spacer',
      subheader : 'A space divide two content',
      content   : (
        <React.Fragment>
          <Image src={Img} />
          <Spacer height='7' />
          <Image src={Img} />
        </React.Fragment>
      )
    },

    height: {
      header    : 'Height',
      subheader : 'A spacer can be formatted with 8 different Height, from 1 to 8',
      content   : (
        <React.Fragment>
          <Header content='Section one' subheader='height 1' />
          <Image src={Img} />
          <Spacer height='1' />
          <Header content='Section two' />
          <Image src={Img} />
          <Divider />
          <Header content='Section one' subheader='height 5' />
          <Image src={Img} />
          <Spacer height='5' />
          <Header content='Section two' />
          <Image src={Img} />
          <Divider />
          <Header content='Section one' subheader='heigt 8' />
          <Image src={Img} />
          <Spacer height='8' />
          <Header content='Section two' />
          <Image src={Img} />
        </React.Fragment>
      )
    }

  }

};
