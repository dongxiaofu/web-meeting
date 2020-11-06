
import io from 'socket.io-client';
// let host = location.origin;
let host = 'http://127.0.0.1:3001'
const socket = io.connect(host);
export default socket;
