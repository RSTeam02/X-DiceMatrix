# X-DiceMatrix 0.x (experimental)

Roll a set of x - dices in a matrix

Every diceworker is an independent object, its randomized roll length is returned by a webworker. 
Each dice object has same properties except of object ids and different random state. 

App and Test Contents=> hide and show via jquery

User inputs:

+ replace array with json (webworker)
+ range xy-rangesliders instead of input text (max. 10x10), generate button removed
+ row x column
+ create tablematrix with dices
+ random outputs of dices and pts.
+ select integer or diceface

27.05: Test Program:

+ generate random number of dices
+ roll all dices and check expected sum 