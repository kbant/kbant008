import { useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import { AnimatedCard } from './AnimatedCard';
import { makeArray, randomContent, randomId, randomTitle, randomImage } from '../../../sample-data';
import { PaperCard } from '@kbant/app';

export const isPortraitOrientation = (): boolean => {
  const { width, height } = useWindowDimensions();
  return height > width;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

type TestCard = {
  id: string;
  title: string;
  content: string;
  image: string;
};

export const CardList = () => {
  const testCards = makeArray(20);
  testCards.forEach((card, idx, datas) => {
    datas[idx] = { id: randomId(), title: randomTitle(), content: randomContent(), image: randomImage() };
  });
  console.log(testCards);
  const [cards, setCards] = useState<TestCard[]>(testCards);
  const marginVertical = isPortraitOrientation() ? 44 : 12;
  const marginHorizontal = isPortraitOrientation() ? 12 : 44;

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container, { marginVertical, marginHorizontal }]}>
        <View style={styles.row}>
          {cards.map((card: TestCard, idx: number) => (
            <AnimatedCard
              {...{ marginHorizontal }}
              title={randomTitle()}
              content={randomContent()}
              image={randomImage()}
              key={idx}
              index={idx}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
