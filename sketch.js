var cols, rows;
var w = 40;

var grid = [];
var stack = [];

var current;

function setup() {
  createCanvas(800, 800);
  cols = floor(width/w);
  rows = floor(height/w);
  frameRate(100000000);
  
  for (var y = 0; y < rows; y++)
    {
      for (var x = 0; x < rows; x++)
        {
          var cell = new Cell(x, y);
          grid.push(cell);
        }
    }
  
  current = grid[0];
}

function draw() {
  background(255);
  
  for (var i = 0; i < grid.length; i++)
    {
      grid[i].show();
      if(i == 0 )
        {
          grid[i].highlight(0, 255, 0, 100);
        }
      if(i == grid.length -1)
        {
          grid[i].highlight(255, 0, 0, 100);
        }
      
    }
  if(current)
    {
  current.visited = true;
  current.highlight(255, 0, 255, 20);
  var next = current.checkNeighbors();
  if(next)
    {
      next.visited = true;
      
      removeWalls(current, next);
      
      stack.push(current);
      
      
      
      current = next;
    }else
      {
        if(stack.length > 0)
          {
            stack.pop();
            current = stack[stack.length - 1];
            
          }
        
      }
  }else
    {
      console.log("HEHE");
    }
}

function index(x, y)
{
  if(x < 0 || y < 0 || x > cols - 1 || y > rows - 1)
    {
      return -1;
    }
  return x + y * cols;
}

function removeWalls(a,b)
{
  var x = a.x - b.x;
  var y = a.y - b.y;
  
  if(x === 1)
    {
      a.walls[3] = false;
      b.walls[1] = false;
    }else if (x === -1)
    {
      b.walls[3] = false;
      a.walls[1] = false;
    }
    if(y === 1)
    {
      a.walls[0] = false;
      b.walls[2] = false;
    }else if (y === -1)
    {
      b.walls[0] = false;
      a.walls[2] = false;
    }
  
  
}

