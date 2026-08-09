import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { aurora, colors } from '../lib/theme';

export function AuroraBackdrop() {
  return <View pointerEvents="none" style={StyleSheet.absoluteFill}>
    <LinearGradient colors={[colors.inkSoft, colors.ink]} style={StyleSheet.absoluteFill} />
    <LinearGradient colors={[aurora.bluePurple[0] + '26', aurora.bluePurple[1] + '00']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.top} />
    <LinearGradient colors={[aurora.purpleGreen[0] + '00', aurora.purpleGreen[1] + '18']} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.bottom} />
  </View>;
}
const styles=StyleSheet.create({top:{position:'absolute',width:330,height:330,borderRadius:165,top:-190,right:-120},bottom:{position:'absolute',width:280,height:280,borderRadius:140,bottom:-180,left:-130}});
