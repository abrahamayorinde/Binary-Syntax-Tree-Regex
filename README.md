This is my attempt at finding an algorithm to do regex matching using the abstract syntax tree (in this case a binary syntax tree) as the graph (DFA or NFA) via recursive descent. [*The implementation of the algorithm at the github page provides a visualization to illustrate how the tree is parsed/created from the regexpattern.  It also illustrates, step-by-step, how the stringpattern is evaluated for a match.]

The algorithm currently only supports basic regex, meaning that it does not implement character classes. [*I think I will implement character classes eventually.]

The operators are limited to; one or more ('+'), zero or one ('?'), zero or more aka kleene ('*'),  or ('|'), and ('.').  Parentheses ('(') and (')') are also available for grouping.

Some of the operators are unary operators meaning that they only have one child.  The 'literal' node is unary while the 'concat' and 'or' nodes are binary.  The kleene ('*'), one or more ('+'), and zer or more ('?') nodes are also unary operators.

Each node stores its appropriate information in the form of child(ren) node(s), a data member and a function pointer.  Nodes can be put into two categories; literal and symbolic.  

Literal nodes store literal character data in the data member of the Node.  Consequently the operation function pointer will point to the ‘literal’ function.  This function simply checks the character of the stringpattern at an index matching that of the current literal node.  If a match is found, the index is incremented.

If the Node is symbolic then the data member stores the symbol of the operators { OR (‘|’), CONCAT (‘.’), KLEENE (‘*’), PLUS (‘+’), QUEST (‘?’)}.  The function pointer will point to the appropriate function.

 A literal node 'j' for example, having no children (left and right are 'NULL') would have the following values:

Node 
{
	Node left: (NULL),
	Node right: (NULL),
	char data: (’j’),
	func operation*: (literal(index, node))
}

The operation function of the literal node uses its own data as the parameter.  This is a terminal function and is non-recursive.

All other operation functions recursively evaluate the child operator with the child node as the argument.

As development of this algorithm progressed it was revealed there needed to be a way to indicate the difference between an operation failing to find a match, an operation finding a match, vs an operation that may find a match but did not.  For this scenario the ‘NULLOP’ value was chosen for operators that can find zero matches while allowing the algorithm to continue, while 'FAIL' stops matching characters entirely and SUCCESS keeps the algorithm matching more characters.
{FAIL = -1; NULLOP = 0; SUCCESS = 1}

The key point is that since regex statements can be crafted in ways where any node can precede any other node, each node/operation must be able to deal with ‘NULLOP’ values .

After much experimentation (ie trial and error) it became apparent that the desired behavior can be described with a straightforward logical implementation of the operations.

Truth tables for each node type are listed below.


| OR     | | |
| ---         |    ----    |          ---|
| Left Input   | Right Input   | Output       |
| NULLOP       | NULLOP       | NULLOP       |
| NULLOP       | TRUE         | TRUE         |
| TRUE         | NULLOP       | TRUE         |
| NULLOP       | FALSE        | NULLOP       |
| FALSE        | NULLOP       | NULLOP       |
| FALSE        | TRUE         | TRUE         |
| TRUE         | FALSE        | TRUE         |
| FALSE        | FALSE        | FALSE        |
| TRUE         | TRUE         | TRUE         |

| CONCAT     | | |
| ---         |    ----    |          ---|
| Left Input   | Right Input   | Output       |
| NULLOP        | NULLOP       | NULLOP       |
| NULLOP        | TRUE         | TRUE         |
| TRUE          | NULLOP       | TRUE         |
| NULLOP        | FALSE        | FALSE        |
| FALSE         | NULLOP       | FALSE        |
| FALSE         | TRUE         | FALSE        |
| TRUE          | FALSE        | FALSE        |
| FALSE         | FALSE        | FALSE        |
| TRUE          | TRUE         | TRUE         |


| PLUS     | |
| ---         |    ----    |     
| Left Input    | Output       |              
| NULLOP        | FALSE        |
| TRUE          | TRUE         | 
| FALSE         | FALSE        |


|QUEST(‘?’)  | |
| ---         |    ----    |     
| Left Input    | Output       |              
| NULLOP        | NULLOP       |
| TRUE          | TRUE         | 
| FALSE         | NULLOP       |


|KLEENE(‘*’)  | |
| ---         |    ----    |     
| Left Input    | Output       |              
| NULLOP        | NULLOP       |
| TRUE          | TRUE         | 
| FALSE         | NULLOP       |


|LITERAL(lookup)| |
| ---         |    ----    |     
| Left Input    | Output       |            
| TRUE          | TRUE         |
| FALSE         | FALSE        | 

Starting at the root node, recursively calling the function pointer operation will evaluate the string pattern against the regex. 

