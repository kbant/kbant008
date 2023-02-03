import React from 'react';
import { Card } from './Card';
import { useWindowDimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';

type Props = {
  marginHorizontal?: number;
  title: string;
  content: string;
  image?: string;
};

export const AnimatedCard = ({ marginHorizontal, title, content, image }: Props) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const cardsInRow = windowHeight > windowWidth ? 2 : 4;
  const gap = 8;
  const width = (windowWidth - (marginHorizontal || 12) * 2 - gap * cardsInRow) / cardsInRow;
  // const height = width;

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={{ width, margin: gap / 2 }}>
      <Card title={title} content={content} image={image} />
    </Animated.View>
  );
};
