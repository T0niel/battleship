## HOW IT WORKS?

For placing ships, it picks random positions.

The logic mostly involves how it picks the attacks, which I tried to summarize:

It generates a heatmap based on the opponent's board hits that the bot has picked. Then we adjust the difficulty by changing the heatmap and making the bot make mistakes. How? We randomize the heatmap (enough to make it too random, read below). We take the heatmap numbers and multiply them by some random factor, therefore the heatmap will have more mistakes. Then we take the randomized heatmap (or the non-randomized heatmap if we picked the randomize factor 1), and we pick the most probable move (the square with the highest number in the heatmap).

The randomization of the heatmap also may help make the bot pick more random moves. In some cases, this may help in the game of Battleship (if the heatmap has adjacent hits more probable) and make the bot more competitive without too much randomization. Because the bot will start picking top-to-bottom moves if not randomized, we randomize the bot to make it harder.

The bot takes a parameter of randomizeFactor, which basically means:

1 -> no randomization,
0 -> complete randomization.

## Important Considerations

* The bot needs some randomization because otherwise, it will play top to bottom.
*  The randomization does not mean a worse bot, only in situations when the randomization is too much.
