function Cell(x, y)
{
  this.x = x;
  this.y = y;
  this.walls = [true, true, true, true];
  this.visited = false;
  
  this.highlight = function()
  {
    var i = this.x * w;
    var j = this.y * w;
    noStroke();
    fill(255, 0, 255, 20);
    rect(i, j, w, w)
    
  }
  
  this.show = function()
      {
        var x = this.x*w;
        var y = this.y*w;
        stroke(0);
        
        if(this.walls[0])
          line(x, y, x+w, y); //top
        if(this.walls[3])
          line(x, y+w, x, y); // right
        if (this.walls[2])
          line(x+w, y+w, x, y+w); // bottom
        if(this.walls[1])
           line(x+w, y, x+w, y+w); // left

        if(this.visited)
        {
          noStroke();
          fill(0, 255, 0, 75);
          //rect(x,y,w,w);
        
        }
        
    }
  this.checkNeighbors = function()
  {
    var neighbors = [];
    
    var top = grid[index(x, y-1)];
    var bottom = grid[index(x, y+1)];
    var right = grid[index(x + 1, y)];
    var left = grid[index(x - 1, y)];
    
    if(top && !top.visited)
      {
        neighbors.push(top);
      }
    if(left && !left.visited)
      {
        neighbors.push(left);
      }
    if(bottom && !bottom.visited)
      {
        neighbors.push(bottom);
      }
    if(right && !right.visited)
      {
        neighbors.push(right);
      }
    
    if ( neighbors.length > 0 )
      {
        var r = floor(random(0, neighbors.length));
        return neighbors[r];
      }else
        {
          return undefined;
        }
    
  }
}
