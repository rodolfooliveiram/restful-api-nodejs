import http from 'node:http';
import { Transform } from 'node:stream';

class ConvertNumberSignToNegativeStream extends Transform {
  _transform(chunk, enconding, callback) {
    const convertedNumber = Number(chunk.toString()) * -1;
    const buff = Buffer.from(String(convertedNumber));

    console.log(convertedNumber);

    callback(null, buff);
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);
});

server.listen(3334);
