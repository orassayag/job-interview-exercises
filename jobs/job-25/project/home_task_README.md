## Home task

Hello,

Develop a simple web app that gets latest rates for **BTC-USD**, **ETH-USD** and **LTC-USD**
from at least *2* sources for each.
The app should get rates every X minutes
and store them in a database.
The app should have *2* pages:
1. Front page that shows all 3 pairs and their latest average rate
2. A list of historical rates for each pair from each source

Using:
* Docker, docker-compose
* Nodejs
* Redis / MySQL
* React / Vue

### Bonus
Add a shoutbox on the front page (a simple interface for users to write whatever they want)

##### Some sources for crypto rates (you can use others)
* coinmarketcap.com
* cryptocompare.com
* bitstamp.net
