import { PaperCard } from '@kbant/app/src';
import { useWindowDimensions } from 'react-native';
import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';

type Props = {
  index: number;
  marginHorizontal: number;
  title: string;
  content: string;
  image: string;
};

export const AnimatedCard = ({ index, marginHorizontal, title, content, image }: Props) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const cardsInRow = windowHeight > windowWidth ? 2 : 4;
  const gap = 8;
  const width = (windowWidth - marginHorizontal * 2 - gap * cardsInRow) / cardsInRow;
  // const height = width;

  return (
    <Animated.View
      layout={Layout.duration(200).delay(200)}
      entering={FadeInUp}
      exiting={FadeOutDown}
      style={{ width, margin: gap / 2 }}>
      <PaperCard title={title} content={content} image={image} />
    </Animated.View>
  );
};
