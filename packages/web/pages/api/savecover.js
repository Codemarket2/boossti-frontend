import formidable from 'formidable';
import { v4 as uuid } from 'uuid';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  try {
    console.log('image upload request /api/savecover');
    const data = await new Promise(function (resolve, reject) {
      const form = new formidable.IncomingForm({ keepExtensions: true });
      form.parse(req, function (err, fields, files) {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });
    const response = await data;
    console.log(response);

    // const formFields = (await data).fields;
    // console.log(Object.keys(formFields.hidcustomval));
    // const count = formFields.count;
    // const base64Data = formFields['hidimg-' + count];
    // const filename = formFields['hidname-' + count];
    // const imgtype = formFields['hidtype-' + count];
    // const buf = Buffer.from(
    //   base64Data.replace(/^data:image\/\w+;base64,/, ''),
    //   'base64'
    // );
    // const imageKey = `uploads/test/${Date.now()}-${uuid()}.jpeg`;
    // const imageUrl = `http://localhost:3000/${imageKey}`;
    // await require('fs/promises').writeFile(
    //   `./public/${imageKey}`,
    //   buf,
    //   'base64'
    // );
    // console.log(imageUrl);
    // const url =
    //   'http://localhost:3000/uploads/test/1634382022574-f29156a2-cd12-43c2-bdd7-65b789c44f49.jpeg';
    // const html = `<html><body onload="parent.applyBoxImage('${url}')"></body></html>`;
    // return res.status(200).send(html);
    response.inp.i;
  } catch (error) {
    console.log('error', error);
    return res
      .status(400)
      .send(
        `<html><body onload="alert('Sorry, your cover image file was not uploaded.')"></body></html>`
      );
  }
};
