import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { aurora, colors } from '../lib/theme';

export function AuroraMark({size=42}:{size?:number}){return <LinearGradient colors={aurora.stops} start={{x:0,y:1}} end={{x:1,y:0}} style={[s.mark,{width:size,height:size,borderRadius:size*.28}]}><View style={[s.inner,{width:size*.56,height:size*.56,borderRadius:size*.28}]}><Text style={[s.symbol,{fontSize:size*.28}]}>A</Text></View></LinearGradient>}
const s=StyleSheet.create({mark:{alignItems:'center',justifyContent:'center'},inner:{backgroundColor:colors.inkSoft,alignItems:'center',justifyContent:'center'},symbol:{color:colors.paper,fontWeight:'900',letterSpacing:-1}});
