var pkg = require('canvas');
const { createCanvas, loadImage, registerFont } = pkg;
var fsPkg = require('fs');
const { writeFileSync, existsSync, mkdirSync, rmSync } = fsPkg;
var path = require('path');
registerFont('public/Inter.otf', { family: 'Inter' });
const generateOgImage = async (slug, title, desc, author, time, twitter) => {
    const dir = path.resolve('public', 'og');
    const filepath = path.resolve(dir, `${slug}.png`);

    if (!existsSync(dir)) {
        mkdirSync(dir);
    }
    rmSync(filepath, { force: true });
    if (!existsSync(filepath)) {

        const imgBuffer = await createImage(title, slug);

        writeFileSync(filepath, imgBuffer);
    }
};

function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        console.log(width);
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    console.log(lines);
    return lines;
}


const createImage = async (title) => {
    const width = 853;
    const height = 480;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    context.fillRect(0, 0, width, height);

    const image = await loadImage(path.resolve('public', 'frame.png'));

    context.drawImage(image, 0, 0);
    context.font = '900 60px Arial';
    context.fillStyle = '#fff';

    getLines(context, title, 800).forEach((line, i) => { 
        context.fillText(line, 40, 100 + i * 60);
    });

    context.font = '700 30px Arial';
    context.fillStyle = '#fff';
    context.fillText("Anto Subash", 170, 370);
    context.fillText("github.com/antosubash", 170, 410);


    return canvas.toBuffer('image/png');
};

generateOgImage("abp-get-started", "We have copied the IdentityServer and Angular app from the default tired app");
