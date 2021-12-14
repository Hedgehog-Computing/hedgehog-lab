# Array

The Array in Hedgehog Script is similar like the Array in JavaScript. 

Create and print an array:

<iframe src="https://hhlab.dev/?code=arrayA%20%3D%20%5B%201%20%2C%202%2C%203%20%2C%204%20%2C%205%20%5D%0D%0Aprint(arrayA)&auto_run=true" allowfullscreen width="1000" height="200" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

Add or remove items from an array:

<iframe src="https://hhlab.dev/?code=arrayB%20%3D%20%5B%20%22apple%22%2C%20%22banana%22%20%5D%0D%0Aprint(%22arrayB%20is%20%22%20%2B%20arrayB)%0D%0A%0D%0AarrayB.push(%22orange%22)%0D%0Aprint(%22Now%20arrayB%20is%20%22%20%2B%20arrayB)%0D%0A%0D%0AlastItem%20%3D%20arrayB.pop()%0D%0Aprint(%22After%20orange%20popped%2C%20now%20arrayB%20is%20%22%20%2B%20arrayB)%0D%0Aprint(%22...and%20the%20last%20item%20is%20%22%20%2B%20lastItem)&auto_run=true" allowfullscreen width="1000" height="350" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>

Loop each item in an array:

<iframe src="https://hhlab.dev/?code=arrayC%20%3D%20%5B%22apple%22%2C%20%22banana%22%2C%20%22orange%22%2C%20%22pear%22%5D%0D%0Aprint(%22There%20are%20%22%20%2B%20(arrayC.length)%20%2B%20%22%20fruits%20in%20total%22)%0D%0A%0D%0A%2F%2F%20Example%201%3A%20in%20a%20for-loop%0D%0Afor%20(let%20index%20%3D%200%3B%20index%20%3C%20arrayC.length%20%3B%20index%2B%2B)%7B%0D%0A%20%20%20%20print(%22Current%20fruit%20in%20for-loop%20is%20%22%20%2B%20arrayC%5Bindex%5D)%0D%0A%7D%0D%0A%0D%0A%2F%2F%20Example%202%3A%20in%20a%20forEach%20method%20with%20an%20array%20function%0D%0AarrayC.forEach(%20eachFruit%20%3D%3E%20print(%22Current%20fruit%20in%20for-each%20is%20%22%20%2B%20eachFruit)%20)&auto_run=true" allowfullscreen width="1000" height="400" frameborder="no" border="0" marginwidth="0" marginheight="0"></iframe>


