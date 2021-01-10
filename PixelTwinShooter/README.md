# Spritesheet Manager
The constructor takes a 2d context that you want the SSM to draw on
```javascript
var ssm = new SpriteSheetManager(ctx);
```

Then you load up all your sprite sheets using
```javascript
ssm.load(filename, name, width_of_sprite, height_of_sprite, rows_count, col_count);
```
The name should be unique and is how you will refer to the sprite sheet, for example we could have two sprite sheets that we can refer to by "player" and "badGuy1"
```javascript
ssm.load("player_spritesheet.png", "player", 64, 64, 4,3);
ssm.load("badGuy1_spritesheet.png", "badGuy1", 32, 32, 4,3);
```

After calling load on all your images pass it a callback function. This function will be called once all your spritesheets load.
```javascript
ssm.whenFinishedLoading = callbackFunction;
```
By default this callback will be thrown away after it is used. This allows your to load another spritesheet later on and have a different function called when that one is done loading. You can turn this off so that the same callback is called everytime by passing false to the second parameter of the constructor like.
```javascript
var ssm = new SpriteSheetManager(ctx, false);
```
**Note: Keeping the callback is not recommended because the saved callback will be called everytime a new spritesheet loads. If you need to load multiple new spritesheets and you set this value to false then run your code like this (you could just save yourself a line of code by not setting this value false :])**
```javascript
a.whenFinishedLoading = undefined;
a.load(...);
a.load(...);
a.load(...);
a.whenFinishedLoading = oldCallback;
```
Once your callback has been called you can use drawSprite and pass an index which is a count starting from the top left and reading like a book of which sprite you want to draw. The index starts from zero. drawSprite takes the x and y pos of where to draw on the canvas and optionally it takes the width and height you would like to scale too
```javascript
ssm.drawSprite("player", 0, 10, 10); //Draw the first sprite in the player spritesheet
ssm.drawSprite("player", 1, 10, 10); //Draw the second sprite in the player spritesheet
ssm.drawSprite("badGuy1", 3, 100, 100); //Draw the first sprite on the second row of the badguy spritesheet
ssm.drawSprite("badGuy1", 3, 100, 100, 1000, 100); //wide bad guy
ssm.drawSprite("badGuy1", 3, 100, 100, 100, 1000); //tall bad guy
ssm.drawSprite("badGuy1", 3, 100, 100, 1000, 1000); //big bad guy
```
You can also define a set of indices to be used for an animation cycle. The animation loop can be defined at any point after your call to load for the spritesheet. The function takes the name of the spritesheet, a starting index, and a final index.
```javascript
ssm.defineAnimationLoop("player", 9, 11); //animate the last row of the player sheet
```
Then you can call either of
```javascript
ssm.drawNext(name, xpos, ypos, width=0, height=0)
```
or
```javascript
ssm.drawPrev(name, xpos, ypos, width=0, height=0)
```
where the scaling parameters are optional. This will draw the next sprite and once you draw the final sprite in the loop it will start again. If you wish to work with the sprite sheet yourself (e.g. you have an odd sprite sheet) then you can get it using
```javascript
ssm.getSheet(name)
```
