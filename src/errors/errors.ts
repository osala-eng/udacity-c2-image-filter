const errortemplate = (code: number, message: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Home</title>
        </head>
        <body class="all">
            <div class="code">
                <h1 class="oops">OOPS!</h1>
                <h1 class="text">${code}</h1>
            </div>
            <div class="info">
                <h1 class="text">${message}</h1>
            </div>
        </body>
    </html>
    <style>
    *{
        background-color: orange
    }
    .all{
        margin: auto;
        width: 80%;
    }
    .code{
        margin: auto;
        width: 50%;
    }
    .text{
        text-align: center;
        font-size: 5vw
    }
    .oops{
        text-align: center;
        font-size: 10vw
    }
    </style>
    `
}

export const main = (message: string): string => {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Home</title>
        </head>
        <body class="all">
            <div class="info">
                <h1 class="text">${message}</h1>
            </div>
        </body>
    </html>
    <style>
    *{
        background-color: green;
    }
    .all{
        margin: auto;
        width: 100%;
        height: 100%
        position: relative;

    }
    .info{
        margin: 0;
        width: 100%;
        position: absolute;
        top: 40%;
    }
    .text{
        text-align: center;
        font-size: 5vw
    }
    </style>
    `
}

// 400
export const BadRequest: string = errortemplate(400, "Bad Request invalid image url");
// 404
export const NotFound: string = errortemplate(404, "Page not Found")

