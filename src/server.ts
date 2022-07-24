import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, imageExists} from './util/util';
import { nextTick } from 'process';
import { BadRequest, main, NotFound } from './errors/errors';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
  app.get("/filteredimage/", async (req: Request, res: Response) => {
    let { image_url } = req.query;

    /* 1. Validate the image url query */
    if (!image_url) return res.status(400).send(BadRequest);

    /* Check if the url is a valid image */
    const image = await imageExists(image_url);

    /* Check if image url is of publicly available image */
    if (!image) return res.status(400).send(BadRequest)

    /* 2. Call filterImageFromURL(image_url) */
    const filteredImage = await filterImageFromURL(image_url);

    /* 3. Send the resulting file in the response */
    return res.status(200).sendFile(filteredImage, ()=>{
      const localfile: Array<string> = [filteredImage];

      /* Delete local files on the server on finish */
      deleteLocalFiles(localfile);
    })
  });

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send(main("try GET /filteredimage?image_url={{}}"))
  } );
  
  /* Catch all requests to the server */

  app.all("*", (req: Request, res: Response) =>{
    res.status(404).send(NotFound);
  })

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
