      var myCanvas = document.getElementById('canvas');
      const ctx = myCanvas.getContext('2d');
      //ctx.translate(0.5, 0.5);
      
      /* START RENDERING FUNCTION TO MAKE CANVAS OUTPUT UN FUZZY*/
      //const myCanvas = document.getElementById("canvas");
      const originalHeight = myCanvas.height;
      const originalWidth = myCanvas.width;
      render();
      
function render() {
  let dimensions = getObjectFitSize(
    true,
    myCanvas.clientWidth,
    myCanvas.clientHeight,
    myCanvas.width,
    myCanvas.height
  );
  const dpr = window.devicePixelRatio || 1;
  myCanvas.width = dimensions.width * dpr;
  myCanvas.height = dimensions.height * dpr;

  let ctx = myCanvas.getContext("2d");
  let ratio = Math.min(
    myCanvas.clientWidth / originalWidth,
    myCanvas.clientHeight / originalHeight
  );
  ctx.scale(ratio * dpr/8, ratio * dpr/8); //adjust this!
  //ctx.beginPath();
  //ctx.arc(50, 50, 50, 0, 2 * Math.PI);
  //ctx.stroke();
}

// adapted from: https://www.npmjs.com/package/intrinsic-scale
function getObjectFitSize(
  contains /* true = contain, false = cover */,
  containerWidth,
  containerHeight,
  width,
  height
) {
  var doRatio = width / height;
  var cRatio = containerWidth / containerHeight;
  var targetWidth = 0;
  var targetHeight = 0;
  var test = contains ? doRatio > cRatio : doRatio < cRatio;

  if (test) {
    targetWidth = containerWidth;
    targetHeight = targetWidth / doRatio;
  } else {
    targetHeight = containerHeight;
    targetWidth = targetHeight * doRatio;
  }

  return {
    width: targetWidth,
    height: targetHeight,
    x: (containerWidth - targetWidth) / 2,
    y: (containerHeight - targetHeight) / 2
  };
}

      /* END OF RENDERING FUNCTION TO MAKE CANVAS OTUPUT UN FUZZY*/


      const NULLOP = 0;
      const FAIL = -1;
      const SUCCESS = 1;

      //const myinputfield = document.querySelector("#myinputfield");
      let regextree = null;
      var regexroot;
      var regexpattern;
      var regexpatternlength;
      let stringpos = {index:0};
      var stringpattern;
      var stringpatternlength;
      var root = null;
      let currentanimation = null;
      var x = 0;//100
      var x_init = 20;//50
      var y = 0;//20
      var y_init = 20;//50
      var r = 15;
      let animationstack = [];
      let animation_duration = 2;
      let radius = 18;

      var greatest_x = x_init;//50
      var greatest_y = y_init;//50

      var x_offset = 45; //75
      var y_offset = 60;//100
      var x_level = 0;
      var global_y;
      var animation_play_scale = 10;
      var animations_timeout_scale = 2000;
      let thisanimationobject = null;
      var myinterval = null;

      var global_answer = null;
      let animation_object = function(x, y, s)
      {
        this.x = x;
        this.y = y;
        this.stroke_style = s;
 
        this.complete = false;
      }

    document.getElementById("button").addEventListener('click', function ()
    {
 
      //const context = canvas.getContext('2d');
      for (let count_up = 0; count_up < 2; count_up++) 
      {
        global_answer = "";
        resultFunction();
        var text = document.getElementById('text');
        regexpattern = text.value;
        regexpatternlength = regexpattern.length;
        pos = 0;
        x_level = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        greatest_x = x_init;
        greatest_y = y_init;
        animationstack = [];
        myinterval = null;
        regextree = new REGEXTree();
        regexroot = regextree.runtree();
        regextree.drawtree();
    }       
    });

    document.getElementById("stringbutton").addEventListener('click', function ()
    {
      var text = document.getElementById('stringtext');
      var animation_length;
      stringpattern = text.value;
      stringpatternlength = stringpattern.length;
      stringpos.index = 0;
      x_level = 0;
      animationstack = [];
      greatest_x = x_init;
      greatest_y = y_init;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      regextree.drawtree();
      result = evaluatestring(stringpattern, regextree);
      animation_length = animationstack.length;
      var myinterval = setInterval(playvisualizations, animation_duration);
      setTimeout(function( ) { clearInterval( myinterval ); }, animation_length*100*animation_duration);
      //setTimeout. var task; task = function () { finished = repeatingLogic(); if (!finished) setTimeout(task, delay);}; task();
      //setTimeout(function repeat() {playvisualizations; setTimeout(repeat, animation_duration);}, animation_duration);
    });


function calcpatternlength(pattern)
{
    stringpatternlength = pattern.length;
    return stringpatternlength;
}

function getpatternlength()
{
    return stringpatternlength;
}


function peek()
{
    return regexpattern[pos];
}

function stringpeek()
{
    return stringpattern[stringpos.index];
}

function stringpeekpos(index)
{
    return stringpattern[index.index];
}

function stringatpos(index)
{
    if(index < getpatternlength())
    {
        return stringpattern[index];
    }
    else
    {
        return ' ';
    }
}

function match(ch)
{
    if (peek() != ch)
    {
        //throw new Error(`Unexpected symbol ${ch}`);
        return false;
    }
    else
    {
        pos++;
        return true;
    }
}

function stringmatch(ch)
{
    if (stringpeek() != ch)
    {
        //throw new Error(`Unexpected symbol ${ch}`);
        return false;
    }
    else
    {
        stringpos.index++;
        return true;
    }
}

function next()
{
    ch = peek();
    if(match(ch) == true)
    {
        return ch;
    }
    else
    {
        return ' ';
    }
}

function stringnext()
{
    ch = stringpeek();
    if(stringmatch(ch) == true)
    {
        return ch;
    }
    else
    {
        return ' ';
    }
}


function isMetaChar(character)
{
    if(character == '*' || character == '?' || character == '+' || character == '.')
    {
        return true;
    }
    else
    {
        return false;
    }
}

function hasMoreChars()
{
    if (regexpattern.length > pos)
        return true;
    else
        return false;
}

/********************ABOVE END ACCESSORY FUNCTIONS****************/

//Function for nodes
var Node = function(x,y,r, ctx, data) {
    var x_level_local = 0;
    // left child of a node
    this.left = null;
    // right child of a node
    this.right = null;
    this.data = data;
    this.x = x;
    this.y = y;
    this.r = r;
    var line = new Line();

    var this_pos_x = null;
    var this_pos_y = null;
    var right_pos_x = null;
    var right_pos_y = null;
    var left_pos_x = null;
    var left_pos_y = null;

    // draw function. Responsible for drawing the node
    
    this.draw = function(x, y, r)
    {
      this.x = x;
      this.y = y;
      this.r = r;
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
      ctx.stroke();
      ctx.strokeStyle = "black";
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.font = "20px sans-erif, helvetica";
      //ctx.fillStyle = "#000000"; //<======= and here
      ctx.strokeText(data, this.x-5, this.y+5);
      this_pos_x = this.x;
      this_pos_y = this.y;
    
 
      if(this.left != null)
      {
        this.y = this.y + y_offset;
        greatest_y = this.y;
        left_pos_x = this.x;
        left_pos_y = this.y;
        line.draw(this_pos_x, this_pos_y, left_pos_x, left_pos_y, this.r, ctx);
        this.left.draw(this.x, this.y, this.r);
      }

      if(this.right != null)
      {
        x_level++;
        this.x = x_init + x_level*x_offset;
        greatest_x = this.x;
        right_pos_x = this.x;
        right_pos_y = this.y;
        line.draw(this_pos_x, this_pos_y, right_pos_x, right_pos_y, this.r, ctx);
        this.right.draw(this.x, this.y, this.r);
      }
      greatest_y = 0;
    };
    
    // Simple getters
    this.getData = function() { return data; };
    this.getX = function() { return x; };
    this.getY = function() { return y; };
    this.getRadius = function() { return r; };
    
    // Returns coordinate for the left child
    // Go back 3 times radius in x axis and
    // go down 3 times radius in y axis
    this.leftCoordinate = function()
    {
      return {cx: (x - (3*r)), cy: (y + (3*r))}
    };
    // Same concept as above but for right child
    this.rightCoordinate = function()
    {
      return {cx: (x + (3*r)), cy: (y+(3*r))}
    };

    this.write = function(datum)
    {
      ctx.strokeText(datum, this_pos_x-5, this_pos_y+5);
    }

    this.getthisx = function()
    {
      return this_pos_x;
    }

    this.getthisy = function()
    {
      return this_pos_y;
    }
  };


  function vizu()//(prev_x, prev_y)
  {
    var cur = 0;
    var start = new Date().getTime();
    var animation_partition = 2.5;
    (function draw()
    {
      var now = new Date().getTime(),
      next = 2 * Math.PI * (now-start)/animation_partition;

      ctx.beginPath();
      ctx.strokeStyle = thisanimationobject.stroke_style;
      ctx.arc(thisanimationobject.x, thisanimationobject.y, radius, 0, next);
      cur = Math.floor(next*100)/100; // helps to prevent gaps
      ctx.stroke();
      ctx.closePath();

      if (cur < 2 * Math.PI)
      {
        currentanimation = requestAnimationFrame(draw);
        thisanimationobject.complete = false;
      }
      else
      {
        thisanimationobject.complete = true;
      }
 
    })();
  }



  let playvisualizations = function()
  {
    if (animationstack.length>0)
    {
      if(thisanimationobject == null)
      {
        thisanimationobject = animationstack.shift();
      }
      if(thisanimationobject.complete == true)
      {
        thisanimationobject = animationstack.shift();

        if (animationstack.length>0)
        {
          vizu();
        }
      }
      if(thisanimationobject.complete == false)
      {
        vizu();

      }
    }
  }

  var Line = function()
  {
    // Takes
    // x,y      - starting x,y coordinate
    // toX, toY - ending x,y coordinate
    this.draw = function(x, y, toX, toY, r, ctx)
    {
      var moveToX = x;
      var moveToY = y + r;
      var lineToX = toX;
      var lineToY = toY - r;
      ctx.beginPath();
      ctx.moveTo(moveToX, moveToY);
      ctx.lineTo(lineToX, lineToY);
      ctx.stroke();
      ctx.closePath();
    };
  };

  //Function for nodes

  var REGEXTree = function()
  {

  var line = new Line();
  var currentnodeposition;
  var nextnodeposition;

  this.runtree = function()
  {
    root = this.expr();
    return this.root;
  }

  this.drawtree = function()
  {
    if(root)
    {
        greatest_x = x_init;
        greatest_y = y_init;
        x_level = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        root.draw(greatest_x, greatest_y, radius);
    }
    else
    {
       window.alert("No tree root to draw.");
    }
  }
  // Getter for root
  this.getRoot = function() { return this.root; };
  
  this.expr = function()
  {
    var trm = null;
    trm = this.term();

    if ((hasMoreChars()) && (peek() == '|'))
    {
        match('|');
        var expression =  new Node(x, y, radius, ctx, '|');
        expression.data = '|';
        expression.left = trm;
        expression.right = this.expr();
        expression.operation = orop;
        return expression;
    }

    return trm; /* TreeNode('Expr', [trm]);*/
  }

  this.term = function()
  {
    var factor_or_null = this.factor();
    
    if (hasMoreChars() && peek() != ')' && peek() != '|')
    {
        var idiom = new Node(x, y, radius, ctx, '.');
        idiom.data = '.';
        idiom.left = factor_or_null;
        idiom.right = this.term();
        idiom.operation = concat;
        return idiom;
    }

    return factor_or_null;// TreeNode('Term', [factr]);
  }

  this.factor = function()
  {
    var atm = null;
    atm = this.atom();

    if (hasMoreChars() && isMetaChar(peek()))
    {
      var datum = next();
      var first_factor = new Node(x, y, radius, ctx, datum);
      first_factor.left = atm;
      first_factor.right = null;

      switch(datum)
      {
          case '*':
              first_factor.operation = kleene;
              break;
          case '?':
              first_factor.operation = quest;
              break;
          case '+':
              first_factor.operation = plus;
              break;
      }
      while(isMetaChar(peek()))
      {
        first_factor = this.consecutiveunary(first_factor);

      }
      return first_factor;
    }

    return atm;// TreeNode('Factor', [atm]);
  }

  this.consecutiveunary = function(mynode)
  {
    let datum = next();
    let this_node = new Node(x, y, radius, ctx, datum);
    switch(datum)
    {
      case '*':
          this_node.operation = kleene;
          break;
      case '?':
          this_node.operation = quest;
          break;
      case '+':
          this_node.operation = plus;
          break;
    }
    this_node.left = mynode;

    return this_node;
  }

  this.atom = function()
  {
      if (peek() == '(')
      {
          match('(');
          var exp = this.expr();
          match(')');
          return exp;// TreeNode('Atom',[new TreeNode('('), exp, new TreeNode(')')]);
      }

      return this.characters();//new TreeNode('Atom', [ch]);
  }

  this.characters = function()
  {
      if (isMetaChar(peek()))
      {
          return null;
      }
      if (peek() == '\\')
      {
          match('\\');
          var thisdata = next();
          var parts = new Node(x, y, radius, ctx, thisdata);
          parts.operation = literal;
          return parts ;//TreeNode('Char', [new TreeNode('\\'), new TreeNode(next())]);
      }
      var thisdata = next();
      var pieces = new Node(x, y, radius, ctx, thisdata);
      pieces.operation = literal;
      return pieces;//TreeNode('Char', [new TreeNode(next())]);
  }
};


var evaluatestring = function(string, regexTree)
{
    stringpos.index = 0;
    var answer = null;
    var isthereamatch = false;
    animationstack = [];
    if(stringpatternlength>0)
    {
        answer = root.operation(stringpos,root);
        if( (stringpos.index<stringpatternlength) || (answer == FAIL) )
        {
            global_answer = "NO MATCH";
            animationstack.push(new animation_object(x_init, y_init, "red"));
            isthereamatch = false;
        }
        else if(answer != FAIL)
        { 
            global_answer = "MATCH FOUND!";
            animationstack.push(new animation_object(x_init, y_init, "green"));
            isthereamatch = true;
        }
    }

    resultFunction();

    return isthereamatch;
}

//Operation function definitions

var concat = function(index, syntaxNode)
{
    let pos1 = {index:0};
    pos1.index = index.index;
    var answer = NULLOP;
    var left_result = NULLOP;
    var right_result = NULLOP;

    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "yellow"));

    left_result = syntaxNode.left.operation(pos1, syntaxNode.left);
    if(left_result == FAIL)
    {
      answer = FAIL;
      animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "red"));
      return FAIL;
    }
    right_result = syntaxNode.right.operation(pos1, syntaxNode.right);

    if( (left_result == NULLOP) && (right_result == NULLOP) )
    {
        answer = NULLOP;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "orange"));
    }
    if(right_result == FAIL)
    {
        answer = FAIL;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "red"));
    }
    if(right_result == SUCCESS)
    {
        answer = SUCCESS;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
    }
    /*newly added*/
    if(left_result == SUCCESS)
    {
        answer = SUCCESS;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));        
    }
    index.index = pos1.index;
    return answer;
}

var orop = function(index, syntaxNode)
{
    let pos1 = {index:0};
    let pos2 = {index:0};
    var result1 = NULLOP;
    var result2 = NULLOP;
    var answer = NULLOP;
    
    pos1.index = index.index;
    pos2.index = index.index;
    
    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "yellow"));

    result1 = syntaxNode.left.operation(pos1, syntaxNode.left);

    result2 = syntaxNode.right.operation(pos2, syntaxNode.right);
    
    /*
     1. If no matches at all from kleene, the position parameter remains the same and the function returns a null value
     2. If there is a match, the pos parameter leaves off where it failed and the function returns true
     */
    if(result1 == NULLOP && result2 == NULLOP)
    {
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "orange"));
        return NULLOP;
    }
  
    if(result1 == SUCCESS && result2 == SUCCESS)
    {
        if(pos1.index > pos2.index)
        {
            index.index = pos1.index;
        }
        else
        {   //if the increments are equal or position 2 (pos2) is greater than position 1 (pos1).
            index.index = pos2.index;
        }
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
        return SUCCESS;
    }
    
    if(result1 == SUCCESS)
    {
        index.index = pos1.index;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
        return SUCCESS;
    }
    if(result2 == SUCCESS)
    {
        index.index = pos2.index;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
        return SUCCESS;
    }
    answer = FAIL;
    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "red"));
    return answer;
}

//modifying the function to increment after each match up to the complete pattern length
var plus = function(index, syntaxNode)//one or more
{
    let local_index = {index:0};
    let last = {index:0};
    last.index = index.index;
    var answer = FAIL;
    var action = FAIL;

    local_index.index = index.index;
    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "yellow"));
    action = syntaxNode.left.operation(local_index, syntaxNode.left);

    if(action == FAIL)
    {
      animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "red"));
    }
    while((action == SUCCESS) && (local_index.index<=stringpatternlength))
    {
        answer = SUCCESS;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
        last.index = local_index.index;
        action = syntaxNode.left.operation(local_index, syntaxNode.left);
    }

    index.index = last.index;

    return answer;
}

var quest = function(index, syntaxNode)//zero or one
{
    var answer = NULLOP;
    var result = NULLOP;
    let local_index = {index:0};
    local_index.index = index.index;

    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "yellow"));
    result = syntaxNode.left.operation(local_index, syntaxNode.left);

    if(result == SUCCESS && local_index.index<=stringpatternlength)
    {
      animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
      answer = SUCCESS;
    }
    else
    {
        answer = SUCCESS;
    }

    index.index = local_index.index;
    return answer;
}

var kleene = function(index, syntaxNode)//zero or more
{
    let local_index = {index:0};
    var last = {index:0};
    var answer = NULLOP;
    var action = NULLOP;

    last.index = index.index;
    local_index.index = index.index
    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "yellow"));
    action = syntaxNode.left.operation(local_index, syntaxNode.left);

    if(action != FAIL)
    {
        while((action !=FAIL) && (local_index.index<=stringpatternlength))
        {
            if(action == SUCCESS)
            {
                answer = SUCCESS;
            }
            if(action== NULLOP)
            {
                
            }
            animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
            last.index = local_index.index;
            action = syntaxNode.left.operation(local_index, syntaxNode.left);
        }
    }
    else
    {
        answer = SUCCESS;
        //currenty trying if answer should be 'NULLOP' instead
        answer = NULLOP;
        index.index = local_index.index;
    }
    index.index = last.index;

    return answer;
}

var literal = function(index, syntaxNode)
{
    let local_index= {index:0};
    local_index.index = index.index;
    animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "yellow"));

    if(syntaxNode.data == stringpeekpos(index))
    {
      
        local_index.index++;
        index.index = local_index.index;
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "green"));
        return SUCCESS;
    }
    else
    {
        animationstack.push(new animation_object(this.getthisx(), this.getthisy(), "red"));
        return FAIL;
    }
}

function resultFunction() 
{
  document.getElementById("regexResult").innerHTML = global_answer;
}

