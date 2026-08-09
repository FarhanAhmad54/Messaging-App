import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, editorial } from '../lib/theme';

export default function ErrorBoundary({ error, retry }: { error: Error; retry: () => void }) {
  useEffect(() => { if (__DEV__) console.error('[Aurora Messages]', error); }, [error]);
  return <View style={s.root}><Text style={editorial.label}>AURORA / RECOVERY</Text><Text style={editorial.title}>Something went wrong.</Text><Text style={editorial.body}>The app hit an unexpected error. Your local message queue is preserved and can retry when connectivity returns.</Text><Pressable style={s.primary} onPress={retry}><Text style={s.primaryText}>Try again</Text></Pressable><Pressable style={s.secondary} onPress={()=>router.replace('/chats')}><Text style={s.secondaryText}>Return to messages</Text></Pressable></View>;
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:colors.ink,padding:24,paddingTop:90},primary:{height:52,borderRadius:26,backgroundColor:colors.paper,alignItems:'center',justifyContent:'center',marginTop:30},primaryText:{color:colors.ink,fontWeight:'800'},secondary:{height:52,alignItems:'center',justifyContent:'center'},secondaryText:{color:colors.paperMuted,fontWeight:'700'}});
