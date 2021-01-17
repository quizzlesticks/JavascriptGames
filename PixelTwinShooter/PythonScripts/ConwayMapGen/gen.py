import random
grid = []
step = []
#grid = [[0,1,0],[1,0,1],[0,0,0]]
#step = [[0,0,0],[0,0,0],[0,0,0]]
length = 10
height = 10
min_neighbor = 2
max_neighbor = 4
grownth_neighbor = 3
generation = 1

def GenBoards(step, grid):
    for j in range(height):
        step_row = []
        random_row = []
        for i in range(length):
            y = (random.randint(0, 100))%2
            random_row.append(y)
            step_row.append(0)
        grid.append(random_row)
        step.append(step_row)

def writeGrid(grid, filename="grid.out"):
    f = open(filename, "w")
    for row in grid:
        f.write(str(row)[1:][:-1])
        f.write("\n")

def NeighborSum(grid, j, i):
    if (j == 0) and (i == 0):
        z = grid[i+1][j] + grid[i][j+1] + grid[i+1][j+1]
    elif (j == 0) and (i == (length-1)):
        z = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1]
    elif j == 0:
        z = grid[i-1][j] + grid[i-1][j+1] + grid[i][j+1] + grid[i+1][j+1] + grid[i+1][j]
    elif (i == 0) and (j == (height-1)):
        z = grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j]
    elif i == 0:
        z = grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1] + grid[i][j+1]
    elif (j == (height-1)) and (i == (length-1)):
        z = grid[i-1][j] + grid[i-1][j-1] + grid[i][j-1]
    elif j == (height - 1):
        z = grid[i-1][j] + grid[i-1][j-1] + grid[i][j-1] + grid[i+1][j-1] + grid[i+1][j]
    elif i == (length-1):
        z = grid[i][j+1] + grid[i-1][j+1] + grid[i-1][j] + grid[i-1][j-1] + grid[i][j-1]
    else:
        z = grid[i-1][j-1] + grid[i-1][j] + grid[i-1][j+1] + grid[i][j-1] + grid[i][j+1] + grid[i+1][j-1] + grid[i+1][j] + grid[i+1][j+1]
    return z

def CheckCells(past, next):
    for j in range(height):
        for i in range(length):
            z = NeighborSum(past, j, i)
            if past[i][j] == 0:
                if z == grownth_neighbor:
                    next[i][j] = 1
            elif past[i][j] == 1:
                if z >= min_neighbor and z < max_neighbor:
                    next[i][j] = 1
                else:
                    next[i][j] = 0

#main
GenBoards(step, grid)
for tmp in range(generation):
    CheckCells(grid, step)
    CheckCells(step, grid)

writeGrid(grid)
writeGrid(step, "gen.out")
