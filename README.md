# Roblox-New-User-Milestone-Tracker
Constantly sends Get requests to see whether a user exists yet. If it does then it moves on to the next ID and repeats that until it exists. 

### Steps
1. Download the script
2. Find the most recent ID within some reasonable range. (I will add an update in the future to do this automatically).

    *A good way to do this is to just start at some large number and work your way down each magnitude. (ex; `100000 → 10000 → 10000`). If you find an Id on that magnitude then try finding an ID at `Magnitude * 1.5` and if you do not find one then try finding one at `Magnitude * 1.25`, and if you still do not find one then try finding one at `Magnitude * 1.125` and you can probably see the pattern by now.* So, if you start at 1 billion and find a 1 billionth user then look for the 1.5billionth user. If that user does not exist then look for the 1.25 billionth user and so on.
4. Change the `Delta` parameter if you wish to see every `N` user instead of the default which is every `100`th user.
5. Run the script via node. `node Index.js`

### Sample: 

![https://i.imgur.com/JHeaXkK.png](https://i.imgur.com/JHeaXkK.png)
