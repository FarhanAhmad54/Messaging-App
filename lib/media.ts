import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
export type PickedMedia={uri:string;mime:string;name:string;size?:number};
export async function pickDocument():Promise<PickedMedia|null>{const r=await DocumentPicker.getDocumentAsync({copyToCacheDirectory:true,multiple:false});if(r.canceled||!r.assets[0])return null;const a=r.assets[0];return {uri:a.uri,mime:a.mimeType||'application/octet-stream',name:a.name,size:a.size};}
export async function pickImages():Promise<PickedMedia[]> {const p=await ImagePicker.requestMediaLibraryPermissionsAsync();if(!p.granted)return [];const r=await ImagePicker.launchImageLibraryAsync({mediaTypes:['images'],quality:.82,multiple:true});if(r.canceled)return [];return r.assets.map(a=>({uri:a.uri,mime:a.mimeType||'image/jpeg',name:a.fileName||`image-${Date.now()}.jpg`,size:a.fileSize}));}
