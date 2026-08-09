import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../lib/theme';

export function ConnectionBanner() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setInterval> | undefined;
    const check = async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);
        await fetch('https://www.gstatic.com/generate_204', { method: 'HEAD', signal: controller.signal });
        clearTimeout(timeout);
        if (mounted) setOffline(false);
      } catch { if (mounted) setOffline(true); }
    };
    check();
    timer = setInterval(check, 15000);
    return () => { mounted = false; if (timer) clearInterval(timer); };
  }, []);
  if (!offline) return null;
  return <View style={s.bar}><View style={s.dot}/><Text style={s.text}>Offline · messages will retry automatically</Text></View>;
}
const s=StyleSheet.create({bar:{position:'absolute',top:0,left:0,right:0,zIndex:50,height:30,backgroundColor:'#17130F',borderBottomWidth:StyleSheet.hairlineWidth,borderBottomColor:colors.line,alignItems:'center',justifyContent:'center',flexDirection:'row',gap:7},dot:{width:6,height:6,borderRadius:3,backgroundColor:colors.danger},text:{color:colors.paperMuted,fontSize:10,fontWeight:'700',letterSpacing:.2}});
