// Icons.js
import React, { memo } from 'react';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

const icons = {
  home: memo(({ size, color }) => <Ionicons name="home" size={size} color={color} />),
  favorite: memo(({ size, color }) => <MaterialIcons name="favorite" size={size} color={color} />),
  pin: memo(({ size, color }) => <AntDesign name="pushpino" size={size} color={color} />),
  logout: memo(({ size, color }) => <MaterialIcons name="logout" size={size} color={color} />),

  city: memo(({ size, color }) => (
    <MaterialCommunityIcons name="home-city" size={size} color={color} />
  )),
  setting: memo(({ size, color }) => <Ionicons name="settings" size={size} color={color} />),
  drive: memo(({ size, color }) => <MaterialIcons name="drive-eta" size={size} color={color} />),
  rateStar: memo(({ size, color }) => <Ionicons name="star" size={size} color={color} />),
  backArrow: memo(({ size, color }) => <Ionicons name="arrow-back" size={size} color={color} />),
  road: memo(({ size, color }) => <FontAwesome name="road" size={size} color={color} />),
  call: memo(({ size, color }) => <FontAwesome name="phone" size={size} color={color} />),
  booking: memo(({ size, color }) => <FontAwesome name="calendar" size={size} color={color} />),
  sadFace: memo(({ size, color }) => <FontAwesome name="frown-o" size={size} color={color} />),
  password: memo(({ size, color }) => (
    <MaterialCommunityIcons name="form-textbox-password" size={size} color={color} />
  )),
  user: memo(({ size, color }) => <FontAwesome name="user-o" size={size} color={color} />),
  UserPlus: memo(({ size, color }) => <FontAwesome5 name="user-plus" size={size} color={color} />),
  mobile: memo(({ size, color }) => <FontAwesome5 name="mobile-alt" size={size} color={color} />),
  infocirlce: memo(({ size, color }) => <AntDesign name="infocirlce" size={size} color={color} />),
  info: memo(({ size, color }) => <Entypo name="info" size={size} color={color} />),
  offer: memo(({ size, color }) => <MaterialIcons name="local-offer" size={size} color={color} />),
  gift: memo(({ size, color }) => <FontAwesome name="gift" size={size} color={color} />),
  location: memo(({ size, color }) => (
    <FontAwesome6 name="location-dot" size={size} color={color} />
  )),
};

export const getIcon = (name, size = 24, color = '#000') => {
  const IconComponent = icons[name];
  return IconComponent ? <IconComponent size={size} color={color} /> : null;
};
