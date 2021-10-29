# Hedgehog Script in 5 minute

Hedgehog Script supports all JavaScript syntax, with additional syntactic sugar specifically for scientific programming, symbolic computing, and package management. Hedgehog Script is so sweet for all these tasks.

## Hello World

Use `print()` function to print `"hello world"` string in Hedgehog Lab:

<iframe src="https://hedgehog-lab.github.io/?code=print('hello%20world')%3B&auto_run=true" allowfullscreen width="1000" height="230" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

## Variables, Number, String and Data Structure

You can define number and operate in this way:

<iframe src="https://hedgehog-lab.github.io/?code=x%20%3D%2010%0D%0Ay%20%3D%2020%0D%0Aprint(x%20%2B%20y)&auto_run=true" allowfullscreen width="1000" height="270" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

and define and use string in this way:

<iframe src="https://hedgehog-lab.github.io/?code=myString1%20%3D%20%22apple%22%0D%0AmyString2%20%3D%20%22peach%22%0D%0Aprint(myString1%20%2B%20%22%20and%20%22%20%2B%20myString2)&auto_run=true" allowfullscreen width="1000" height="270" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

and Array in this way:

<iframe src="https://hedgehog-lab.github.io/?code=myArray%20%3D%20%5B%5D%0D%0AmyArray.push(%22Apple%22)%0D%0AmyArray.push(%22Banana%22)%0D%0AmyArray.push(100)%0D%0Aprint(myArray)&auto_run=true" allowfullscreen width="1000" height="300" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

and Map (hash map) in this way:

<iframe src="https://hedgehog-lab.github.io/?code=myMap%20%3D%20new%20Map()%0D%0AmyMap%5B'John'%5D%20%3D%201%0D%0AmyMap%5B'Tom'%5D%20%3D%202%0D%0AmyMap%5B'Lisa'%5D%20%3D%203%0D%0Afor%20(person%20in%20myMap)%20%7B%0D%0A%20%20%20%20print(%22My%20name%20is%20%22%20%2B%20person%20%2B%20%22.%20My%20number%20is%20%22%20%2B%20myMap%5Bperson%5D)%0D%0A%7D&auto_run=true" allowfullscreen width="1000" height="350" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

## Function and Class

