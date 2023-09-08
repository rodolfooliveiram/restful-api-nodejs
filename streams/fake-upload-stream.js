import { Readable } from 'node:stream';

class CountDownStream extends Readable {
  index = 5;

  _read() {
    const i = this.index--;

    setTimeout(() => {
      if (i < 0) {
        this.push(null);
      } else {
        const buff = Buffer.from(String(i));
        this.push(buff);
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new CountDownStream(),
  duplex: 'half',
})
  .then((response) => {
    return response.text();
  })
  .then((data) => {
    console.log(data);
  });
