import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { CardList } from './CardList';

const styles = StyleSheet.create({
  container: { width: '100%' },
});

export default {
  title: 'Paper/CardList',
  component: CardList,

  render: args => (
    <PaperProvider theme={DefaultTheme}>
      <CardList />
    </PaperProvider>
  ),
} as ComponentMeta<typeof CardList>;

export const cardList: ComponentStoryObj<typeof CardList> = {
  storyName: 'Animated CardList',
  args: {},
};
