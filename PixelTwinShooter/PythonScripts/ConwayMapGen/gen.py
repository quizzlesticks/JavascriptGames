from PIL import Image
import random

def randomBoard(length, height):
    board = []
    for i in range(height):
        random_row = []
        for j in range(length):
            random_row.append(int(random.random() >= MAX_RAND_CHANCE))
        board.append(random_row)
    return board

def blankBoard(length, height):
    board = []
    for i in range(height):
        row = [0]*length
        board.append(row)
    return board

def CheckCells(past, next):
    for i in range(height):
        for j in range(length):
            z = NeighborSum(past, i, j)
            if past[i][j] == 0:
                if z > grownth_neighbor:
                    next[i][j] = 1
            else:
                if z < min_neighbor or z >= max_neighbor:
                    next[i][j] = 0
                else:
                    next[i][j] = 1

def NeighborSum(grid, i, j):
    #Top Left
    if (i == 0) and (j == 0):
        z = grid[i+1][j] + grid[i][j+1] + grid[i+1][j+1]
    #Bottom Left
    elif (i == (height-1)) and (j == 0):
        z = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1]
    #Top Right
    elif (i == 0) and (j == (length-1)):
        z = grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j]
    #Bottom Right
    elif (i == (height-1)) and (j == (length-1)):
        z = grid[i-1][j] + grid[i-1][j-1] + grid[i][j-1]
    #Left Wall but not corners
    elif j == 0:
        z = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1] + grid[i+1][j+1] + grid[i+1][j]
    #Top Wall but not corners
    elif i == 0:
        z = grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1] + grid[i][j+1]
    #Right Wall but not corners
    elif j == (length - 1):
        z = grid[i-1][j] + grid[i-1][j-1] + grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j]
    #Bottom Wall but not corners
    elif i == (height-1):
        z = grid[i][j+1] + grid[i-1][j+1] + grid[i-1][j] + grid[i-1][j-1] + grid[i][j-1]
    #All other
    else:
        z = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1] + grid[i][j-1] + grid[i][j+1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1]
    return z

def writeGrid(grid, filename="grid.out"):
    f = open(filename, "w")
    for row in grid:
        f.write(str(row)[1:][:-1])
        f.write("\n")

def genImageCache(grid, filenumber):
    im = Image.new("RGB", (32*length, 32*height))
    tiles = Image.open("../../Spritesheets/tile.png")
    box1 = (0,0,32,32)
    box2 = (32,0,64,32)
    tile1 = tiles.crop(box1) #grass
    tile2 = tiles.crop(box2) #dirt
    for i in range(height):
        for j in range(length):
            box = (32*j, 32*i, 32*(j+1), 32*(i+1))
            if(grid[i][j]):
                im.paste(tile1, box)
            else:
                im.paste(tile2, box)
    im.save("../../Spritesheets/Map/Map" + str(filenumber) + ".png")

#main
if __name__ == "__main__":
    for l in range(9):
        length = 32
        height = 26
        MAX_RAND_CHANCE = 0.9 #Any number greater or equal to this will start alive
        min_neighbor = 2 #Kill if less than
        max_neighbor = 10 #Kills if this many or more
        grownth_neighbor = 1 #Become alive if more than
        generation = 4
        cur_grid = randomBoard(length, height)
        next_grid = blankBoard(length, height)
        for k in range(generation):
            CheckCells(cur_grid, next_grid)
            cur_grid = next_grid
            next_grid = blankBoard(length, height)
        genImageCache(cur_grid, l)
