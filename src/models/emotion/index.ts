import Annoyed from '@assets/images/icon/emotion/annoyed.svg?react';
import Depressed from '@assets/images/icon/emotion/depressed.svg?react';
import Evaded from '@assets/images/icon/emotion/evaded.svg?react';
import Excited from '@assets/images/icon/emotion/excited.svg?react';
import Flutter from '@assets/images/icon/emotion/flutter.svg?react';
import Lonely from '@assets/images/icon/emotion/lonely.svg?react';
import Nervous from '@assets/images/icon/emotion/nervous.svg?react';
import Proud from '@assets/images/icon/emotion/proud.svg?react';
import Sad from '@assets/images/icon/emotion/sad.svg?react';
import Shy from '@assets/images/icon/emotion/shy.svg?react';
import Sorry from '@assets/images/icon/emotion/sorry.svg?react';
import Tired from '@assets/images/icon/emotion/tired.svg?react';
import styled from 'styled-components';

import { EmotionKey } from '..';

type EmotionDetail = {
  text: string;
  color: string;
  icon: React.ComponentType; // React 컴포넌트 타입, 예를 들어 Icon 컴포넌트 등
};

type EmotionMap = Record<EmotionKey, EmotionDetail>;

const getStyledComponent = (icon: React.ComponentType) => {
  return styled(icon)`
    width: 100%;
    height: 100%;
  `;
};

export const Emotions: Readonly<EmotionMap> = Object.freeze({
  ANNOYED: { text: '짜증/화남', color: '#FC4873', icon: getStyledComponent(Annoyed) },
  NERVOUS: { text: '불안/두려움', color: '#000000', icon: getStyledComponent(Nervous) },
  LONELY: { text: '외로움/고독', color: '#754C35', icon: getStyledComponent(Lonely) },
  TIRED: { text: '피곤/지침', color: '#111F68', icon: getStyledComponent(Tired) },
  DEPRESSED: { text: '우울/권태', color: '#867BF4', icon: getStyledComponent(Depressed) },
  SAD: { text: '슬픔/절망', color: '#2E4FFF', icon: getStyledComponent(Sad) },
  SHY: { text: '민망/수치', color: '#FF7042', icon: getStyledComponent(Shy) },
  SORRY: { text: '죄책감/미안함', color: '#333331', icon: getStyledComponent(Sorry) },
  EXCITED: { text: '기분좋은/신나는', color: '#FFC700', icon: getStyledComponent(Excited) },
  FLUTTER: { text: '설렘/기대', color: '#FF84AA', icon: getStyledComponent(Flutter) },
  PROUD: { text: '뿌듯/성취', color: '#FF9A03', icon: getStyledComponent(Proud) },
  EVADED: { text: '모르겠어요', color: '#BCBCBC', icon: getStyledComponent(Evaded) },
} as const);

export const EmotionTexts = Object.values(Emotions).map((x) => x.text);
export const EmotionColors = Object.values(Emotions).map((x) => x.color);
export const EmotionIcons = Object.values(Emotions).map((x) => x.icon);

export const getEmotionColor = (key: EmotionKey): string => {
  return Emotions[key].color;
};

export const getEmotionText = (key: EmotionKey): string => {
  return Emotions[key].text;
};
export const getEmotionIcon = (key: EmotionKey): React.ComponentType => {
  return Emotions[key].icon;
};
