import fs from "fs";
import Jimp = require("jimp");
import axios from 'axios'
import { IMAGE_TYPES } from "./image.header";

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // const photo = await Jimp.read(inputURL);

      /**
       * Added axios to create image buffer then pass to jimp
       */
      axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      })
      .then( async function ({data: imageBuffer}) {
        const photo = await Jimp.read(imageBuffer);

        const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
      })
     
    } catch (error) {
      //reject(error);
      console.log(error)
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

/**
 * @param image_url - url of publicly available image
 * 
 * @returns promise image exists in url ? true : false
 */

export async function imageExists(image_url: string):Promise<boolean> {
// check if a url contains a valid image
return new Promise (async (resolve, reject)=>{
  try{  
  axios({
      method: 'get',
      url: image_url,
      responseType: 'stream'
    })
    .then((res) => {
      const str: string = JSON.stringify( res.headers);
      IMAGE_TYPES.forEach(async (header)=>{
        if (str.match(header))
        {
          resolve(true);
        }
      });
      resolve(false);
    })
    .catch((err)=>{
      resolve(false)
    })
  }
  catch{
    reject(false)
  }
});
}



