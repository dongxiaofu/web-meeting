
import io from 'socket.io-client';
// let host = location.origin;
// let host = 'https://meeting.chugang.net:3001'
let host = 'http://127.0.0.1:3001';
const socket = io.connect(host);
export default socket;
