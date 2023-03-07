import { Text, Pressable } from 'react-native';

export default function InlineTextButton(props) {
  let style = {};
  if (props.color) {
    style.color = props.color
  };
  return (
    <Pressable onPress={props.onPress}>
      {({ pressed }) => (
        <Text>
            {props.text}
        </Text>
      )}
    </Pressable>
  )
}