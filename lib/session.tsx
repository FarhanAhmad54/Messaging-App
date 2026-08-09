import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

type Ctx={session:Session|null;user:User|null;loading:boolean};
const SessionContext=createContext<Ctx>({session:null,user:null,loading:true});
export function SessionProvider({children}:PropsWithChildren){const [session,setSession]=useState<Session|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>{let active=true;supabase.auth.getSession().then(({data})=>{if(active){setSession(data.session);setLoading(false)}});const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));return()=>{active=false;subscription.unsubscribe()};},[]);const value=useMemo(()=>({session,user:session?.user??null,loading}),[session,loading]);return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>}
export const useSession=()=>useContext(SessionContext);
