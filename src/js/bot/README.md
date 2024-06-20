an "AI" (not really it just sounds fancy SO YES AN AI) that will play battle ship.

## HOW IT WORKS??

for placing ships it picks random positions.

The logic mostly involves how it picks the attacks which i tried to summerize:

it generates an heatmap based on the opponent board hits that the AI has picked,
then we adjust the difficulty by changing the heatmap and making the AI make mistakes,
how? we randomize the heatmap, we take the heatmap numbers an multiply it by some random factor,
therefore the heatmap will have more mistakes if we want the AI to be worser.
Then we take the randomized heatmap (or the non randomized heatmap if we picked the most diffculty),
and we pick the most propable move (the square with the highest number in the heatmap).