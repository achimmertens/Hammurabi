Hello,

here I describe how I merged two new and different branches in my github repository "Hamurabi".

# The Problem

I have created a main branch by default.
But my code was uploaded into the "Master" branch.
Now I want to merge both, but I get a error message on github, when I try a merge request:
"main and master are entirely different commit histories."
![](https://raw.githubusercontent.com/achimmertens/Hamurabi/VS/HowTo/2021-11-09-13-29-42.png)

# This is what worked out:
In Eclipse, do your changes in the branch that you want to keep, commit them and then click on "push HEAD".
In the following dialog choose a different branch. Check "Force overwrite branch in remote if it exists and has diverged". Be aware that it deletes all files in the target branch. (Maybe you copy some needed files from target to source branch before):
![](https://raw.githubusercontent.com/achimmertens/Hamurabi/VS/HowTo/2021-11-09-13-31-33.png)
![](https://raw.githubusercontent.com/achimmertens/Hamurabi/VS/HowTo/2021-11-09-13-31-57.png)

I repeated this for the branch "Develop".

After that I was able to merge both (master and Develop) branches:
![](https://raw.githubusercontent.com/achimmertens/Hamurabi/VS/HowTo/2021-11-09-13-32-47.png)




Regards, Achim
