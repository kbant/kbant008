import React from 'react';
import { Avatar, Button, IconButton, MD3Colors, Card as PaperCard, Text } from 'react-native-paper';
import { FolderIcon } from '../Svg/FolderIcon';

const LeftContent = (props: any) => <Avatar.Icon {...props} icon={FolderIcon} />;

export interface CardProps {
  title: string;
  content: string;
  image?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

export const Card = ({ title, content, image, onCancel, onConfirm }: CardProps) => (
  <PaperCard>
    <PaperCard.Title
      title={title}
      left={LeftContent}
      right={() => (
        <IconButton
          icon="close"
          iconColor={MD3Colors.error50}
          onPress={() => {
            console.log('Pressed');
          }}
        />
      )}
    />
    <PaperCard.Content>
      <Text variant="bodyMedium" numberOfLines={5}>
        {content}
      </Text>
    </PaperCard.Content>
    {image && <PaperCard.Cover source={{ uri: image }} resizeMethod="scale"></PaperCard.Cover>}
    <PaperCard.Actions>
      {onCancel && <Button onPress={onCancel}>Cancel</Button>}
      {onConfirm && <Button onPress={onConfirm}>OK</Button>}
    </PaperCard.Actions>
  </PaperCard>
);
