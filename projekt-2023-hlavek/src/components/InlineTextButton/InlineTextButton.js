import { Pressable,View, Text, StyleSheet, ScrollView, Linking, Modal, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color
  };
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <MaterialIcons name="delete-outline" size={30} color="#652C47" />
      )}
    </Pressable>
  )
};