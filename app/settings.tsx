import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase';
import { useSession } from '../lib/session';
import { colors, editorial } from '../lib/theme';

export default function Settings() {
  const { user } = useSession();
  const [prefs,setPrefs]=useState({messages:true,mentions:true,group_messages:true,sound:true,badge:true});
  const [loading,setLoading]=useState(true);
  useEffect(()=>{if(!user)return;supabase.from('notification_preferences').select('*').eq('user_id',user.id).single().then(({data})=>{if(data)setPrefs({messages:data.messages,mentions:data.mentions,group_messages:data.group_messages,sound:data.sound,badge:data.badge});setLoading(false)})},[user]);
  async function toggle(key:keyof typeof prefs){if(!user)return;const next={...prefs,[key]:!prefs[key]};setPrefs(next);await supabase.from('notification_preferences').upsert({user_id:user.id,...next});}
  if(loading)return <View style={s.root}><ActivityIndicator color={colors.paper} style={{marginTop:80}}/></View>;
  return <ScrollView style={s.root} contentContainerStyle={s.content}><Pressable onPress={()=>router.back()}><Text style={s.back}>‹ Back</Text></Pressable><Text style={editorial.label}>ACCOUNT / PREFERENCES</Text><Text style={editorial.title}>Settings</Text><View style={s.section}><Text style={s.sectionTitle}>Notifications</Text>{([['messages','Direct messages'],['mentions','Mentions'],['group_messages','Group messages'],['sound','Sound'],['badge','App badge']] as const).map(([key,label])=><View style={s.row} key={key}><Text style={s.rowText}>{label}</Text><Switch value={prefs[key]} onValueChange={()=>toggle(key)} trackColor={{false:colors.line,true:colors.paperMuted}} thumbColor={prefs[key]?colors.ink:colors.muted}/></View>)}</View><View style={s.section}><Text style={s.sectionTitle}>Session</Text><Pressable style={s.danger} onPress={()=>supabase.auth.signOut()}><Text style={s.dangerText}>Sign out</Text></Pressable></View></ScrollView>;
}
const s=StyleSheet.create({root:{flex:1,backgroundColor:colors.ink},content:{padding:18,paddingTop:58,paddingBottom:50},back:{color:colors.paperMuted,fontSize:14,marginBottom:28},section:{marginTop:38,borderTopWidth:StyleSheet.hairlineWidth,borderTopColor:colors.line},sectionTitle:{color:colors.muted,fontSize:10,fontWeight:'800',letterSpacing:1.6,textTransform:'uppercase',marginVertical:14},row:{minHeight:58,borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.line,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},rowText:{color:colors.paper,fontSize:15},danger:{paddingVertical:16},dangerText:{color:colors.danger,fontSize:15,fontWeight:'700'}});
