import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Card } from '@kbant/app';
import { randomImage } from '../../../sample-data/image';
import { randomTitle, randomContent } from '../../../sample-data/chance';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default {
  title: 'Paper/Card',
  component: Card,

  render: args => (
    <PaperProvider theme={DefaultTheme}>
      <View style={styles.container}>
        <Card {...args} />
      </View>
    </PaperProvider>
  ),
} as ComponentMeta<typeof Card>;

export const WidthoutImage: ComponentStoryObj<typeof Card> = {
  storyName: 'Without Image',
  args: {
    content: randomContent(),
    title: randomTitle(),
    onCancel: () => {},
  },
};
export const WithImage: ComponentStoryObj<typeof Card> = {
  storyName: 'With Image',
  args: {
    content: randomContent(),
    title: randomTitle(),
    image: randomImage(),
  },
};
