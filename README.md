# 1010
cocos game

- install android sdk
https://developer.android.com/studio/intro/update.html

- install android ndk
https://developer.android.com/ndk/downloads/index.html

- install ant
`brew install ant`

- install cocos2dx
download http://www.cocos.com/download
`unzip cocos2d-x-3.13.1.zip`
`cd cocos2d-x-3.13.1`
`python setup.py`
`source ~/.bash_profile`


- clone repo
`git clone https://github.com/mingz2013/game.1010.git`

- create a new cocos project
`cocos new -l js WebGame`

- copy frameworks to this project
`cp WebGame/frameworks game.1010/frameworks`

- try to run this project
`cocos run -p web`

- publish
`cocos compile -p web -m release —advanced`
