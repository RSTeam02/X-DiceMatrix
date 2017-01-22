# X-DiceMatrix 0.x (experimental)

Roll a set of x - dices in a matrix
Every dice is an independent object, its randomized roll length is returned by a webworker. 
Each dice object has same properties except of object ids and different random state. 


User inputs:
+ row x column
+ create tablematrix with dices
+ random outputs of dices and pts.

warning: if the raster is too huge (over 15x15), browser will probably crash.
