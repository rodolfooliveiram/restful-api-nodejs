import { Readable, Writable, Transform } from 'node:stream';

class MultiplyByTenStream extends Writable {
  _write(chunk, enconding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new CountDownStream()
  .pipe(new ConvertNumberSignToNegativeStream())
  .pipe(new MultiplyByTenStream());
