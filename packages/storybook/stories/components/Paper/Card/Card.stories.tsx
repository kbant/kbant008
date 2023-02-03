import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { PaperCard } from '@kbant/app';
import { randomImage } from '../../../sample-data/image';
import { randomTitle, randomContent } from '../../../sample-data/chance';

const styles = StyleSheet.create({
  container: { width: 480 },
});

export default {
  title: 'Paper/Card',
  component: PaperCard,

  render: args => (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <PaperCard {...args} />
      </View>
    </PaperProvider>
  ),
} as ComponentMeta<typeof PaperCard>;

export const WidthoutImage: ComponentStoryObj<typeof PaperCard> = {
  storyName: 'Without Image',
  args: {
    content: randomContent(),
    title: randomTitle(),
  },
};
export const WithImage: ComponentStoryObj<typeof PaperCard> = {
  storyName: 'With Image',
  args: {
    content: randomContent(),
    title: randomTitle(),
    image: randomImage(),
  },
};
