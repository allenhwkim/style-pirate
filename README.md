style-pirate
============

Steal full html and css from the existing web site section


## How To Use It?


#### Pick an element to steal the html/css

![image](https://user-images.githubusercontent.com/1437734/30754598-58ee667e-9f91-11e7-90db-e722b13187f0.png)

#### Add the script from `unpkg.com`, or copy/paste it from `dist/stylePirate.umd.min.js`

`> (function(){var el=document.createElement('script');el.src="https://unpkg.com/style-pirate";document.body.appendChild(el); })();`

#### Run command

    > var sp = stylePirate.run($0);
    > stylePirate.plunker();  // to see it at plunker

![image](https://user-images.githubusercontent.com/1437734/30754902-8cdf850c-9f92-11e7-999e-cb1c79c4ef8c.png)

### Limitations

1. Fonts are not fully reproducible although `fonts.css` is generated
2. External css, which is in a different domain, is not reproducible.
3. Submitting to plunker returns error if the webpage blocks submission.





