An algorithm to do regex matching using the abstract syntax tree (in this case a binary syntax tree) as the graph (DFA or NFA) via recursive descent. [*The implementation of the algorithm at the github page provides a visualization to illustrate how the tree is parsed/created from the regexpattern.  It also illustrates, step-by-step, how the stringpattern is evaluated for a match.]

The algorithm currently only supports basic regex, meaning that it does not implement character classes or backtracking. [*I will implement character classes, but backtracking is unlikely.]

The operators are limited to; one or more ('+'), zero or one ('?'), zero or more ('*'),  or ('|'), and ('.').  Parentheses ('(') and (')') are also available for grouping.

Each node stores its appropriate information; child(ren) node(s), a data member and a function pointer.  Nodes can be put into two categories; literal and symbolic.  

Literal nodes store literal character data in the data member of the Node.  Consequently the operation function pointer will point to the ‘literal’ function.  This function simply checks the character of the stringpattern at an index matches that of the current literal node.  If a match is found, the index is incremented.

If the Node is symbolic then the data member will store the symbol of the operators { OR (‘|’), CONCAT (‘.’), KLEENE (‘*’), PLUS (‘+’), QUEST (‘?’)}.  The function pointer will point to the appropriate function.

 A literal node 'j' for example, would have the following values

Node 
{
	Node left; (NULL)
	Node right; (NULL)
	char data; (’j’)
	func operation*; (literal(index, node))
}

The operation function of the literal node uses its own data as the parameter.  This is a terminal function and is non-recursive.

All other operation functions recursively evaluate the child operator with the child node as the argument.

There needs to be a way to indicate between an operation failing to find a match, an operation finding a match, vs an operation that may find a match and did not.  For this implementation the choice is ‘NULLOP’ value is chosen for operators that can find zero matches. 
{FAIL = -1; NULLOP = 0; SUCCESS = 1}

Furthermore, since regex statements can be crafted in ways where any node can precede any other node, each operation must be able to deal with ‘NULLOP’ values as input and output.

After some consternation it should be apparent that the desired behavior (via experiment/trial and error) can reveal a logical implementation of the operations.

Truth tables for each node type are listed below.

| OR (‘|’)     | 
| :---         |    :----:    |          ---:|
| Left Input   | RightInput   | Output       |
| NULLOP       | NULLOP       | NULLOP       |
| NULLOP       | TRUE         | TRUE         |
| TRUE         | NULLOP       | TRUE         |
| NULLOP       | FALSE        | NULLOP       |
| FALSE        | NULLOP       | NULLOP       |
| FALSE        | TRUE         | TRUE         |
| TRUE         | FALSE        | TRUE         |
| FALSE        | FALSE        | FALSE        |
| TRUE         | TRUE         | TRUE         |

|AND/CONCAT(‘*’)| 
| :---          |    :----:    |          ---:|
| Left Input    | RightInput   | Output       |
| NULLOP        | NULLOP       | NULLOP       |
| NULLOP        | TRUE         | TRUE         |
| TRUE          | NULLOP       | TRUE         |
| NULLOP        | FALSE        | FALSE        |
| FALSE         | NULLOP       | FALSE        |
| FALSE         | TRUE         | FALSE        |
| TRUE          | FALSE        | FALSE        |
| FALSE         | FALSE        | FALSE        |
| TRUE          | TRUE         | TRUE         |


|PLUS(‘+’)      |      
| :---          |    :----:    |          
| Left Input    | Output       |              
| NULLOP        | FALSE        |
| TRUE          | TRUE         | 
| FALSE         | FALSE        |


|QUEST(‘?’)     | 
| :---          |    :----:    |          
| Left Input    | Output       |              
| NULLOP        | NULLOP       |
| TRUE          | TRUE         | 
| FALSE         | NULLOP       |


|KLEENE(‘*’)    | 
| :---          |    :----:    |          
| Left Input    | Output       |              
| NULLOP        | NULLOP       |
| TRUE          | TRUE         | 
| FALSE         | NULLOP       |


|LITERAL(lookup)|
| :---          |    :----:    |          
| Left Input    | Output       |              
| TRUE          | TRUE         |
| FALSE         | FALSE        | 


Starting at the root node and recursively calling the operation will evaluate the stringpattern against the regex. 

However there is one more thing to be sorted out…

The result may still fail if there are more characters in the stringpattern than the algorithm can evaluate.

A final check if the index has reached the length of the stringpattern will confirm whether all of the input stringpattern has been evaluated.  If it has, the return value from the operation function of the root node is valid.  If the index is less than the length of the stringpattern, return value is invalid and a full match was not found for the stringpattern.

This algorithm is somewhat novel because it avoids calculations of states for DFA and avoids epsilon transitions of NFA.  The algorithm is called the ‘Kayode’.
