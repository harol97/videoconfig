import { store, persistor } from './data';
// 
const aTb = async (arr, _key) => {
  let b = '';
  const _kl = _key.length;
  try {
    let str = JSON.stringify(arr);
    let _arr = [];
    for (var i = 0; i < str.length; i++) {
      _arr.push(str.charCodeAt(i) ^ _key[i & _kl]);
    }
    b = new Uint16Array(_arr);
  } catch (e) {

  }
  return b;
}
// 
const bTa = async (buf, _key) => {
  let a = [];
  const _kl = _key.length;
  try {
    buf = new Uint16Array(buf);
    for (let i = 0; i < buf.length; i++) {
      a[i] = buf[i];
      a[i] ^= _key[i & _kl];
    }
    a = JSON.parse(String.fromCharCode.apply(null, a));
  } catch (e) {

  }
  return a
}
// 
const SEND = async (path, params) => {
  try {
    const Auth = store.getState().auths || '';
    const wss = store.getState().models.wss || '';
    // 
    let data = { ...params, path };
    const token = (Auth && Auth.token) || '';
    if(token) data = { ...data, token };
    // 
    if(wss){
      wss.onmessage = async (d) => { store.dispatch.models.SET({ ...await bTa(d.data, wss.ikey) }) };
      wss.onopen = async () => { wss.send(await aTb(data, wss.ikey)) };
      // 
      wss.readyState==1 && wss.send(await aTb(data, wss.ikey))
    }
  } catch (error) {
    console.log(error)
  }

}
// 
store.subscribe(() => {
  console.log(store.getState());
});
// 
export {
  store,
  persistor,
  SEND
}