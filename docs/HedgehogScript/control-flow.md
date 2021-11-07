# Control Flow

Block statement is used to group several statements into a single block. The block is delimited by a pair of curly brackets. Block statements are commonly used with control flow statements such as ```if```, ```for``` or ```while```.

## if-else statement

Use the ```if``` statement to execute a statement if a logical condition is ```true```. Use the optional ```else``` clause to execute a statement if the condition is ```false```. 

Here is an example:

<iframe src="https://hhlab.dev/?code=if%20(3%20%3E%201)%7B%0D%0A%20%20%20%20print(%223%20is%20larger%20than%201%22)%0D%0A%7D%0D%0Aelse%20%7B%0D%0A%20%20%20%20print(%223%20is%20no%20larger%20than%201%22)%0D%0A%7D&auto_run=true" allowfullscreen width="1000" height="300" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>


## for statement

A for loop repeats until a specified condition evaluates to false. The Hedgehog Script for loop is the same as JavaScript, which is similar to the Java and C for loop. A for statement looks as follows:

```
for ([initialExpression]; [condition]; [incrementExpression])
  statement
```

Here is an example:

<iframe src="https://hhlab.dev/?code=for%20(let%20x%20%3D%200%20%3B%20x%20%3C%2010%3B%20x%20%2B%3D%202%20)%7B%0D%0A%20%20%20%20print(%22Current%20x%20is%20%22%20%2B%20x)%0D%0A%7D&auto_run=true" allowfullscreen width="1000" height="300" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

## while and do-while statement

The ```while``` statement creates a loop that executes a specified statement as long as the test condition evaluates to true. The condition is evaluated before executing the statement.

Here is the syntax for ```while``` statement:

```
while (condition)
  statement
```

The ```do...while``` statement creates a loop that executes a specified statement until the test condition evaluates to false. The condition is evaluated after executing the statement, resulting in the specified statement executing at least once.

Here is the syntax for ```do...while``` statement:

```
do
   statement
while (condition);
```

Here are examples for ```while``` and ```do...while``` statements in Hedgehog Lab:

<iframe src="https://hhlab.dev/?code=x%20%3D%201%0D%0Awhile%20(x%20%3C%2010)%7B%0D%0A%20%20%20%20print(x)%0D%0A%20%20%20%20x%20%2B%3D%202%0D%0A%7D%0D%0Aprint(%22Current%20x%20is%20%22%20%2B%20x)%0D%0A%0D%0Ax%20%3D%201%20%0D%0Ado%20%7B%0D%0A%20%20%20%20print(x)%0D%0A%20%20%20%20x%20%2B%3D%202%0D%0A%7D%20while%20(x%20%3C%2010)%0D%0Aprint(%22Current%20x%20is%20%22%20%2B%20x)&auto_run=true" allowfullscreen width="1000" height="350" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>
