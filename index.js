const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) reject('I could not find the file 🥲');
      resolve(data);
    });
  });
};

const writeFilePro = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject('Could not write the file 🥲');
      resolve('Sucess');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(data);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res4Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res5Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([
      res1Pro,
      res2Pro,
      res3Pro,
      res4Pro,
      res5Pro,
    ]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog saved to file');
  } catch (err) {
    console.log(err);

    throw err;
  }
  return '2: Ready 🐶';
};
getDogPic();

// (async () => {
//   try {
//     console.log('1: I will get Dog pics');
//     console.log(await getDogPic());
//     console.log('3: Done getting dog pics');
//   } catch (err) {
//     console.log('ERROR 💥');
//   }
// })();
// getDogPic();

// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog saved to file');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
