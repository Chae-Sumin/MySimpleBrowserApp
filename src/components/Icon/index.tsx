import React from 'react';
import { SvgProps } from 'react-native-svg';

type IconProps = SvgProps & {
  name: keyof typeof Icons;
};

import PrevOn from './prev-on.svg';
import PrevOff from './prev-off.svg';
import NextOn from './next-on.svg';
import NextOff from './next-off.svg';
import Home from './home.svg';
import Tabs from './tabs.svg';
import More from './more.svg';

const Icons = {
  PrevOn,
  PrevOff,
  NextOn,
  NextOff,
  Home,
  Tabs,
  More,
};

function Icon({name, ...props}: IconProps): React.JSX.Element {
  const IconComponent = Icons[name];
  const width = props.width || props.height || 24;
  const height = props.height || props.width || 24;
  return <IconComponent {...props} width={width} height={height} />;
}

export default Icon;
