var cols, rows;
var w = 20;

var grid = [];
var stack = [];

var pointX = [];
var pointY = [];
var current;


var top, bottom, NotBottom, openess;
var counter = 0;

var mouseDown = false;

let myFont;
let img;
function preload() {
  myFont = loadFont('font.ttf');
  img = loadImage('daisy16.png');
}

function setup() {
  createCanvas(800, 800);
  cols = floor(width/w);
  rows = floor(height/w);
  top = floor(random(1, cols - 1));
  
  
  fill(color('#000000'));
  textFont(myFont);
  textSize(width/6);
  textAlign(CENTER, CENTER);
  frameRate(100000);
  stroke(0);
  
  bottom = floor(random(1, cols + 1));
  NotBottom = floor(random(1, cols - 1));
  openess = floor(random(2, 10));
  console.log(top);
  console.log(bottom);
  console.log(NotBottom);
  console.log(openess);
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
  
  counter += 1;
  background(255);
  
  strokeWeight(4);
  stroke(0);
  if(current)
    {
      
      text('loading...', width/2, height/2);
    }
  stroke(255, 0, 0, 100);
  for(var i = 0; i < pointX.length; i++)
        {
            strokeWeight(10);
            image(img, pointX[i] - 8, pointY[i] - 8);
          
          
          
          
          /*
          if(i != 0)
            {
              line(pointX[i -1], pointY[i -1], pointX[i], pointY[i]);
            }else if ( i == 0)
              {
                line(pointX[i], pointY[i], pointX[i], pointY[i]);
              }*/
          
        }
    strokeWeight(4);
  
  
  if(current)
    {
  current.visited = true;
  //current.highlight(255, 0, 255, 20);
    
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
            if(floor(random(1, openess)) == 2)
              {
                if(current.checkNeighborsVisited())
            {
              removeWalls(current, current.checkNeighborsVisited());
              
              
            }
              }
            stack.pop();
            current = stack[stack.length - 1];
            
            
          }
        
      }
  }else
    {
      stroke(0);
      
       if(mouseDown)
        {

      
      //point(mouseX, mouseY);
          
      if(counter % 25 == 0)
        {
          pointX.push(mouseX);
          pointY.push(mouseY);

          
        }
        
        }
        for (var i = 0; i < grid.length; i++)
    {
      grid[i].show();
      if(i == NotBottom )
        {
          grid[i].highlight(0, 255, 0, 100);
          grid[i].walls = [false, grid[i].walls[1], grid[i].walls[2], grid[i].walls[3]];
        }
      if(i == grid.length - bottom)
        {
          grid[i].highlight(255, 0, 0, 100);
          grid[i].walls = [grid[i].walls[0], grid[i].walls[1], false, grid[i].walls[3]];
        }
      
    }
      
      for (var i = pointX.length; i > 0; i--)
        {
          if(pointX[i] == pointX[i-1] && pointY[i] == pointY[i-1])
            {
              pointX.splice(i - 1, 1);
              pointY.splice(i - 1, 1);
            }
          
        }
      
    }
  
  
  
  
 
  strokeWeight(1)
  
}

function mousePressed()
{
  image(img, mouseX - 8, mouseY- 8);
          
  mouseDown = true;
}
function mouseReleased()
{
  mouseDown = false;  
  
}
function keyPressed()
{
  if(key == ' ')
    {
      pointX.splice(0, pointX.length);
      pointY.splice(0, pointY.length);
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
function calculateDistance(a, b)
  {
    return sqrt(pow(b.x - a.x, 2) + pow(b.y - a.y, 2));
  }

